import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
 
import { Link } from "react-router-dom";
 
import "./style.css";
 
function Dashboard() {
 
  return (
    <>
 
      <Navbar />
 
      <main className="dashboard-page">
 
        {/* HERO */}
 
        <section className="dashboard-hero">
 
          <div>
 
            <span className="dashboard-badge">
 
              Painel Principal
 
            </span>
 
            <h1>
 
              Bem-vindo(a) ao Equitá
 
            </h1>
 
            <p>
 
              Acesse rapidamente os principais serviços da plataforma e acompanhe suas atividades.
 
            </p>
 
          </div>
 
          <div className="dashboard-search">
 
            <input
              type="text"
              placeholder="Pesquisar serviços..."
            />
          </div>
 
        </section>
 
        {/* SERVIÇOS */}
 
        <section className="services-section">
 
          <h2>
 
            Serviços
 
          </h2>
 
          <div className="services-grid">
 
            <Link
              to="/denuncias"
              className="service-card"
            >
 
              <div className="service-icon">
 
                📢
 
              </div>
 
              <h3>
 
                Fazer Denúncia
 
              </h3>
 
              <p>
 
                Registre uma denúncia de forma segura e acompanhe seu protocolo.
 
              </p>
 
            </Link>
 
            <Link
              to="/recursos"
              className="service-card"
            >
 
              <div className="service-icon">
 
                📍
 
              </div>
 
              <h3>
 
                Localizador de Recursos
 
              </h3>
 
              <p>
 
                Encontre delegacias, hospitais, ONGs, CRAS, CREAS e outros serviços.
 
              </p>
 
            </Link>
 
            <Link
              to="/direitos"
              className="service-card"
            >
 
              <div className="service-icon">
 
                📚
 
              </div>
 
              <h3>
 
                Guia de Direitos
 
              </h3>
 
              <p>
 
                Consulte informações sobre direitos e proteção em diversas áreas.
 
              </p>
 
            </Link>
 
            <Link
              to="/cursos"
              className="service-card"
            >
 
              <div className="service-icon">
 
                🎓
 
              </div>
 
              <h3>
 
                Cursos
 
              </h3>
 
              <p>
 
                Continue seus estudos e acompanhe seu progresso.
 
              </p>
 
            </Link>
 
          </div>
 
        </section>
 
        {/* ATIVIDADES */}
 
        <section className="activity-section">
 
          <h2>
 
            Minhas Atividades
 
          </h2>
 
          <div className="activity-grid">
 
            <div className="activity-card">
 
              <h3>
 
                📄 Protocolos
 
              </h3>
 
              <span>
 
                0
 
              </span>
 
              <p>
 
                Protocolos cadastrados.
 
              </p>
 
            </div>
 
            <div className="activity-card">
 
              <h3>
 
                🚨 Denúncias
 
              </h3>
 
              <span>
 
                0
 
              </span>
 
              <p>
 
                Denúncias registradas.
 
              </p>
 
            </div>
 
            <div className="activity-card">
 
              <h3>
 
                🎓 Cursos
 
              </h3>
 
              <span>
 
                0
 
              </span>
 
              <p>
 
                Cursos concluídos.
 
              </p>
 
            </div>
 
          </div>
 
        </section>
 
        {/* ACESSO RÁPIDO */}
 
        <section className="quick-section">
 
          <h2>
 
            Acesso Rápido
 
          </h2>
 
          <div className="quick-grid">
 
            <Link
              to="/perfil"
              className="quick-card"
            >
 
              👤 Meu Perfil
 
            </Link>
 
            <Link
              to="/configuracoes"
              className="quick-card"
            >
 
              ⚙ Configurações
 
            </Link>
 
            <Link
              to="/protocolo"
              className="quick-card"
            >
 
              📄 Consultar Protocolo
 
            </Link>
 
            <Link
              to="/login"
              className="quick-card"
            >
 
              🚪 Sair
 
            </Link>
 
          </div>
 
        </section>
 
      </main>
 
      <Footer />
 
    </>
  );
 
}
 
export default Dashboard;
 