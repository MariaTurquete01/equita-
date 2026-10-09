import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
 
import styles from "./perfil.module.css";
 
function Perfil() {
 
    return (
        <>
            <Navbar />
 
            <main className={styles.perfilPage}>
 
                {/* CABEÇALHO */}
 
                <section className={styles.perfilHero}>
 
                    <span className={styles.heroBadge}>
                        Minha conta
                    </span>
 
                    <h1>
                        Meu Perfil
                    </h1>
 
                    <p>
                        Visualize e acompanhe as informações da sua conta
                        na plataforma Equitá.
                    </p>
 
                </section>
 
                {/* PERFIL */}
 
                <section className={styles.perfilContent}>
 
                    <div className={styles.perfilCard}>
 
                        <div className={styles.perfilFoto}>
                            👤
                        </div>
 
                        <div className={styles.perfilInfo}>
 
                            <h2>
                                Meu perfil
                            </h2>
 
                            <div className={styles.infoItem}>
                                <span>Nome</span>
                                <strong>
                                    Usuário Equitá
                                </strong>
                            </div>
 
                            <div className={styles.infoItem}>
                                <span>E-mail</span>
                                <strong>
                                    usuario@email.com
                                </strong>
                            </div>
 
                            <div className={styles.infoItem}>
                                <span>Tipo de conta</span>
                                <strong>
                                    Usuário
                                </strong>
                            </div>
 
                        </div>
 
                    </div>
 
                </section>
 
            </main>
 
            <Footer />
        </>
    );
}
 
export default Perfil;
 