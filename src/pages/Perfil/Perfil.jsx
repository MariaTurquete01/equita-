import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
 
import "./style.css";
 
function Perfil() {
 
    return (
 
        <>
 
            <Navbar />
 
            <main className="profile-page">
 
                {/* HERO */}
 
                <section className="profile-hero">
 
                    <div className="profile-avatar">
 
                        <div className="avatar-circle">
 
                            👤
 
                        </div>
 
                    </div>
 
                    <div className="profile-header-info">
 
                        <span className="profile-badge">
 
                            Minha Conta
 
                        </span>
 
                        <h1>
 
                            Nome do Usuário
 
                        </h1>
 
                        <p>
 
                            Gerencie suas informações pessoais, acompanhe seus cursos, denúncias e certificados.
 
                        </p>
 
                        <div className="profile-buttons">
 
                            <button>
 
                                ✏️ Editar Perfil
 
                            </button>
 
                            <button>
 
                                🔒 Alterar Senha
 
                            </button>
 
                        </div>
 
                    </div>
 
                </section>
 
                {/* RESUMO */}
 
                <section className="summary-section">
 
                    <div className="summary-grid">
 
                        <div className="summary-card">
 
                            <span>🚨</span>
 
                            <h2>0</h2>
 
                            <p>Denúncias</p>
 
                        </div>
 
                        <div className="summary-card">
 
                            <span>📄</span>
 
                            <h2>0</h2>
 
                            <p>Protocolos</p>
 
                        </div>
 
                        <div className="summary-card">
 
                            <span>🎓</span>
 
                            <h2>0</h2>
 
                            <p>Cursos</p>
 
                        </div>
 
                        <div className="summary-card">
 
                            <span>🏆</span>
 
                            <h2>0</h2>
 
                            <p>Certificados</p>
 
                        </div>
 
                    </div>
 
                </section>
                 {/* INFORMAÇÕES */}
 
                <section className="profile-content">
 
                    <div className="profile-left">
 
                        <div className="content-card">
 
                            <h2>
 
                                Informações pessoais
 
                            </h2>
 
                            <div className="info-grid">
 
                                <div className="info-item">
 
                                    <span>👤 Nome</span>
 
                                    <p>Nome completo</p>
 
                                </div>
 
                                <div className="info-item">
 
                                    <span>📧 E-mail</span>
 
                                    <p>email@email.com</p>
 
                                </div>
 
                                <div className="info-item">
 
                                    <span>📱 Telefone</span>
 
                                    <p>(00) 00000-0000</p>
 
                                </div>
 
                                <div className="info-item">
 
                                    <span>🪪 Tipo da conta</span>
 
                                    <p>Usuário</p>
 
                                </div>
 
                                <div className="info-item">
 
                                    <span>📅 Cadastro</span>
 
                                    <p>Julho de 2026</p>
 
                                </div>
 
                            </div>
 
                        </div>
 
                        <div className="content-card">
 
                            <h2>
 
                                Atividade recente
 
                            </h2>
 
                            <div className="activity-list">
 
                                <div className="activity-item">
 
                                    <span>🎓</span>
 
                                    <div>
 
                                        <h3>Curso iniciado</h3>
 
                                        <p>Nenhuma atividade registrada.</p>
 
                                    </div>
 
                                </div>
 
                                <div className="activity-item">
 
                                    <span>🚨</span>
 
                                    <div>
 
                                        <h3>Denúncias</h3>
 
                                        <p>Nenhuma denúncia registrada.</p>
 
                                    </div>
 
                                </div>
 
                                <div className="activity-item">
 
                                    <span>🏆</span>
 
                                    <div>
 
                                        <h3>Certificados</h3>
 
                                        <p>Nenhum certificado emitido.</p>
 
                                    </div>
 
                                </div>
 
                            </div>
 
                        </div>
 
                    </div>
 
                    <aside className="profile-right">
 
                        <div className="content-card">
 
                            <h2>
 
                                Acesso rápido
 
                            </h2>
 
                            <div className="quick-links">
 
                                <Link
                                    to="/configuracoes"
                                    className="quick-link"
                                >
 
                                    ⚙️ Configurações
 
                                </Link>
 
                                <Link
                                    to="/protocolo"
                                    className="quick-link"
                                >
 
                                    📄 Consultar protocolo
 
                                </Link>
 
                                <Link
                                    to="/cursos"
                                    className="quick-link"
                                >
 
                                    🎓 Meus cursos
 
                                </Link>
 
                                <Link
                                    to="/recursos"
                                    className="quick-link"
                                >
 
                                    📍 Recursos próximos
 
                                </Link>
 
                                <Link
                                    to="/login"
                                    className="quick-link logout"
                                >
 
                                    🚪 Sair
 
                                </Link>
 
                            </div>
 
                        </div>
 
                    </aside>
 
                </section>
 
            </main>
 
            <Footer />
 
        </>
 
    );
 
}
 
export default Perfil;
 