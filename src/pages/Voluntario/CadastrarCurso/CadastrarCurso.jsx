import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";

import styles from "./CadastrarCurso.module.css";
import { carregarCursosPropostos, salvarCursosPropostos } from "../cursosPropostos";

function converterImagem(file) {
    if (file.size > 1_500_000) {
        return Promise.reject(new Error("A imagem deve ter no máximo 1,5 MB."));
    }

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => resolve(reader.result), { once: true });
        reader.addEventListener("error", () => reject(new Error("Não foi possível ler a imagem.")), { once: true });
        reader.readAsDataURL(file);
    });
}

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

function CadastrarCurso() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const cursoEditando = carregarCursosPropostos().find(
        (curso) => curso.id === searchParams.get("editar")
    );
    const [formData, setFormData] = useState({
        titulo: cursoEditando?.titulo || "",
        descricao: cursoEditando?.descricao || "",
        categoria: cursoEditando?.categoria || "",
        duracao: cursoEditando?.duracao || "",
        imagem: null,
    });
    const [aulas, setAulas] = useState(() => (
        Array.isArray(cursoEditando?.aulas)
            ? cursoEditando.aulas.map((aula) => ({ ...criarAulaVazia(), ...aula }))
            : []
    ));
    const [erro, setErro] = useState("");

    const handleChange = (event) => {
        const { name, value, files } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
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

        try {
            const imagem = formData.imagem
                ? await converterImagem(formData.imagem)
                : cursoEditando?.imagem || "";
            const propostas = carregarCursosPropostos();
            const proposta = {
                id: cursoEditando?.id || `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                titulo: formData.titulo.trim(),
                descricao: formData.descricao.trim(),
                categoria: formData.categoria,
                duracao: formData.duracao.trim(),
                aulas: aulas.map((aula) => ({
                    ...aula,
                    titulo: aula.titulo.trim(),
                    descricao: aula.descricao.trim(),
                    link: aula.link.trim(),
                })),
                imagem,
                status: "Em análise",
                criadaEm: cursoEditando?.criadaEm || new Date().toISOString(),
                atualizadaEm: new Date().toISOString(),
            };
            const propostasAtualizadas = cursoEditando
                ? propostas.map((curso) => curso.id === cursoEditando.id ? proposta : curso)
                : [...propostas, proposta];

            salvarCursosPropostos(propostasAtualizadas);
            navigate("/voluntario/meus-cursos", {
                replace: true,
                state: { mensagem: cursoEditando ? "Proposta atualizada e enviada para nova análise." : "Proposta salva e enviada para análise." },
            });
        } catch (error) {
            setErro(error.message || "Não foi possível salvar a proposta. Tente novamente.");
        }

    };

    const handleCancel = () => {
        navigate("/voluntario/meus-cursos");
    };

    return (
        <>
            <Navbar />

            <main className={styles.cadastrarCursoPage}>
                {/* HERO */}
                <section className={styles.cadastrarCursoHero}>
                    <span className={styles.heroBadge}>
                        Área do Voluntário
                    </span>

                    <h1>{cursoEditando ? "Editar proposta de curso" : "Propor novo curso"}</h1>

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

                            {/* CATEGORIA + DURAÇÃO */}
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="categoria">
                                        Categoria
                                    </label>

                                    <select
                                        id="categoria"
                                        name="categoria"
                                        value={formData.categoria}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">
                                            Selecione uma categoria
                                        </option>

                                        <option value="direitos">
                                            Direitos
                                        </option>

                                        <option value="cidadania">
                                            Cidadania
                                        </option>

                                        <option value="educacao">
                                            Educação
                                        </option>

                                        <option value="formacao">
                                            Formação profissional
                                        </option>

                                        <option value="outros">
                                            Outros
                                        </option>
                                    </select>
                                </div>

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

                            {/* IMAGEM */}
                            <div className={styles.formGroup}>
                                <label htmlFor="imagem">
                                    Imagem do curso
                                </label>

                                <input
                                    id="imagem"
                                    name="imagem"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleChange}
                                />

                                <small className={styles.inputHelp}>
                                    Opcional. Arquivo de imagem de até 1,5 MB.
                                </small>
                            </div>

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
                                >
                                    Enviar proposta
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
