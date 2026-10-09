import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className={styles.navbar}>

      {/* LOGO */}
      <div className={styles.logo}>
        Equitá
      </div>

      {/* NAVEGAÇÃO */}
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

      {/* BOTÕES + PERFIL */}
      <div className={styles.navbarRight}>

        <div className={styles.buttons}>

          <Link to="/login">
            <button className={styles.loginBtn}>
              Entrar
            </button>
          </Link>

          <Link to="/cadastro">
            <button className={styles.registerBtn}>
              Criar Conta
            </button>
          </Link>

        </div>

        {/* MENU DO PERFIL */}
        <div className={styles.profileMenu}>

          <button
            className={styles.menuButton}
            onClick={() => setMenuAberto(!menuAberto)}
            aria-label="Abrir menu do perfil"
            aria-expanded={menuAberto}
          >
            ☰
          </button>

          {menuAberto && (
            <div className={styles.profileDropdown}>

              <div className={styles.profileHeader}>

                <div className={styles.profileIcon}>
                  👤
                </div>

                <div>
                  <strong>
                    Minha conta
                  </strong>

                  <span>
                    Configurações do perfil
                  </span>
                </div>

              </div>

              <div className={styles.dropdownDivider}></div>

              <Link
                to="/perfil"
                onClick={() => setMenuAberto(false)}
              >
                👤 Perfil
              </Link>

              <Link
                to="/configuracoes"
                onClick={() => setMenuAberto(false)}
              >
                ⚙️ Configurações
              </Link>

              <button
                className={styles.logoutButton}
                onClick={() => setMenuAberto(false)}
              >
                ↪ Encerrar sessão
              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}

export default Navbar;
