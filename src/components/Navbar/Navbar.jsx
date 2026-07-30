import "./style.css";
import { Link } from "react-router-dom";
 
function Navbar() {
  return (
    <header className="navbar">
 
      <div className="logo">
        Equitá
      </div>
 
      <nav>
 
        <ul>
 
          <li>
            <Link to="/">Início</Link>
          </li>
          
          <li>
            <Link to="/denuncias">Denúncias</Link>
          </li>

          <li>
            <Link to="/direitos">Direitos</Link>
          </li>
 
          <li>
            <Link to="/cursos">Cursos</Link>
          </li>
 
          <li>
            <Link to="/recursos">Recursos</Link>
          </li>
 
          <li>
            <Link to="/sobre">Sobre</Link>
          </li>
 
        </ul>
 
      </nav>
 
      <div className="buttons">
 
        <Link to="/login">
          <button className="login-btn">
            Entrar
          </button>
        </Link>
 
        <Link to="/cadastro">
          <button className="register-btn">
            Criar Conta
          </button>
        </Link>
 
      </div>
 
    </header>
  );
}
 
export default Navbar;
 
 