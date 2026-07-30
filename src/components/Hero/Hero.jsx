import "./style.css";
import { Link } from "react-router-dom";
 
function Hero() {
  return (
    <section className="hero">
 
      <div className="hero-content">
 
        <span className="badge">
          Plataforma de Cidadania e Inclusão Social
        </span>
 
        <h1>
          Conheça seus direitos,
          encontre apoio e transforme vidas.
        </h1>
 
        <p>
          O Equitá conecta cidadãos,
          instituições e educadores em um ambiente
          seguro para orientação, aprendizado
          e promoção da igualdade.
        </p>
 
        <div className="hero-buttons">
 
          <Link to="/cadastro">
            <button className="primary-btn">
              Criar Conta
            </button>
          </Link>
 
          <Link to="/direitos">
            <button className="secondary-btn">
              Explorar Direitos
            </button>
          </Link>
 
        </div>
 
      </div>
 
    </section>
  );
}
 
export default Hero;
 