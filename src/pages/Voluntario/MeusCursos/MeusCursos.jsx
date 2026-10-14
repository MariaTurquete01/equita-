import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";

import styles from "./MeusCursos.module.css";
import { carregarCursosPropostos, salvarCursosPropostos } from "../cursosPropostos";

const FILTROS = ["Todos", "Em análise", "Aprovados", "Rejeitados"];

function MeusCursos() {
    const navigate = useNavigate();
    const location = useLocation();
    const [cursos, setCursos] = useState(carregarCursosPropostos);
    const [filtroSelecionado, setFiltroSelecionado] = useState("Todos");
    const [mensagem, setMensagem] = useState(location.state?.mensagem || "");
    const [erro, setErro] = useState("");

    const handleCriarCurso = () => {
        navigate("/voluntario/cadastrar-curso");
    };

    const cursosFiltrados = cursos.filter((curso) => {
        if (filtroSelecionado === "Todos") return true;
        if (filtroSelecionado === "Aprovados") return curso.status === "Aprovado";
        if (filtroSelecionado === "Rejeitados") return curso.status === "Rejeitado";
        return curso.status === filtroSelecionado;
    });

    function editarCurso(curso) {
        navigate(`/voluntario/cadastrar-curso?editar=${encodeURIComponent(curso.id)}`);
    }

    function excluirCurso(curso) {
        if (!window.confirm(`Excluir a proposta “${curso.titulo}”?`)) return;

        try {
            const cursosAtualizados = cursos.filter((item) => item.id !== curso.id);
            salvarCursosPropostos(cursosAtualizados);
            setCursos(cursosAtualizados);
            setMensagem("Proposta excluída.");
            setErro("");
        } catch {
            setErro("Não foi possível excluir a proposta. Tente novamente.");
        }
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
                        {cursosFiltrados.length === 0 ? (
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
                                        {curso.imagem && (
                                            <img className={styles.cursoImagem} src={curso.imagem} alt="" />
                                        )}
                                        <div className={styles.propostaInfo}>
                                            <span className={`${styles.statusBadge} ${curso.status === "Aprovado" ? styles.statusApproved : curso.status === "Rejeitado" ? styles.statusRejected : styles.statusPending}`}>
                                                {curso.status || "Em análise"}
                                            </span>
                                            <h3>{curso.titulo}</h3>
                                            <p>{curso.descricao}</p>
                                            <dl>
                                                <div><dt>Categoria</dt><dd>{curso.categoria}</dd></div>
                                                <div><dt>Duração</dt><dd>{curso.duracao}</dd></div>
                                            </dl>
                                            <div className={styles.propostaActions}>
                                                <button type="button" onClick={() => editarCurso(curso)}>Editar</button>
                                                <button type="button" className={styles.deleteButton} onClick={() => excluirCurso(curso)}>Excluir</button>
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
