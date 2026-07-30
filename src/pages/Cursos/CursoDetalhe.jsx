import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
 
import { useParams, Link } from "react-router-dom";
 
import cursos from "./cursos";
 
import "./detalhe.css";
 
function CursoDetalhe() {
 
  const { id } = useParams();
 
  const curso = cursos.find(
    (curso) => curso.id === Number(id)
  );
 
  if (!curso) {
    return (
 
      <>
        <Navbar />
 
        <main className="course-not-found">
 
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
 
      <main className="course-page">
 
        {/* HERO */}
 
        <section className="course-hero">
 
          <img
            src={curso.imagem}
            alt={curso.titulo}
          />
 
          <div className="course-hero-content">
 
            <span className="course-category">
 
              {curso.categoria}
 
            </span>
 
            <h1>
 
              {curso.titulo}
 
            </h1>
 
            <p>
 
              {curso.descricao}
 
            </p>
 
            <div className="course-meta">
 
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
 
        <section className="progress-section">
 
          <h2>
 
            Seu progresso
 
          </h2>
 
          <div className="progress-bar">
 
            <div
              className="progress-fill"
              style={{ width: "0%" }}
            ></div>
 
          </div>
 
          <p>
 
            0% concluído
 
          </p>
 
        </section>
 
        {/* AULAS */}
 
<section className="lessons-section">
 
  <h2>
 
    Conteúdo do Curso
 
  </h2>
 
  <div className="module-card">
 
    <h3>
 
      📘 Módulo 1 — Introdução
 
    </h3>
 
    <div className="lesson-card">
 
      ▶ Aula 1
 
    </div>
 
    <div className="lesson-card">
 
      ▶ Aula 2
 
    </div>
 
  </div>
 
  <div className="module-card">
 
    <h3>
 
      📖 Módulo 2 — Desenvolvimento
 
    </h3>
 
    <div className="lesson-card">
 
      ▶ Aula 3
 
    </div>
 
    <div className="lesson-card">
 
      ▶ Aula 4
 
    </div>
 
  </div>
 
  <div className="module-card">
 
    <h3>
 
      🎓 Módulo 3 — Conclusão
 
    </h3>
 
    <div className="lesson-card">
 
      📝 Questionário Final
 
    </div>
 
    <div className="lesson-card">
 
      🏆 Certificado
 
    </div>
 
  </div>
 
</section>
 
        {/* APOSTILAS */}
 
        <section className="materials-section">
 
          <h2>
 
            Apostilas e Materiais
 
          </h2>
 
          <div className="material-card">
 
            📄 Apostila Principal (PDF)
 
          </div>
 
          <div className="material-card">
 
            📑 Material Complementar
 
          </div>
 
          <div className="material-card">
 
            📚 Leituras Recomendadas
 
          </div>
 
        </section>
 
        {/* QUESTIONÁRIOS */}
 
        <section className="quiz-section">
 
          <h2>
 
            Questionários
 
          </h2>
 
          <p>
 
            Ao concluir as aulas, responda ao questionário para testar seus conhecimentos.
 
          </p>
 
          <button className="quiz-button">
 
            Responder Questionário
 
          </button>
 
        </section>
 
        {/* CERTIFICADO */}
 
        <section className="certificate-section">
 
          <h2>
 
            Certificado
 
          </h2>
 
          <p>
 
            Após concluir todas as aulas e atingir o desempenho mínimo no questionário, você poderá emitir seu certificado de conclusão.
 
          </p>
 
          <button className="certificate-button">
 
            Emitir Certificado
 
          </button>
 
        </section>
 
        {/* AÇÕES */}
 
        <section className="course-actions">
 
          <Link
            to="/cursos"
            className="back-button"
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
 