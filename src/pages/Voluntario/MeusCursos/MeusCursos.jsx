import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";

import styles from "./MeusCursos.module.css";
import { obterSessao } from "../../../services/sessao";
import { apiGet, apiPut } from "../../../services/api";
import { rotuloStatusCurso } from "../../../services/cursos";

const FILTROS = ["Todos", "Em análise", "Aprovados", "Rejeitados"];

// filtro da UI → statusAprovacao gravado na API
const STATUS_DO_FILTRO = {
    "Em análise": "PENDENTE",
    "Aprovados": "APROVADO",
    "Rejeitados": "REPROVADO",
};

function MeusCursos() {
    const navigate = useNavigate();
    const location = useLocation();
    const sessao = obterSessao();
    const [cursos, setCursos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [filtroSelecionado, setFiltroSelecionado] = useState("Todos");
    const [mensagem, setMensagem] = useState(location.state?.mensagem || "");
    const [erro, setErro] = useState("");

    // cursos criados por este voluntário: GET /cursos/voluntario/{id}
    useEffect(() => {
        if (!sessao) {
            setCarregando(false);
            return undefined;
        }

        let ativo = true;

        async function carregar() {
            setCarregando(true);
            setErro("");
            try {
                const meusCursos = await apiGet(`/cursos/voluntario/${sessao.id}`);
                if (ativo) setCursos(meusCursos);
            } catch (excecao) {
                if (ativo) setErro(excecao.message || "Não foi possível carregar seus cursos.");
            } finally {
                if (ativo) setCarregando(false);
            }
        }

        carregar();
        return () => {
            ativo = false;
        };
    }, [sessao]);

    const handleCriarCurso = () => {
        navigate("/voluntario/cadastrar-curso");
    };

    const cursosFiltrados = cursos.filter((curso) => {
        if (filtroSelecionado === "Todos") return true;
        return curso.statusAprovacao === STATUS_DO_FILTRO[filtroSelecionado];
    });

    function editarCurso(curso) {
        navigate(`/voluntario/cadastrar-curso?editar=${encodeURIComponent(curso.id)}`);
    }

    async function inativarCurso(curso) {
        if (!window.confirm(`Inativar a proposta “${curso.titulo}”? Ela deixará de aparecer no catálogo público.`)) return;

        try {
            // não existe delete na API → inativação lógica (publicado = 0)
            await apiPut(`/cursos/${curso.id}/inativar`);
            const meusCursos = await apiGet(`/cursos/voluntario/${sessao.id}`);
            setCursos(meusCursos);
            setMensagem("Proposta inativada — ela não aparece mais no catálogo público.");
            setErro("");
        } catch (excecao) {
            setErro(excecao.message || "Não foi possível inativar a proposta. Tente novamente.");
        }
    }

    if (!sessao) {
        return (
            <>
                <Navbar />
                <main className={styles.meusCursosPage}>
                    <section className={styles.meusCursosContent}>
                        <div className={styles.cursoVazio}>
                            <div className={styles.cursoVazioIcon} aria-hidden="true">📚</div>
                            <h3>Entre na sua conta de voluntário</h3>
                            <p>Para ver e gerenciar seus cursos, faça login na plataforma Equitá.</p>
                            <Link className={styles.novoCursoButton} to="/login">Ir para o login</Link>
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

            <main className={styles.meusCursosPage}>
                {/* CABEÇALHO */}
                <section className={styles.meusCursosHero}>
                    <span className={styles.heroBadge}>
                        Área do Voluntário
                    </span>

                    <h1>Meus Cursos</h1>

                    <p>
                        Crie, edite e gerencie os cursos que você disponibiliza
                        na plataforma Equitá.
                    </p>
                </section>

                {/* CONTEÚDO */}
                <section className={styles.meusCursosContent}>
                    {mensagem && <p className={styles.feedbackMessage} role="status">{mensagem}</p>}
                    {erro && <p className={styles.errorMessage} role="alert">{erro}</p>}

                    <div className={styles.meusCursosHeader}>
                        <div>
                            <h2>Gerenciar cursos</h2>

                            <p>
                                Aqui você poderá acompanhar e administrar
                                seus cursos.
                            </p>
                        </div>

                        <button
                            type="button"
                            className={styles.novoCursoButton}
                            onClick={handleCriarCurso}
                        >
                            + Criar curso
                        </button>
                    </div>

                    {/* FILTROS */}
                    <div className={styles.cursoFiltros} aria-label="Filtrar propostas por status">
                        {FILTROS.map((filtro) => (
                            <button
                                type="button"
                                key={filtro}
                                className={filtroSelecionado === filtro ? styles.filtroAtivo : ""}
                                aria-pressed={filtroSelecionado === filtro}
                                onClick={() => setFiltroSelecionado(filtro)}
                            >
                                {filtro}
                            </button>
                        ))}
                    </div>

                    {/* LISTA DE CURSOS */}
                    <div className={styles.cursosLista}>
                        {carregando ? (
                            <div className={styles.cursoVazio}>
                                <h3>Carregando seus cursos...</h3>
                            </div>
                        ) : cursosFiltrados.length === 0 ? (
                            <div className={styles.cursoVazio}>
                                <div className={styles.cursoVazioIcon} aria-hidden="true">📚</div>
                                <h3>{cursos.length === 0 ? "Nenhum curso cadastrado" : "Nenhuma proposta neste status"}</h3>
                                <p>
                                    {cursos.length === 0
                                        ? "As propostas enviadas aparecerão aqui para acompanhamento e edição."
                                        : "Escolha outro filtro para consultar as propostas."}
                                </p>
                                {cursos.length === 0 && (
                                    <button type="button" className={styles.novoCursoButton} onClick={handleCriarCurso}>
                                        Criar meu primeiro curso
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className={styles.propostasGrid}>
                                {cursosFiltrados.map((curso) => (
                                    <article className={styles.propostaCard} key={curso.id}>
                                        <div className={styles.propostaInfo}>
                                            <span className={`${styles.statusBadge} ${curso.statusAprovacao === "APROVADO" ? styles.statusApproved : curso.statusAprovacao === "REPROVADO" ? styles.statusRejected : styles.statusPending}`}>
                                                {rotuloStatusCurso(curso.statusAprovacao)}{!curso.publicado && curso.statusAprovacao === "APROVADO" ? " · inativo" : ""}
                                            </span>
                                            <h3>{curso.titulo}</h3>
                                            <p>{curso.descricao}</p>
                                            <dl>
                                                <div><dt>Carga horária</dt><dd>{curso.cargaHoraria ? `${curso.cargaHoraria} horas` : "Não informada"}</dd></div>
                                            </dl>
                                            <div className={styles.propostaActions}>
                                                <button type="button" onClick={() => editarCurso(curso)}>Editar</button>
                                                <button type="button" className={styles.deleteButton} onClick={() => inativarCurso(curso)}>Inativar</button>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default MeusCursos;
