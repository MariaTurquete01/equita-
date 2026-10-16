import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";

import styles from "./CadastrarCurso.module.css";
import { obterSessao } from "../../../services/sessao";
import { apiGet, apiPost, apiPut } from "../../../services/api";

function criarAulaVazia() {
    return {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        titulo: "",
        descricao: "",
        link: "",
    };
}

function linkHttpSeguro(link) {
    if (!link.trim()) return true;

    try {
        const protocolo = new URL(link).protocol;
        return protocolo === "http:" || protocolo === "https:";
    } catch {
        return false;
    }
}

// cada "aula" da proposta é gravada como Material do curso na API
function tipoMaterialDaAula(link) {
    if (!link) return "SLIDES";
    if (/youtube|youtu\.be|vimeo/i.test(link)) return "VIDEO";
    return "LINK";
}

function paraPayloadMaterial(cursoId, voluntarioId, aula) {
    return {
        cursoId,
        voluntarioId,
        titulo: aula.titulo.trim(),
        descricao: aula.descricao.trim(),
        tipoMaterial: tipoMaterialDaAula(aula.link.trim()),
        caminhoArquivo: null,
        linkExterno: aula.link.trim() || null,
        statusAprovacao: "PENDENTE",
        publicado: false,
    };
}

function CadastrarCurso() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const sessao = obterSessao();

    const idEditandoParam = searchParams.get("editar");
    const cursoEditandoId = idEditandoParam ? Number(idEditandoParam) : null;
    const editando = Boolean(cursoEditandoId);

    const [formData, setFormData] = useState({ titulo: "", descricao: "", duracao: "" });
    const [aulas, setAulas] = useState([]);
    const [materiaisOriginais, setMateriaisOriginais] = useState([]);
    const [carregandoEdicao, setCarregandoEdicao] = useState(editando);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");

    // no modo edição, pré-carrega o curso e as aulas (materiais) da API
    useEffect(() => {
        if (!cursoEditandoId) return undefined;

        let ativo = true;

        async function carregar() {
            setCarregandoEdicao(true);
            setErro("");
            try {
                const [curso, materiais] = await Promise.all([
                    apiGet(`/cursos/${cursoEditandoId}`),
                    apiGet(`/materiais/curso/${cursoEditandoId}`),
                ]);
                if (!ativo) return;

                setFormData({
                    titulo: curso.titulo || "",
                    descricao: curso.descricao || "",
                    duracao: curso.cargaHoraria ? `${curso.cargaHoraria} horas` : "",
                });
                setMateriaisOriginais(materiais);
                setAulas(materiais.map((material) => ({
                    // id numérico = material que já existe na API
                    id: material.id,
                    titulo: material.titulo || "",
                    descricao: material.descricao || "",
                    link: material.linkExterno || "",
                    publicado: Boolean(material.publicado),
                })));
            } catch (excecao) {
                if (ativo) setErro(excecao.message || "Não foi possível carregar a proposta.");
            } finally {
                if (ativo) setCarregandoEdicao(false);
            }
        }

        carregar();
        return () => {
            ativo = false;
        };
    }, [cursoEditandoId]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAulaChange = (id, event) => {
        const { name, value } = event.target;
        setAulas((aulasAtuais) => aulasAtuais.map((aula) => (
            aula.id === id ? { ...aula, [name]: value } : aula
        )));
    };

    const adicionarAula = () => {
        setAulas((aulasAtuais) => [...aulasAtuais, criarAulaVazia()]);
    };

    const removerAula = (id) => {
        setAulas((aulasAtuais) => aulasAtuais.filter((aula) => aula.id !== id));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (aulas.length === 0) {
            setErro("Adicione pelo menos uma aula à proposta.");
            return;
        }

        if (aulas.some((aula) => !aula.titulo.trim() || !aula.descricao.trim())) {
            setErro("Preencha o título e a descrição de todas as aulas.");
            return;
        }

        if (aulas.some((aula) => !linkHttpSeguro(aula.link.trim()))) {
            setErro("Os links das aulas devem usar HTTP ou HTTPS.");
            return;
        }

        if (!sessao) {
            setErro("Faça login para gerenciar seus cursos.");
            return;
        }

        setCarregando(true);
        setErro("");
        try {
            const cargaHoraria = Number(String(formData.duracao).replace(/\D/g, "")) || null;
            const payloadCurso = {
                voluntarioId: sessao.id,
                titulo: formData.titulo.trim(),
                descricao: formData.descricao.trim(),
                cargaHoraria,
            };

            if (cursoEditandoId) {
                // editar devolve a proposta para análise e a retira do catálogo público
                await apiPut(`/cursos/${cursoEditandoId}`, {
                    ...payloadCurso,
                    statusAprovacao: "PENDENTE",
                });
                await apiPut(`/cursos/${cursoEditandoId}/inativar`);

                const idsNoFormulario = new Set(
                    aulas.filter((aula) => typeof aula.id === "number").map((aula) => aula.id)
                );

                for (const aula of aulas) {
                    if (typeof aula.id === "number") {
                        await apiPut(`/materiais/${aula.id}`, paraPayloadMaterial(cursoEditandoId, sessao.id, aula));
                        if (aula.publicado) await apiPut(`/materiais/${aula.id}/inativar`);
                    } else {
                        await apiPost("/materiais/create", paraPayloadMaterial(cursoEditandoId, sessao.id, aula));
                    }
                }

                // aulas removidas do formulário são inativadas (delete lógico)
                for (const material of materiaisOriginais) {
                    if (!idsNoFormulario.has(material.id)) {
                        await apiPut(`/materiais/${material.id}/inativar`);
                    }
                }

                navigate("/voluntario/meus-cursos", {
                    replace: true,
                    state: { mensagem: "Proposta atualizada e enviada para nova análise." },
                });
            } else {
                const curso = await apiPost("/cursos/create", {
                    ...payloadCurso,
                    statusAprovacao: "PENDENTE",
                });

                for (const aula of aulas) {
                    await apiPost("/materiais/create", paraPayloadMaterial(curso.id, sessao.id, aula));
                }

                navigate("/voluntario/meus-cursos", {
                    replace: true,
                    state: { mensagem: "Proposta salva e enviada para análise." },
                });
            }
        } catch (excecao) {
            setErro(excecao.message || "Não foi possível salvar a proposta. Tente novamente.");
        } finally {
            setCarregando(false);
        }

    };

    const handleCancel = () => {
        navigate("/voluntario/meus-cursos");
    };

    if (!sessao) {
        return (
            <>
                <Navbar />
                <main className={styles.cadastrarCursoPage}>
                    <section className={styles.formSection}>
                        <div className={styles.formCard}>
                            <p className={styles.errorMessage} role="alert">
                                Faça login na sua conta de voluntário para propor ou editar cursos.
                            </p>
                            <button type="button" className={styles.cancelButton} onClick={() => navigate("/login")}>
                                Ir para o login
                            </button>
                        </div>
                    </section>
                </main>
                <Footer />
            </>
        );
    }

    if (carregandoEdicao) {
        return (
            <>
                <Navbar />
                <main className={styles.cadastrarCursoPage}>
                    <section className={styles.formSection}>
                        <div className={styles.formCard}>
                            <p role="status">Carregando proposta...</p>
                        </div>
                    </section>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className={styles.cadastrarCursoPage}>
                {/* HERO */}
                <section className={styles.cadastrarCursoHero}>
                    <span className={styles.heroBadge}>
                        Área do Voluntário
                    </span>

                    <h1>{editando ? "Editar proposta de curso" : "Propor novo curso"}</h1>

                    <p>
                        Compartilhe seu conhecimento e contribua para a
                        formação dos usuários da plataforma Equitá.
                    </p>
                </section>

                {/* FORMULÁRIO */}
                <section className={styles.formSection}>
                    <div className={styles.formCard}>
                        <div className={styles.formHeader}>
                            <h2>Informações do curso</h2>

                            <p className={styles.formDescription}>
                                Preencha as informações abaixo para enviar sua
                                proposta de curso.
                            </p>
                        </div>

                        {erro && <p className={styles.errorMessage} role="alert">{erro}</p>}

                        <form onSubmit={handleSubmit}>
                            {/* TÍTULO */}
                            <div className={styles.formGroup}>
                                <label htmlFor="titulo">
                                    Título do curso
                                </label>

                                <input
                                    id="titulo"
                                    name="titulo"
                                    type="text"
                                    value={formData.titulo}
                                    onChange={handleChange}
                                    placeholder="Digite o título do curso"
                                    required
                                />
                            </div>

                            {/* DESCRIÇÃO */}
                            <div className={styles.formGroup}>
                                <label htmlFor="descricao">
                                    Descrição do curso
                                </label>

                                <textarea
                                    id="descricao"
                                    name="descricao"
                                    rows="6"
                                    value={formData.descricao}
                                    onChange={handleChange}
                                    placeholder="Explique o conteúdo, objetivo e proposta do curso"
                                    required
                                />
                            </div>

                            {/* DURAÇÃO */}
                            <div className={styles.formGroup}>
                                <label htmlFor="duracao">
                                    Duração estimada
                                </label>

                                <input
                                    id="duracao"
                                    name="duracao"
                                    type="text"
                                    value={formData.duracao}
                                    onChange={handleChange}
                                    placeholder="Ex.: 10 horas"
                                    required
                                />
                            </div>

                            <section className={styles.lessonEditor} aria-labelledby="aulas-heading">
                                <div className={styles.lessonEditorHeader}>
                                    <div>
                                        <h3 id="aulas-heading">Aulas da proposta</h3>
                                        <p>Adicione o título e a descrição de cada aula. O link é opcional.</p>
                                    </div>
                                    <button type="button" className={styles.addLessonButton} onClick={adicionarAula}>
                                        Adicionar aula
                                    </button>
                                </div>

                                {aulas.length === 0 ? (
                                    <p className={styles.lessonEmpty}>Nenhuma aula adicionada.</p>
                                ) : (
                                    <div className={styles.lessonList}>
                                        {aulas.map((aula, indice) => (
                                            <fieldset className={styles.lessonFormCard} key={aula.id}>
                                                <legend>Aula {indice + 1}</legend>
                                                <div className={styles.formGroup}>
                                                    <label htmlFor={`aula-titulo-${aula.id}`}>Título</label>
                                                    <input
                                                        id={`aula-titulo-${aula.id}`}
                                                        name="titulo"
                                                        value={aula.titulo}
                                                        onChange={(event) => handleAulaChange(aula.id, event)}
                                                        maxLength="200"
                                                        required
                                                    />
                                                </div>
                                                <div className={styles.formGroup}>
                                                    <label htmlFor={`aula-descricao-${aula.id}`}>Descrição</label>
                                                    <textarea
                                                        id={`aula-descricao-${aula.id}`}
                                                        name="descricao"
                                                        value={aula.descricao}
                                                        onChange={(event) => handleAulaChange(aula.id, event)}
                                                        maxLength="2000"
                                                        rows="3"
                                                        required
                                                    />
                                                </div>
                                                <div className={styles.lessonFormActions}>
                                                    <label htmlFor={`aula-link-${aula.id}`}>Link externo (opcional)</label>
                                                    <input
                                                        id={`aula-link-${aula.id}`}
                                                        name="link"
                                                        type="url"
                                                        value={aula.link}
                                                        onChange={(event) => handleAulaChange(aula.id, event)}
                                                        placeholder="https://"
                                                    />
                                                    <button type="button" className={styles.removeLessonButton} onClick={() => removerAula(aula.id)}>
                                                        Remover aula
                                                    </button>
                                                </div>
                                            </fieldset>
                                        ))}
                                    </div>
                                )}
                            </section>

                            {/* INFORMAÇÃO SOBRE ANÁLISE */}
                            <div className={styles.infoBox}>
                                <span
                                    className={styles.infoIcon}
                                    aria-hidden="true"
                                >
                                    ℹ️
                                </span>

                                <div>
                                    <strong>Envio para análise</strong>

                                    <p>
                                        Após o envio, a proposta será
                                        encaminhada para análise antes de ser
                                        disponibilizada na plataforma.
                                    </p>
                                </div>
                            </div>

                            {/* BOTÕES */}
                            <div className={styles.formActions}>
                                <button
                                    type="button"
                                    className={styles.cancelButton}
                                    onClick={handleCancel}
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    className={styles.submitButton}
                                    disabled={carregando}
                                >
                                    {carregando
                                        ? "Salvando..."
                                        : editando ? "Salvar alterações" : "Enviar proposta"}
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default CadastrarCurso;
