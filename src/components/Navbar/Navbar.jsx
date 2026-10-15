import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";

const CHAVE_DENUNCIAS = "equita_denuncias";

function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();

  function encerrarSessao() {
    const confirmado = window.confirm(
      "Este protótipo não possui autenticação. Sair apagará as denúncias temporárias desta sessão. Deseja continuar?"
    );
    if (!confirmado) return;

    window.sessionStorage.removeItem(CHAVE_DENUNCIAS);
    setMenuAberto(false);
    navigate("/", { replace: true });
  }

  return (
    <header className={styles.navbar}>
      <Link className={styles.logo} to="/" aria-label="Equitá, início">
        <span className={styles.logoMark} aria-hidden="true" />
        <span>Equitá</span>
      </Link>

      <nav className={styles.navigation} aria-label="Navegação principal">
        <ul>
          <li><Link to="/">Início</Link></li>
          <li><Link to="/denuncias">Denúncias</Link></li>
          <li><Link to="/cursos">Cursos</Link></li>
          <li><Link to="/direitos">Direitos</Link></li>
          <li><Link to="/recursos">Recursos</Link></li>
          <li><Link to="/sobre">Sobre</Link></li>
        </ul>
      </nav>

      <div className={styles.navbarRight}>
        <div className={styles.buttons}>
          <Link className={styles.loginBtn} to="/login">Entrar</Link>
          <Link className={styles.registerBtn} to="/cadastro">Cadastrar</Link>
        </div>

        <div className={styles.profileMenu}>
          <button
            className={styles.menuButton}
            onClick={() => setMenuAberto(!menuAberto)}
            aria-label={menuAberto ? "Fechar menu do perfil" : "Abrir menu do perfil"}
            aria-haspopup="true"
            aria-expanded={menuAberto}
            type="button"
          >
            <span aria-hidden="true">☰</span>
          </button>

          {menuAberto && (
            <div className={styles.profileDropdown} role="menu">
              <div className={styles.profileHeader}>
                <div className={styles.profileIcon} aria-hidden="true">●</div>
                <div>
                  <strong>Minha conta</strong>
                  <span>Configurações do perfil</span>
                </div>
              </div>

              <div className={styles.dropdownDivider} />

              <Link
                to="/perfil"
                onClick={() => setMenuAberto(false)}
                role="menuitem"
              >
                Perfil
              </Link>

              <Link
                to="/configuracoes"
                onClick={() => setMenuAberto(false)}
                role="menuitem"
              >
                Configurações
              </Link>

              <button
                className={styles.logoutButton}
                onClick={encerrarSessao}
                role="menuitem"
                type="button"
              >
                Sair da demonstração
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
