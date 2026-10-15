import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { useState } from "react";
import { useParams, Link } from "react-router-dom";

import { carregarCatalogoCursos } from "./catalogoCursos";

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

function obterLinkHttpSeguro(link) {
  if (typeof link !== "string" || !link.trim()) return null;

  try {
    const url = new URL(link);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

function salvarProgressoCurso(cursoId, aulasConcluidas, totalAulas) {
  const inscricoes = JSON.parse(window.localStorage.getItem(CHAVE_INSCRICOES) || "[]");
  const inscricaoAtual = inscricoes.find((item) => item.cursoId === cursoId);

  if (!inscricaoAtual) return null;

  const inscricaoAtualizada = {
    ...inscricaoAtual,
    aulasConcluidas,
    progresso: totalAulas ? Math.round((aulasConcluidas.length / totalAulas) * 100) : 0,
  };
  const inscricoesAtualizadas = inscricoes.map((item) => (
    item.cursoId === cursoId ? inscricaoAtualizada : item
  ));

  window.localStorage.setItem(CHAVE_INSCRICOES, JSON.stringify(inscricoesAtualizadas));
  return inscricaoAtualizada;
}

function CursoDetalhe() {
  const { id } = useParams();

  const curso = carregarCatalogoCursos().find(
    (item) => String(item.id) === id
  );
  const [inscricaoSalva, setInscricaoSalva] = useState(() => ({
    cursoId: curso?.id,
    inscricao: obterInscricao(curso?.id),
  }));
  const [erroInscricao, setErroInscricao] = useState("");
  const [falhaProgresso, setFalhaProgresso] = useState({ cursoId: null, mensagem: "" });
  const inscricao = inscricaoSalva.cursoId === curso?.id
    ? inscricaoSalva.inscricao
    : obterInscricao(curso?.id);
  const erroProgresso = falhaProgresso.cursoId === curso?.id
    ? falhaProgresso.mensagem
    : "";
  const aulas = !curso
    ? []
    : curso.propostaAprovada
      ? (Array.isArray(curso.aulas) ? curso.aulas : [])
      : Array.from({ length: curso.aulas || 0 }, (_, indice) => ({
        id: indice + 1,
        titulo: `Aula ${indice + 1}`,
        descricao: "Conteúdo demonstrativo.",
      }));
  const aulasConcluidas = Array.isArray(inscricao?.aulasConcluidas)
    ? inscricao.aulasConcluidas
    : [];
  const progresso = aulas.length
    ? Math.round((aulasConcluidas.length / aulas.length) * 100)
    : 0;
  const aulasVisiveis = inscricao ? aulas : aulas.slice(0, 1);

  function inscreverNoCurso() {
    try {
      const inscricoesSalvas = JSON.parse(window.localStorage.getItem(CHAVE_INSCRICOES) || "[]");
      const inscricoes = Array.isArray(inscricoesSalvas) ? inscricoesSalvas : [];
      const inscricaoExistente = inscricoes.find((item) => item.cursoId === curso.id);

      if (inscricaoExistente) {
        setInscricaoSalva({ cursoId: curso.id, inscricao: inscricaoExistente });
        return;
      }

      const novaInscricao = {
        cursoId: curso.id,
        progresso: 0,
        aulasConcluidas: [],
        inscritoEm: new Date().toISOString(),
      };

      window.localStorage.setItem(
        CHAVE_INSCRICOES,
        JSON.stringify([...inscricoes, novaInscricao])
      );
      setInscricaoSalva({ cursoId: curso.id, inscricao: novaInscricao });
      setErroInscricao("");
    } catch {
      setErroInscricao("Não foi possível salvar a inscrição neste navegador.");
    }
  }

  function alternarConclusaoAula(idAula) {
    if (!inscricao) return;

    const aulasAtualizadas = aulasConcluidas.includes(idAula)
      ? aulasConcluidas.filter((aula) => aula !== idAula)
      : [...aulasConcluidas, idAula];

    try {
      const inscricaoAtualizada = salvarProgressoCurso(curso.id, aulasAtualizadas, aulas.length);
      if (!inscricaoAtualizada) {
        setFalhaProgresso({ cursoId: curso.id, mensagem: "Inscrição não encontrada neste navegador." });
        return;
      }

      setInscricaoSalva({ cursoId: curso.id, inscricao: inscricaoAtualizada });
      setFalhaProgresso({ cursoId: curso.id, mensagem: "" });
    } catch {
      setFalhaProgresso({ cursoId: curso.id, mensagem: "Não foi possível salvar seu progresso neste navegador." });
    }
  }

  if (!curso) {
    return (
      <>
        <Navbar />
        <main className={styles.courseNotFound}>
          <h1>Curso não encontrado.</h1>
          <Link to="/cursos">Voltar para Cursos</Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className={styles.coursePage}>
        <section className={styles.courseHero}>
          <div className={styles.courseHeroContent}>
            <span className={styles.courseCategory}>{curso.categoria}</span>
            <h1>{curso.titulo}</h1>
            <p>{curso.descricao}</p>
            <div className={styles.courseMeta}>
              <span>Professor: {curso.professor}</span>
              <span>Duração: {curso.cargaHoraria}</span>
              <span>Nível: {curso.nivel}</span>
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
                aria-valuenow={progresso}
              >
                <div
                  className={styles.progressFill}
                  style={{ width: `${progresso}%` }}
                />
              </div>
              <p>{progresso}% concluído</p>
            </>
          ) : (
            <div className={styles.enrollmentPrompt}>
              <p>Você está vendo uma prévia. Inscreva-se para acessar todas as aulas e acompanhar seu progresso.</p>
              {erroInscricao && <p role="alert">{erroInscricao}</p>}
              <button className={styles.enrollButton} type="button" onClick={inscreverNoCurso}>
                Inscrever-se
              </button>
              <small>A inscrição é demonstrativa e fica salva somente neste navegador.</small>
            </div>
          )}
        </section>

        {/* AULAS */}
        <section className={styles.lessonsSection}>
          <h2>
            Conteúdo do Curso
          </h2>

          <div className={styles.moduleCard}>
            {curso.propostaAprovada && aulas.length === 0 ? (
              <p>Este curso ainda não possui aulas cadastradas.</p>
            ) : (
              <>
                {!inscricao ? (
                  <p className={styles.lessonNotice}>Prévia do curso. Inscreva-se para acessar o conteúdo completo.</p>
                ) : !curso.propostaAprovada ? (
                  <p className={styles.lessonNotice}>Conteúdo demonstrativo. Marque as aulas concluídas para atualizar seu progresso.</p>
                ) : null}
                {aulasVisiveis.map((aula, indice) => {
                  const idAula = aula.id ?? indice + 1;
                  const concluida = aulasConcluidas.includes(idAula);
                  const linkMaterial = obterLinkHttpSeguro(aula.link);

                  return (
                    <article className={`${styles.lessonCard} ${concluida ? styles.lessonCompleted : ""}`} key={idAula}>
                      <div className={styles.lessonContent}>
                        <strong>{aula.titulo || `Aula ${indice + 1}`}</strong>
                        {aula.descricao && <p>{aula.descricao}</p>}
                        {inscricao && linkMaterial && (
                          <a href={linkMaterial} target="_blank" rel="noopener noreferrer">
                            Acessar material da aula
                          </a>
                        )}
                      </div>
                      {inscricao ? (
                        <button
                          type="button"
                          aria-pressed={concluida}
                          onClick={() => alternarConclusaoAula(idAula)}
                        >
                          {concluida ? "Desmarcar conclusão" : "Marcar como concluída"}
                        </button>
                      ) : (
                        <span>Prévia</span>
                      )}
                    </article>
                  );
                })}
              </>
            )}
            {erroProgresso && <p role="alert">{erroProgresso}</p>}
          </div>
        </section>

        {/* APOSTILAS */}
        <section className={styles.materialsSection}>
          <h2>
            Apostilas e Materiais
          </h2>

          {!inscricao ? (
            <p>Inscreva-se para liberar os materiais do curso.</p>
          ) : curso.propostaAprovada ? (
            <p>Os materiais deste curso ainda não foram cadastrados.</p>
          ) : (
            <>
              <div className={styles.materialCard}>📄 Apostila Principal (PDF)</div>
              <div className={styles.materialCard}>📑 Material Complementar</div>
              <div className={styles.materialCard}>📚 Leituras Recomendadas</div>
            </>
          )}
        </section>

        {/* QUESTIONÁRIOS */}
        <section className={styles.quizSection}>
          <h2>
            Questionários
          </h2>

          {curso.propostaAprovada ? (
            <p>O questionário ainda não está disponível para este curso.</p>
          ) : (
            <>
              <p>Ao concluir as aulas, responda ao questionário para testar seus conhecimentos.</p>
              <button className={styles.quizButton}>Responder Questionário</button>
            </>
          )}
        </section>

        {/* CERTIFICADO */}
        <section id="certificado" className={styles.certificateSection}>
          <h2>
            Certificado
          </h2>

          {!curso.certificado ? (
            <p>O certificado ainda não está disponível para este curso.</p>
          ) : !inscricao ? (
            <p>Inscreva-se no curso para liberar o certificado.</p>
          ) : progresso < 100 ? (
            <p>Conclua todas as aulas para liberar o certificado demonstrativo.</p>
          ) : (
            <>
              <div className={styles.certificateDocument}>
                <span>Equitá</span>
                <h3>Certificado de conclusão</h3>
                <p>Declaramos que o participante concluiu o curso:</p>
                <strong>{curso.titulo}</strong>
                <p>Emitido em {new Date().toLocaleDateString("pt-BR")}</p>
                <small>Documento demonstrativo gerado no navegador, sem validação institucional.</small>
              </div>
              <button className={`${styles.certificateButton} ${styles.printButton}`} type="button" onClick={() => window.print()}>
                Imprimir ou salvar como PDF
              </button>
            </>
          )}
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
