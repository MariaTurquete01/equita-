import { Link } from "react-router-dom";

import styles from "./hero.module.css";

function Hero() {
  return (
    <section className={styles.hero}>

      <div className={styles.heroContent}>

        <span className={styles.badge}>
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

        <div className={styles.heroButtons}>

          <Link
            to="/cadastro"
            className={styles.primaryBtn}
          >
            Criar Conta
          </Link>

          <Link
            to="/direitos"
            className={styles.secondaryBtn}
          >
            Explorar Direitos
          </Link>

        </div>

      </div>

    </section>
  );
}

export default Hero;