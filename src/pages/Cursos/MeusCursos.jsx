import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { carregarCatalogoCursos } from "./catalogoCursos";
import styles from "./meusCursos.module.css";

const CHAVE_INSCRICOES = "equita_cursos_inscritos";

function carregarInscricoes() {
  try {
    const inscricoes = JSON.parse(window.localStorage.getItem(CHAVE_INSCRICOES) || "[]");
    return Array.isArray(inscricoes) ? inscricoes : [];
  } catch {
    return [];
  }
}

function contarAulas(curso) {
  return Array.isArray(curso.aulas) ? curso.aulas.length : Number(curso.aulas) || 0;
}

function MeusCursos() {
  const cursosDisponiveis = carregarCatalogoCursos();
  const [inscricoes, setInscricoes] = useState(carregarInscricoes);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const cursosInscritos = inscricoes
    .map((inscricao) => ({
      curso: cursosDisponiveis.find((curso) => curso.id === inscricao.cursoId),
      progresso: Number(inscricao.progresso) || 0,
    }))
    .filter(({ curso }) => curso);

  function cancelarInscricao(curso) {
    const confirmado = window.confirm(
      `Cancelar a inscrição em “${curso.titulo}”? O progresso salvo neste navegador também será removido.`
    );
    if (!confirmado) return;

    const inscricoesAtualizadas = inscricoes.filter((inscricao) => inscricao.cursoId !== curso.id);

    try {
      window.localStorage.setItem(CHAVE_INSCRICOES, JSON.stringify(inscricoesAtualizadas));
      setInscricoes(inscricoesAtualizadas);
      setMensagem(`Inscrição em “${curso.titulo}” cancelada neste navegador.`);
      setErro("");
    } catch {
      setErro("Não foi possível cancelar a inscrição neste navegador.");
      setMensagem("");
    }
  }

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Área do aluno</span>
          <h1>Meus Cursos</h1>
          <p>Acompanhe suas inscrições e retome seus estudos.</p>
        </header>

        <section className={styles.content} aria-live="polite">
          {mensagem && <p className={styles.feedbackMessage} role="status">{mensagem}</p>}
          {erro && <p className={styles.errorMessage} role="alert">{erro}</p>}
          {cursosInscritos.length === 0 ? (
            <div className={styles.emptyState}>
              <h2>Você ainda não está inscrito em cursos</h2>
              <p>Explore o catálogo para encontrar um curso para começar.</p>
              <Link className={styles.primaryLink} to="/cursos">Explorar cursos</Link>
            </div>
          ) : (
            <div className={styles.courseGrid}>
              {cursosInscritos.map(({ curso, progresso }) => (
                <article className={styles.courseCard} key={curso.id}>
                  <span className={styles.category}>{curso.categoria}</span>
                  <h2>{curso.titulo}</h2>
                  <p>{curso.descricao}</p>
                  <div className={styles.progressHeader}>
                    <span>Progresso</span>
                    <strong>{progresso}%</strong>
                  </div>
                  <div
                    className={styles.progressTrack}
                    role="progressbar"
                    aria-label={`Progresso em ${curso.titulo}`}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow={Math.min(100, Math.max(0, progresso))}
                  >
                    <span style={{ width: `${Math.min(100, Math.max(0, progresso))}%` }} />
                  </div>
                  <div className={styles.courseMeta}>
                    <span>{curso.cargaHoraria}</span>
                    <span>{contarAulas(curso) ? `${contarAulas(curso)} aulas` : "Conteúdo em breve"}</span>
                  </div>
                  <div className={styles.actions}>
                    <Link className={styles.primaryLink} to={`/curso/${curso.id}`}>
                      Continuar curso
                    </Link>
                    {progresso >= 100 && curso.certificado && (
                      <Link className={styles.secondaryLink} to={`/curso/${curso.id}#certificado`}>
                        Certificado
                      </Link>
                    )}
                    <button className={styles.removeButton} type="button" onClick={() => cancelarInscricao(curso)}>
                      Cancelar inscrição
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
          <p className={styles.storageNote}>
            As inscrições são armazenadas neste navegador e não estão associadas a uma conta.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default MeusCursos;