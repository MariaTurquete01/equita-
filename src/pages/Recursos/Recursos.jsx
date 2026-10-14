import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./recursos.module.css";

const categorias = [
    "Todas",
    "Delegacias",
    "ONGs",
    "Abrigos",
    "Hospitais",
    "Defensoria Pública",
    "CRAS",
    "CREAS",
];

function Recursos() {
    const [pesquisa, setPesquisa] = useState("");
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");
    const [pesquisaAplicada, setPesquisaAplicada] = useState("");
    const recursos = [];
    const recursosFiltrados = recursos.filter((recurso) => {
        const correspondeTexto = `${recurso.nome} ${recurso.cidade} ${recurso.endereco}`
            .toLocaleLowerCase("pt-BR")
            .includes(pesquisaAplicada.toLocaleLowerCase("pt-BR"));
        const correspondeCategoria = categoriaSelecionada === "Todas"
            || recurso.categoria === categoriaSelecionada;
        return correspondeTexto && correspondeCategoria;
    });

    return (
        <>
            <Navbar />

            <main className={styles.resourcesPage}>

                <section className={styles.resourcesHero}>

                    <span className={styles.heroBadge}>Localizador de Recursos</span>
                    <h1>Recursos perto de você</h1>
                    <p>Pesquise serviços e instituições de apoio. A lista e o mapa serão exibidos quando houver dados verificados disponíveis.</p>

                </section>

                <section className={styles.searchSection}>

                    <form className={styles.searchCard} onSubmit={(event) => {
                        event.preventDefault();
                        setPesquisaAplicada(pesquisa.trim());
                    }}>
                        <label htmlFor="resource-search">Pesquisar por cidade ou serviço</label>
                        <div className={styles.searchGrid}>
                            <input
                                id="resource-search"
                                type="search"
                                value={pesquisa}
                                onChange={(event) => setPesquisa(event.target.value)}
                                placeholder="Digite cidade ou serviço"
                            />
                            <button type="submit">Pesquisar</button>
                        </div>
                    </form>

                </section>

                <section className={styles.filtersSection}>

                    <h2>Filtrar por categoria</h2>
                    <div className={styles.filters} role="group" aria-label="Categorias de recursos">
                        {categorias.map((categoria) => (
                            <button
                                type="button"
                                key={categoria}
                                aria-pressed={categoriaSelecionada === categoria}
                                className={categoriaSelecionada === categoria ? styles.filterActive : ""}
                                onClick={() => setCategoriaSelecionada(categoria)}
                            >
                                {categoria}
                            </button>
                        ))}
                    </div>

                </section>

                <section className={styles.resourceLayout}>
                    <div className={styles.resultsSection}>
                        <h2>Serviços disponíveis</h2>
                        {recursosFiltrados.length > 0 ? (
                            <div className={styles.resultsGrid}>
                                {recursosFiltrados.map((recurso) => (
                                    <article className={styles.resourceCard} key={recurso.id}>
                                        <span className={styles.resourceCategory}>{recurso.categoria}</span>
                                        <h3>{recurso.nome}</h3>
                                        <p>{recurso.endereco}</p>
                                        {recurso.telefone && <a href={`tel:${recurso.telefone}`}>{recurso.telefone}</a>}
                                        {recurso.horario && <p>{recurso.horario}</p>}
                                        {recurso.url && <a href={recurso.url} target="_blank" rel="noreferrer">Mais informações</a>}
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <div className={styles.emptyState} role="status">
                                <h3>{pesquisaAplicada ? "Nenhum recurso corresponde à busca" : "Nenhuma instituição cadastrada"}</h3>
                                <p>{pesquisaAplicada ? "Tente outra cidade, serviço ou categoria." : "Ainda não há dados verificados de instituições para exibir."}</p>
                            </div>
                        )}
                    </div>

                    <aside className={styles.mapSection} aria-label="Mapa de recursos">
                        <div className={styles.mapPlaceholder}>
                            <span aria-hidden="true">Mapa</span>
                            <h2>Mapa de recursos</h2>
                            <p>O mapa ficará disponível quando houver endereços e coordenadas verificados.</p>
                        </div>
                    </aside>

                </section>

            </main>

            <Footer />
        </>
    );
}

export default Recursos;