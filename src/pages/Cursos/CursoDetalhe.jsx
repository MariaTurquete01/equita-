import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { useParams, Link } from "react-router-dom";

import cursos from "./cursos";

import styles from "./detalhe.module.css";

const CHAVE_INSCRICOES = "equita_cursos_inscritos";

function obterInscricao(cursoId) {
  try {
    const inscricoes = JSON.parse(window.localStorage.getItem(CHAVE_INSCRICOES) || "[]");
    return Array.isArray(inscricoes)
      ? inscricoes.find((inscricao) => inscricao.cursoId === cursoId) || null
      : null;
  } catch {
    return null;
  }
}

function CursoDetalhe() {
  const { id } = useParams();

  const curso = cursos.find(
    (curso) => curso.id === Number(id)
  );
  const inscricao = obterInscricao(Number(id));

  if (!curso) {
    return (
      <>
        <Navbar />

        <main className={styles.courseNotFound}>
          <h1>Curso não encontrado.</h1>

          <Link to="/cursos">
            Voltar para Cursos
          </Link>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className={styles.coursePage}>

        {/* HERO */}
        <section className={styles.courseHero}>
          <div className={styles.courseHeroContent}>
            <span className={styles.courseCategory}>
              {curso.categoria}
            </span>

            <h1>
              {curso.titulo}
            </h1>

            <p>
              {curso.descricao}
            </p>

            <div className={styles.courseMeta}>
              <span>
                👨‍🏫 {curso.professor}
              </span>

              <span>
                ⏱ {curso.cargaHoraria}
              </span>

              <span>
                ⭐ {curso.nivel}
              </span>
            </div>
          </div>
        </section>

        {/* PROGRESSO */}
        <section className={styles.progressSection}>
          <h2>
            Seu progresso
          </h2>

          {inscricao ? (
            <>
              <div
                className={styles.progressBar}
                role="progressbar"
                aria-label="Progresso do curso"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={inscricao.progresso}
              >
                <div
                  className={styles.progressFill}
                  style={{ width: `${inscricao.progresso}%` }}
                />
              </div>
              <p>{inscricao.progresso}% concluído</p>
            </>
          ) : (
            <p>
              Você ainda não está inscrito neste curso. <Link to="/cursos">Voltar aos cursos para se inscrever.</Link>
            </p>
          )}
        </section>

        {/* AULAS */}
        <section className={styles.lessonsSection}>
          <h2>
            Conteúdo do Curso
          </h2>

          <div className={styles.moduleCard}>
            <h3>
              📘 Módulo 1 — Introdução
            </h3>

            <div className={styles.lessonCard}>
              ▶ Aula 1
            </div>

            <div className={styles.lessonCard}>
              ▶ Aula 2
            </div>
          </div>

          <div className={styles.moduleCard}>
            <h3>
              📖 Módulo 2 — Desenvolvimento
            </h3>

            <div className={styles.lessonCard}>
              ▶ Aula 3
            </div>

            <div className={styles.lessonCard}>
              ▶ Aula 4
            </div>
          </div>

          <div className={styles.moduleCard}>
            <h3>
              🎓 Módulo 3 — Conclusão
            </h3>

            <div className={styles.lessonCard}>
              📝 Questionário Final
            </div>

            <div className={styles.lessonCard}>
              🏆 Certificado
            </div>
          </div>
        </section>

        {/* APOSTILAS */}
        <section className={styles.materialsSection}>
          <h2>
            Apostilas e Materiais
          </h2>

          <div className={styles.materialCard}>
            📄 Apostila Principal (PDF)
          </div>

          <div className={styles.materialCard}>
            📑 Material Complementar
          </div>

          <div className={styles.materialCard}>
            📚 Leituras Recomendadas
          </div>
        </section>

        {/* QUESTIONÁRIOS */}
        <section className={styles.quizSection}>
          <h2>
            Questionários
          </h2>

          <p>
            Ao concluir as aulas, responda ao questionário
            para testar seus conhecimentos.
          </p>

          <button className={styles.quizButton}>
            Responder Questionário
          </button>
        </section>

        {/* CERTIFICADO */}
        <section id="certificado" className={styles.certificateSection}>
          <h2>
            Certificado
          </h2>

          <p>
            Após concluir todas as aulas e atingir o
            desempenho mínimo no questionário, você poderá
            emitir seu certificado de conclusão.
          </p>

          <button className={styles.certificateButton}>
            Emitir Certificado
          </button>
        </section>

        {/* AÇÕES */}
        <section className={styles.courseActions}>
          <Link
            to="/cursos"
            className={styles.backButton}
          >
            ← Voltar para Cursos
          </Link>
        </section>

      </main>

      <Footer />
    </>
  );
}

export default CursoDetalhe;
