import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
 
import "./style.css";
 
function Recursos() {
 
    return (
 
        <>
 
            <Navbar />
 
            <main className="resources-page">
 
                {/* HERO */}
 
                <section className="resources-hero">
 
                    <span className="hero-badge">
 
                        Localizador de Recursos
 
                    </span>
 
                    <h1>
 
                        Encontre instituições de apoio
 
                    </h1>
 
                    <p>
 
                        Localize rapidamente órgãos públicos, hospitais, delegacias, centros de assistência e organizações que podem oferecer atendimento e orientação.
 
                    </p>
 
                </section>
 
                {/* PESQUISA */}
 
                <section className="search-section">
 
                    <div className="search-card">
 
                        <h2>
 
                            Pesquisar recursos
 
                        </h2>
 
                        <div className="search-grid">
 
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
 
                {/* FILTROS */}
 
                <section className="filters-section">
 
                    <h2>
 
                        Filtrar instituições
 
                    </h2>
 
                    <div className="filters">
 
                        <button>Delegacias</button>
 
                        <button>ONGs</button>
 
                        <button>Abrigos</button>
 
                        <button>Hospitais</button>
 
                        <button>Defensoria Pública</button>
 
                        <button>CRAS</button>
 
                        <button>CREAS</button>
 
                    </div>
 
                </section>
 
                {/* MAPA */}
 
                <section className="map-section">
 
                    <div className="map-placeholder">
 
                        🗺️
 
                        <h2>
 
                            Área destinada ao mapa
 
                        </h2>
 
                        <p>
 
                            Aqui será integrado futuramente Google Maps ou OpenStreetMap.
 
                        </p>
 
                    </div>
 
                </section>
 
                {/* RESULTADOS */}
 
                <section className="results-section">
 
                    <h2>
 
                        Instituições encontradas
 
                    </h2>
 
                    <div className="results-grid">
 
                        <div className="resource-card">
 
                            <h3>
 
                                Delegacia da Mulher
 
                            </h3>
 
                            <p>
 
                                📍 Endereço
 
                            </p>
 
                            <p>
 
                                📞 Telefone
 
                            </p>
 
                            <p>
 
                                🕒 Horário
 
                            </p>
 
                            <button>
 
                                Como chegar
 
                            </button>
 
                        </div>
 
                        <div className="resource-card">
 
                            <h3>
 
                                CRAS
 
                            </h3>
 
                            <p>
 
                                📍 Endereço
 
                            </p>
 
                            <p>
 
                                📞 Telefone
 
                            </p>
 
                            <p>
 
                                🕒 Horário
 
                            </p>
 
                            <button>
 
                                Como chegar
 
                            </button>
 
                        </div>
 
                        <div className="resource-card">
 
                            <h3>
 
                                Hospital
 
                            </h3>
 
                            <p>
 
                                📍 Endereço
 
                            </p>
 
                            <p>
 
                                📞 Telefone
 
                            </p>
 
                            <p>
 
                                🕒 Horário
 
                            </p>
 
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
 