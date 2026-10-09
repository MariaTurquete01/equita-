import { useState } from "react";
 
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
 
import styles from "./configuracoes.module.css";
 
function Configuracoes() {
 
    const [notificacoes, setNotificacoes] = useState(true);
 
    const handleSalvar = (event) => {
        event.preventDefault();
 
        alert("Configurações salvas com sucesso!");
    };
 
    return (
        <>
            <Navbar />
 
            <main className={styles.configuracoesPage}>
 
                {/* CABEÇALHO */}
 
                <section className={styles.configuracoesHero}>
 
                    <span className={styles.heroBadge}>
                        Minha conta
                    </span>
 
                    <h1>
                        Configurações
                    </h1>
 
                    <p>
                        Gerencie as configurações da sua conta na plataforma
                        Equitá.
                    </p>
 
                </section>
 
                {/* CONTEÚDO */}
 
                <section className={styles.configuracoesContent}>
 
                    <form
                        className={styles.configuracoesCard}
                        onSubmit={handleSalvar}
                    >
 
                        {/* CONTA */}
 
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
 
                                    <span>
                                        usuario@email.com
                                    </span>
                                </div>
 
                            </div>
 
                        </div>
 
                        {/* PREFERÊNCIAS */}
 
                        <div className={styles.configSection}>
 
                            <h2>
                                Preferências
                            </h2>
 
                            <p>
                                Escolha como deseja receber informações da
                                plataforma.
                            </p>
 
                            <label className={styles.toggleItem}>
 
                                <div>
 
                                    <strong>
                                        Notificações
                                    </strong>
 
                                    <span>
                                        Receber atualizações e informações
                                        importantes da Equitá.
                                    </span>
 
                                </div>
 
                                <input
                                    type="checkbox"
                                    checked={notificacoes}
                                    onChange={(event) =>
                                        setNotificacoes(event.target.checked)
                                    }
                                />
 
                            </label>
 
                        </div>
 
                        {/* AÇÕES */}
 
                        <div className={styles.formActions}>
 
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
 