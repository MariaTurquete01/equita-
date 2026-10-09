import { useNavigate } from "react-router-dom";

import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";

import styles from "./MeusCursos.module.css";

function MeusCursos() {
    const navigate = useNavigate();

    const handleCriarCurso = () => {
        navigate("/voluntario/cadastrar-curso");
    };

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
                    <div className={styles.cursoFiltros}>
                        <button
                            type="button"
                            className={styles.filtroAtivo}
                        >
                            Todos
                        </button>

                        <button type="button">
                            Em análise
                        </button>

                        <button type="button">
                            Aprovados
                        </button>

                        <button type="button">
                            Rejeitados
                        </button>
                    </div>

                    {/* LISTA DE CURSOS */}
                    <div className={styles.cursosLista}>
                        <div className={styles.cursoVazio}>
                            <div
                                className={styles.cursoVazioIcon}
                                aria-hidden="true"
                            >
                                📚
                            </div>

                            <h3>Nenhum curso cadastrado</h3>

                            <p>
                                Quando você criar um curso, ele aparecerá
                                nesta área para que possa acompanhar seu
                                status e realizar alterações.
                            </p>

                            <button
                                type="button"
                                className={styles.novoCursoButton}
                                onClick={handleCriarCurso}
                            >
                                Criar meu primeiro curso
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default MeusCursos;
