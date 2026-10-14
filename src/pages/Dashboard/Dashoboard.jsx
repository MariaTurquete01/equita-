import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { carregarCursosPropostos, salvarCursosPropostos } from "../Voluntario/cursosPropostos";
import styles from "./dashboard.module.css";

const ABAS = ["Voluntários", "Conteúdos", "Instituições"];

function Dashboard() {
  const [abaAtiva, setAbaAtiva] = useState("Voluntários");
  const [cursos, setCursos] = useState(carregarCursosPropostos);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  function atualizarStatus(curso, status) {
    try {
      const cursosAtualizados = cursos.map((item) => item.id === curso.id
        ? { ...item, status, revisadoEm: new Date().toISOString() }
        : item);
      salvarCursosPropostos(cursosAtualizados);
      setCursos(cursosAtualizados);
      setMensagem(`Proposta “${curso.titulo}” marcada como ${status.toLowerCase()}.`);
      setErro("");
    } catch {
      setErro("Não foi possível atualizar o status neste navegador.");
      setMensagem("");
    }
  }

  return (
    <>
      <Navbar />
      <main className={styles["dashboard-page"]}>
        <header className={styles["admin-header"]}>
          <span className={styles["dashboard-badge"]}>Administração</span>
          <h1>Painel do Administrador</h1>
          <p>Acompanhe solicitações e propostas pendentes de análise.</p>
          <p className={styles["prototype-notice"]} role="note">
            Protótipo local: não há autenticação ou controle de acesso administrativo. Os dados ficam neste navegador.
          </p>
        </header>

        <section className={styles["admin-content"]}>
          <div className={styles["admin-tabs"]} role="tablist" aria-label="Seções administrativas">
            {ABAS.map((aba) => (
              <button
                type="button"
                role="tab"
                id={`admin-tab-${aba.toLowerCase()}`}
                aria-selected={abaAtiva === aba}
                aria-controls="admin-panel"
                className={abaAtiva === aba ? styles["admin-tab-active"] : ""}
                key={aba}
                onClick={() => {
                  setAbaAtiva(aba);
                  setMensagem("");
                  setErro("");
                }}
              >
                {aba}
              </button>
            ))}
          </div>

          <section
            className={styles["admin-panel"]}
            id="admin-panel"
            role="tabpanel"
            aria-labelledby={`admin-tab-${abaAtiva.toLowerCase()}`}
          >
            {mensagem && <p className={styles["admin-feedback"]} role="status">{mensagem}</p>}
            {erro && <p className={styles["admin-error"]} role="alert">{erro}</p>}

            {abaAtiva === "Conteúdos" ? (
              <>
                <div className={styles["panel-heading"]}>
                  <div>
                    <h2>Propostas de cursos</h2>
                    <p>As propostas aprovadas ainda não são publicadas automaticamente no catálogo.</p>
                  </div>
                  <span>{cursos.length} propostas</span>
                </div>
                {cursos.length === 0 ? (
                  <div className={styles["admin-empty"]}>
                    <h3>Nenhuma proposta de conteúdo</h3>
                    <p>Propostas enviadas pelos voluntários aparecerão aqui para análise.</p>
                  </div>
                ) : (
                  <div className={styles["request-list"]}>
                    {cursos.map((curso) => (
                      <article className={styles["request-item"]} key={curso.id}>
                        <div className={styles["request-details"]}>
                          <span className={styles["request-category"]}>{curso.categoria}</span>
                          <h3>{curso.titulo}</h3>
                          <p>{curso.descricao}</p>
                          <small>{curso.duracao} · Status: {curso.status || "Em análise"}</small>
                        </div>
                        <div className={styles["request-actions"]}>
                          <button
                            type="button"
                            className={styles["approve-button"]}
                            disabled={curso.status === "Aprovado"}
                            onClick={() => atualizarStatus(curso, "Aprovado")}
                          >
                            Aprovar
                          </button>
                          <button
                            type="button"
                            className={styles["reject-button"]}
                            disabled={curso.status === "Rejeitado"}
                            onClick={() => atualizarStatus(curso, "Rejeitado")}
                          >
                            Rejeitar
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className={styles["admin-empty"]}>
                <h2>{abaAtiva}</h2>
                <p>Nenhuma solicitação cadastrada nesta seção.</p>
              </div>
            )}
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Dashboard;

 