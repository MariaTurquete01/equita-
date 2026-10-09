import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import cursos from "./cursos";

import styles from "./cursos.module.css";

function Cursos() {
  const [pesquisa, setPesquisa] = useState("");

  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState("Todos");

  const categorias = [
    "Todos",
    "Direitos Humanos",
    "Direitos",
    "Violência",
    "Inclusão",
    "Diversidade",
    "Saúde",
  ];

  const cursosFiltrados = cursos.filter((curso) => {
    const termoPesquisa = pesquisa.toLowerCase();

    const correspondePesquisa =
      curso.titulo
        .toLowerCase()
        .includes(termoPesquisa) ||
      curso.descricao
        .toLowerCase()
        .includes(termoPesquisa) ||
      curso.categoria
        .toLowerCase()
        .includes(termoPesquisa);

    const correspondeCategoria =
      categoriaSelecionada === "Todos" ||
      curso.categoria === categoriaSelecionada;

    return correspondePesquisa && correspondeCategoria;
  });

  const cursosDestaque = cursos.slice(0, 3);

  return (
    <>
      <Navbar />

      <main className={styles.coursesPage}>

        {/* HERO */}
        <section className={styles.coursesHero}>
          <span className={styles.badge}>
            Plataforma de Cursos
          </span>

          <h1>
            Aprenda, desenvolva habilidades e fortaleça sua cidadania
          </h1>

          <p>
            A Plataforma de Cursos do Equitá reúne conteúdos gratuitos
            voltados aos direitos humanos, cidadania, inclusão social,
            prevenção da violência e educação para o exercício da cidadania.
          </p>

          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Pesquisar cursos..."
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
            />
          </div>
        </section>

        {/* CATEGORIAS */}
        <section className={styles.categoriesSection}>
          <div className={styles.sectionTitle}>
            <h2>
              Categorias
            </h2>
          </div>

          <div className={styles.categoriesGrid}>
            {categorias.map((categoria) => (
              <button
                key={categoria}
                className={
                  categoriaSelecionada === categoria
                    ? `${styles.category} ${styles.active}`
                    : styles.category
                }
                onClick={() =>
                  setCategoriaSelecionada(categoria)
                }
              >
                {categoria}
              </button>
            ))}
          </div>
        </section>

        {/* CURSOS EM DESTAQUE */}
        <section className={styles.featuredSection}>
          <div className={styles.sectionTitle}>
            <h2>
              Cursos em Destaque
            </h2>

            <p>
              Conheça alguns dos cursos mais procurados da plataforma.
            </p>
          </div>

          <div className={styles.featuredGrid}>
            {cursosDestaque.map((curso) => (
              <div
                className={styles.featuredCard}
                key={curso.id}
              >
                <img
                  src={curso.imagem}
                  alt={curso.titulo}
                />

                <div className={styles.featuredContent}>
                  <span>
                    {curso.categoria}
                  </span>

                  <h3>
                    {curso.titulo}
                  </h3>

                  <p>
                    {curso.descricao}
                  </p>

                  <div className={styles.courseInfo}>
                    <small>
                      👨‍🏫 {curso.professor}
                    </small>

                    <small>
                      ⏱ {curso.cargaHoraria}
                    </small>

                    <small>
                      ⭐ {curso.nivel}
                    </small>
                  </div>

                  <Link
                    to={`/curso/${curso.id}`}
                    className={styles.startCourse}
                  >
                    Começar Curso
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TODOS OS CURSOS */}
        <section className={styles.allCoursesSection}>
          <div className={styles.sectionTitle}>
            <h2>
              Todos os Cursos
            </h2>

            <p>
              Explore todos os cursos disponíveis na plataforma Equitá.
            </p>
          </div>

          {cursosFiltrados.length > 0 ? (
            <div className={styles.coursesGrid}>
              {cursosFiltrados.map((curso) => (
                <div
                  className={styles.courseCard}
                  key={curso.id}
                >
                  <img
                    src={curso.imagem}
                    alt={curso.titulo}
                  />

                  <div className={styles.courseContent}>
                    <span className={styles.courseCategory}>
                      {curso.categoria}
                    </span>

                    <h3>
                      {curso.titulo}
                    </h3>

                    <p>
                      {curso.descricao}
                    </p>

                    <div className={styles.courseDetails}>
                      <p>
                        👨‍🏫 <strong>Professor:</strong>{" "}
                        {curso.professor}
                      </p>

                      <p>
                        ⏱ <strong>Carga Horária:</strong>{" "}
                        {curso.cargaHoraria}
                      </p>

                      <p>
                        ⭐ <strong>Nível:</strong>{" "}
                        {curso.nivel}
                      </p>

                      <p>
                        🎥 <strong>Aulas:</strong>{" "}
                        {curso.aulas}
                      </p>
                    </div>

                    <Link
                      to={`/curso/${curso.id}`}
                      className={styles.courseButton}
                    >
                      Começar Curso
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptySearch}>
              <h3>
                Nenhum curso encontrado.
              </h3>

              <p>
                Tente pesquisar outro assunto.
              </p>
            </div>
          )}
        </section>

        {/* COMO FUNCIONA */}
        <section className={styles.howItWorks}>
          <div className={styles.sectionTitle}>
            <h2>
              Como Funciona
            </h2>

            <p>
              Aprender na plataforma Equitá é simples.
            </p>
          </div>

          <div className={styles.stepsGrid}>

            <div className={styles.step}>
              <div className={styles.stepNumber}>
                1
              </div>

              <h3>
                Escolha um curso
              </h3>

              <p>
                Navegue pelas categorias e selecione o conteúdo desejado.
              </p>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>
                2
              </div>

              <h3>
                Estude no seu ritmo
              </h3>

              <p>
                Assista às aulas, leia os materiais e acompanhe seu progresso.
              </p>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>
                3
              </div>

              <h3>
                Conclua e receba seu certificado
              </h3>

              <p>
                Após concluir todas as atividades, emita seu certificado.
              </p>
            </div>

          </div>
        </section>

        {/* FAQ */}
        <section className={styles.faqSection}>
          <div className={styles.sectionTitle}>
            <h2>
              Perguntas Frequentes
            </h2>
          </div>

          <div className={styles.faqCard}>
            <h3>
              Os cursos são gratuitos?
            </h3>

            <p>
              Sim. Todos os cursos disponibilizados pela plataforma
              Equitá são gratuitos.
            </p>
          </div>

          <div className={styles.faqCard}>
            <h3>
              Receberei certificado?
            </h3>

            <p>
              Sim. Após concluir todas as etapas do curso,
              será possível emitir um certificado.
            </p>
          </div>

          <div className={styles.faqCard}>
            <h3>
              Posso acessar pelo celular?
            </h3>

            <p>
              Sim. A plataforma é responsiva e pode ser utilizada
              em computadores, tablets e smartphones.
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

export default Cursos;
