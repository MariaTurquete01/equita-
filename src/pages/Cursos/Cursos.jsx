import { useState } from "react";
import { Link } from "react-router-dom";
 
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
 
import cursos from "./cursos";
 
import "./style.css";
 
function Cursos() {
 
  const [pesquisa, setPesquisa] = useState("");
 
  const categorias = [
    "Todos",
    "Direitos Humanos",
    "Direitos",
    "Violência",
    "Inclusão",
    "Diversidade",
    "Saúde"
  ];
 
  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState("Todos");
 
  const cursosFiltrados = cursos.filter((curso) => {
 
    const correspondePesquisa =
      curso.titulo
        .toLowerCase()
        .includes(pesquisa.toLowerCase()) ||
 
      curso.descricao
        .toLowerCase()
        .includes(pesquisa.toLowerCase()) ||
 
      curso.categoria
        .toLowerCase()
        .includes(pesquisa.toLowerCase());
 
    const correspondeCategoria =
      categoriaSelecionada === "Todos" ||
      curso.categoria === categoriaSelecionada;
 
    return correspondePesquisa && correspondeCategoria;
 
  });
 
  const cursosDestaque = cursos.slice(0, 3);
 
  return (
    <>
 
      <Navbar />
 
      <main className="courses-page">
 
      
 
        <section className="courses-hero">
 
          <span className="badge">
 
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
 
          <div className="search-box">
 
            <input
              type="text"
              placeholder="Pesquisar cursos..."
              value={pesquisa}
              onChange={(e) =>
                setPesquisa(e.target.value)
              }
            />
 
          </div>
 
        </section>
 
        
 
        <section className="categories-section">
 
          <h2>
 
            Categorias
 
          </h2>
 
          <div className="categories-grid">
 
            {categorias.map((categoria) => (
 
              <button
 
                key={categoria}
 
                className={
                  categoriaSelecionada === categoria
                    ? "category active"
                    : "category"
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
 
       
 
        <section className="featured-section">
 
          <div className="section-title">
 
            <h2>
 
              Cursos em Destaque
 
            </h2>
 
            <p>
 
              Conheça alguns dos cursos mais procurados da plataforma.
 
            </p>
 
          </div>
 
          <div className="featured-grid">
 
            {cursosDestaque.map((curso) => (
 
              <div
                className="featured-card"
                key={curso.id}
              >
 
                <img
                  src={curso.imagem}
                  alt={curso.titulo}
                />
 
                <div className="featured-content">
 
                  <span>
 
                    {curso.categoria}
 
                  </span>
 
                  <h3>
 
                    {curso.titulo}
 
                  </h3>
 
                  <p>
 
                    {curso.descricao}
 
                  </p>
 
                  <div className="course-info">
 
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
 
                    className="start-course"
 
                  >
 
                    Começar Curso
 
                  </Link>
 
                </div>
 
              </div>
 
            ))}
 
          </div>
 
        </section>

 
        <section className="all-courses-section">
 
          <div className="section-title">
 
            <h2>
 
              Todos os Cursos
 
            </h2>
 
            <p>
 
              Explore todos os cursos disponíveis na plataforma Equitá.
 
            </p>
 
          </div>
 
          {cursosFiltrados.length > 0 ? (
 
            <div className="courses-grid">
 
              {cursosFiltrados.map((curso) => (
 
                <div
                  className="course-card"
                  key={curso.id}
                >
 
                  <img
                    src={curso.imagem}
                    alt={curso.titulo}
                  />
 
                  <div className="course-content">
 
                    <span className="course-category">
 
                      {curso.categoria}
 
                    </span>
 
                    <h3>
 
                      {curso.titulo}
 
                    </h3>
 
                    <p>
 
                      {curso.descricao}
 
                    </p>
 
                    <div className="course-details">
 
                      <p>
 
                        👨‍🏫 <strong>Professor:</strong> {curso.professor}
 
                      </p>
 
                      <p>
 
                        ⏱ <strong>Carga Horária:</strong> {curso.cargaHoraria}
 
                      </p>
 
                      <p>
 
                        ⭐ <strong>Nível:</strong> {curso.nivel}
 
                      </p>
 
                      <p>
 
                        🎥 <strong>Aulas:</strong> {curso.aulas}
 
                      </p>
 
                    </div>
 
                    <Link
 
                      to={`/curso/${curso.id}`}
 
                      className="course-button"
 
                    >
 
                      Começar Curso
 
                    </Link>
 
                  </div>
 
                </div>
 
              ))}
 
            </div>
 
          ) : (
 
            <div className="empty-search">
 
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
 
        <section className="how-it-works">
 
          <div className="section-title">
 
            <h2>
 
              Como Funciona
 
            </h2>
 
            <p>
 
              Aprender na plataforma Equitá é simples.
 
            </p>
 
          </div>
 
          <div className="steps-grid">
 
            <div className="step">
 
              <div className="step-number">
 
                1
 
              </div>
 
              <h3>
 
                Escolha um curso
 
              </h3>
 
              <p>
 
                Navegue pelas categorias e selecione o conteúdo desejado.
 
              </p>
 
            </div>
 
            <div className="step">
 
              <div className="step-number">
 
                2
 
              </div>
 
              <h3>
 
                Estude no seu ritmo
 
              </h3>
 
              <p>
 
                Assista às aulas, leia os materiais e acompanhe seu progresso.
 
              </p>
 
            </div>
 
            <div className="step">
 
              <div className="step-number">
 
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
 
        <section className="faq-section">
 
          <div className="section-title">
 
            <h2>
 
              Perguntas Frequentes
 
            </h2>
 
          </div>
 
          <div className="faq-card">
 
            <h3>
 
              Os cursos são gratuitos?
 
            </h3>
 
            <p>
 
              Sim. Todos os cursos disponibilizados pela plataforma Equitá são gratuitos.
 
            </p>
 
          </div>
 
          <div className="faq-card">
 
            <h3>
 
              Receberei certificado?
 
            </h3>
 
            <p>
 
              Sim. Após concluir todas as etapas do curso, será possível emitir um certificado.
 
            </p>
 
          </div>
 
          <div className="faq-card">
 
            <h3>
 
              Posso acessar pelo celular?
 
            </h3>
 
            <p>
 
              Sim. A plataforma é responsiva e pode ser utilizada em computadores, tablets e smartphones.
 
            </p>
 
          </div>
 
        </section>
 
      </main>
 
      <Footer />
 
    </>
 
  );
 
}
 
export default Cursos;

 