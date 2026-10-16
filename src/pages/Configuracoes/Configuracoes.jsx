import { useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { obterSessao } from "../../services/sessao";

import styles from "./configuracoes.module.css";

const CHAVE_NOTIFICACOES = "equita_notificacoes_ativas";

function carregarPreferenciaNotificacoes() {
  try {
    const preferenciaSalva = window.localStorage.getItem(CHAVE_NOTIFICACOES);
    return preferenciaSalva === null ? true : preferenciaSalva === "true";
  } catch {
    return true;
  }
}

function Configuracoes() {
  const sessao = obterSessao();

  const [notificacoes, setNotificacoes] = useState(carregarPreferenciaNotificacoes);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const handleSalvar = (event) => {
    event.preventDefault();

    try {
      window.localStorage.setItem(CHAVE_NOTIFICACOES, String(notificacoes));
      setMensagem("Preferência salva nesta sessão.");
      setErro("");
    } catch {
      setMensagem("");
      setErro("Não foi possível salvar a preferência.");
    }
  };

  return (
    <>
      <Navbar />

      <main className={styles.configuracoesPage}>

        <section className={styles.configuracoesHero}>

          <span className={styles.heroBadge}>
            Minha conta
          </span>

          <h1>
            Configurações
          </h1>

          <p>
            Gerencie as configurações da sua conta na plataforma Equitá.
          </p>

        </section>

        <section className={styles.configuracoesContent}>

          <form
            className={styles.configuracoesCard}
            onSubmit={handleSalvar}
          >

            <div className={styles.configSection}>

              <h2>
                Conta
              </h2>

              <p>
                Gerencie as informações básicas da sua conta.
              </p>

              <div className={styles.configItem}>

                <div>
                  <strong>
                    E-mail
                  </strong>
                </div>

                <div>
                  {sessao?.username || "usuario@email.com"}
                </div>

              </div>

            </div>

            <div className={styles.configSection}>

              <h2>
                Preferências
              </h2>

              <p>
                Escolha como deseja receber informações da plataforma.
              </p>

              <label className={styles.toggleItem}>

                <div>

                  <strong>
                    Notificações
                  </strong>

                  <span>
                    Receber atualizações e informações importantes da Equitá.
                  </span>

                </div>

                <input
                  type="checkbox"
                  checked={notificacoes}
                  onChange={(event) => {
                    setNotificacoes(event.target.checked);
                    setMensagem("");
                    setErro("");
                  }}
                />

              </label>

            </div>

            <div className={styles.formActions}>

              {mensagem && <p className={styles.feedbackMessage} role="status">{mensagem}</p>}
              {erro && <p className={styles.errorMessage} role="alert">{erro}</p>}

              <button
                type="submit"
                className={styles.saveButton}
              >
                Salvar alterações
              </button>

            </div>

          </form>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default Configuracoes;
