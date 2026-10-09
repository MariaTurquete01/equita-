import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./recursos.module.css";

function Recursos() {
    return (
        <>
            <Navbar />

            <main className={styles.resourcesPage}>

                <section className={styles.resourcesHero}>

                    <span className={styles.heroBadge}>
                        Localizador de Recursos
                    </span>

                    <h1>
                        Encontre instituições de apoio
                    </h1>

                    <p>
                        Localize rapidamente órgãos públicos, hospitais, delegacias, centros de assistência e organizações que podem oferecer atendimento e orientação.
                    </p>

                </section>

                <section className={styles.searchSection}>

                    <div className={styles.searchCard}>

                        <h2>
                            Pesquisar recursos
                        </h2>

                        <div className={styles.searchGrid}>

                            <input
                                type="text"
                                placeholder="Pesquisar cidade..."
                            />

                            <button>
                                Pesquisar
                            </button>

                        </div>

                    </div>

                </section>

                <section className={styles.filtersSection}>

                    <h2>
                        Filtrar instituições
                    </h2>

                    <div className={styles.filters}>

                        <button>Delegacias</button>
                        <button>ONGs</button>
                        <button>Abrigos</button>
                        <button>Hospitais</button>
                        <button>Defensoria Pública</button>
                        <button>CRAS</button>
                        <button>CREAS</button>

                    </div>

                </section>

                <section className={styles.mapSection}>

                    <div className={styles.mapPlaceholder}>

                        🗺️

                        <h2>
                            Área destinada ao mapa
                        </h2>

                        <p>
                            Aqui será integrado futuramente Google Maps ou OpenStreetMap.
                        </p>

                    </div>

                </section>

                <section className={styles.resultsSection}>

                    <h2>
                        Instituições encontradas
                    </h2>

                    <div className={styles.resultsGrid}>

                        <div className={styles.resourceCard}>

                            <h3>
                                Delegacia da Mulher
                            </h3>

                            <p>📍 Endereço</p>
                            <p>📞 Telefone</p>
                            <p>🕒 Horário</p>

                            <button>
                                Como chegar
                            </button>

                        </div>

                        <div className={styles.resourceCard}>

                            <h3>
                                CRAS
                            </h3>

                            <p>📍 Endereço</p>
                            <p>📞 Telefone</p>
                            <p>🕒 Horário</p>

                            <button>
                                Como chegar
                            </button>

                        </div>

                        <div className={styles.resourceCard}>

                            <h3>
                                Hospital
                            </h3>

                            <p>📍 Endereço</p>
                            <p>📞 Telefone</p>
                            <p>🕒 Horário</p>

                            <button>
                                Como chegar
                            </button>

                        </div>

                    </div>

                </section>

            </main>

            <Footer />
        </>
    );
}

export default Recursos;