import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { Link } from "react-router-dom";
import { useState } from "react";

import styles from "./cadastro.module.css";

function Cadastro() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  return (
    <>
      <Navbar />

      <main className={styles.registerPage}>

        {/* LADO ESQUERDO */}

        <section className={styles.registerBanner}>

          <span className={styles.registerBadge}>
            Plataforma Equitá
          </span>

          <h1>
            Crie sua conta
          </h1>

          <p>
            Faça parte da plataforma Equitá e tenha acesso aos cursos,
            guia de direitos, localizador de recursos e demais serviços
            disponíveis.
          </p>

          <img
            src="/images/register-banner.svg"
            alt="Cadastro Equitá"
          />

        </section>

        {/* FORMULÁRIO */}

        <section className={styles.registerFormSection}>

          <div className={styles.registerCard}>

            <h2>Cadastro</h2>

            <p>
              Preencha os dados abaixo para criar sua conta.
            </p>

            {/* Nome */}

            <div className={styles.inputGroup}>

              <label>Nome completo</label>

              <input
                type="text"
                placeholder="Digite seu nome completo"
              />

            </div>

            {/* CPF */}

            <div className={styles.inputGroup}>

              <label>CPF (Opcional)</label>

              <input
                type="text"
                placeholder="000.000.000-00"
              />

            </div>

            {/* Email */}

            <div className={styles.inputGroup}>

              <label>E-mail</label>

              <input
                type="email"
                placeholder="Digite seu e-mail"
              />

            </div>

            {/* Telefone */}

            <div className={styles.inputGroup}>

              <label>Telefone</label>

              <input
                type="tel"
                placeholder="(11) 99999-9999"
              />

            </div>

            {/* Perfil */}

            <div className={styles.inputGroup}>

              <label>Perfil</label>

              <select>

                <option value="">
                  Selecione um perfil
                </option>

                <option value="usuario">
                  Usuário
                </option>

                <option value="voluntario">
                  Voluntário
                </option>

              </select>

            </div>

            {/* Senha */}

            <div className={styles.inputGroup}>

              <label>Senha</label>

              <div className={styles.passwordInput}>

                <input
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Digite sua senha"
                />

                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                >
                  {mostrarSenha ? "Ocultar" : "Mostrar"}
                </button>

              </div>

            </div>

            {/* Confirmar senha */}

            <div className={styles.inputGroup}>

              <label>Confirmar senha</label>

              <div className={styles.passwordInput}>

                <input
                  type={mostrarConfirmacao ? "text" : "password"}
                  placeholder="Confirme sua senha"
                />

                <button
                  type="button"
                  onClick={() =>
                    setMostrarConfirmacao(!mostrarConfirmacao)
                  }
                >
                  {mostrarConfirmacao ? "Ocultar" : "Mostrar"}
                </button>

              </div>

            </div>

            <button className={styles.registerButton}>
              Cadastrar
            </button>

            <div className={styles.divider}>

              <span>Já possui uma conta?</span>

            </div>

            <Link
              to="/login"
              className={styles.loginLink}
            >
              Entrar
            </Link>

          </div>

        </section>

      </main>

      <Footer />

    </>
  );
}

export default Cadastro;

 