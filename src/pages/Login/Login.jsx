
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { Link } from "react-router-dom";
import { useState } from "react";

import styles from "./login.module.css";

function Login() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mensagem, setMensagem] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMensagem("A autenticação ainda não está conectada a um serviço. Nenhum dado foi salvo ou enviado.");
  }

  return (
    <>
      <Navbar />

      <main className={styles["login-page"]}>
        <section className={styles["login-form-section"]}>
          <div className={styles["login-card"]}>
            <span className={styles["login-badge"]}>Plataforma Equitá</span>
            <h1>Entrar</h1>
            <p>Informe seus dados para acessar sua conta.</p>
            <p className={styles.serviceNotice}>
              A autenticação ainda não está disponível. Este formulário não envia nem armazena credenciais.
            </p>

            <form onSubmit={handleSubmit}>
              <div className={styles["input-group"]}>
                <label htmlFor="login-email">E-mail</label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Digite seu e-mail"
                  required
                />
              </div>

              <div className={styles["input-group"]}>
                <label htmlFor="login-password">Senha</label>
                <div className={styles["password-input"]}>
                  <input
                    id="login-password"
                    name="password"
                    type={mostrarSenha ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Digite sua senha"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {mostrarSenha ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              </div>

            <div className={styles["login-options"]}>
              <Link to="/recuperar-senha">Esqueci minha senha</Link>
            </div>

            {mensagem && <p className={styles.feedbackMessage} role="status">{mensagem}</p>}
            <button type="submit" className={styles["login-button"]}>Entrar</button>
            <div className={styles["divider"]}>
              <span>ou</span>
            </div>
            <Link
              to="/cadastro"
              className={styles["register-button"]}
            >
              Criar conta
            </Link>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Login;

