import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
 
import { Link } from "react-router-dom";
import { useState } from "react";
 
import "./style.css";
 
function Login() {
 
  const [mostrarSenha, setMostrarSenha] = useState(false);
 
  return (
    <>
      <Navbar />
 
      <main className="login-page">
 
        {/* LADO ESQUERDO */}
 
        <section className="login-banner">
 
          <span className="login-badge">
 
            Plataforma Equitá
 
          </span>
 
          <h1>
 
            Bem-vindo de volta!
 
          </h1>
 
          <p>
 
            Acesse sua conta para acompanhar denúncias,
            realizar cursos, consultar seus direitos
            e utilizar todos os recursos da plataforma.
 
          </p>
 
          <img
            src="/images/login-banner.svg"
            alt="Ilustração Equitá"
          />
 
        </section>
 
        {/* LADO DIREITO */}
 
        <section className="login-form-section">
 
          <div className="login-card">
 
            <h2>
 
              Entrar
 
            </h2>
 
            <p>
 
              Informe seus dados para acessar sua conta.
 
            </p>
 
            {/* EMAIL */}
 
            <div className="input-group">
 
              <label>E-mail</label>
 
              <input
                type="email"
                placeholder="Digite seu e-mail"
              />
 
            </div>
 
            {/* SENHA */}
 
            <div className="input-group">
 
              <label>Senha</label>
 
              <div className="password-input">
 
                <input
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Digite sua senha"
                />
 
                <button
                  type="button"
                  onClick={() =>
                    setMostrarSenha(!mostrarSenha)
                  }
                >
 
                  {mostrarSenha ? "Ocultar" : "Mostrar"}
 
                </button>
 
              </div>
 
            </div>
 
            {/* OPÇÕES */}
 
            <div className="login-options">
 
              <label>
 
                <input type="checkbox" />
 
                Lembrar de mim
 
              </label>
 
              <Link to="/recuperar-senha">
 
                Esqueci minha senha
 
              </Link>
 
            </div>
 
            {/* BOTÃO */}
 
            <button className="login-button">
 
              Entrar
 
            </button>
 
            <div className="divider">
 
              <span>ou</span>
 
            </div>
 
            <Link
              to="/cadastro"
              className="register-button"
            >
 
              Criar conta
 
            </Link>
 
          </div>
 
        </section>
 
      </main>
 
      <Footer />
 
    </>
  );
 
}
 
export default Login;
 