import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
 
import "./style.css";
 
function Sobre() {
 
    return (
 
        <>
 
            <Navbar />
 
            <main className="about-page">
 
                {/* HERO */}
 
                <section className="about-hero">
 
                    <span className="hero-badge">
 
                        Sobre o Equitá
 
                    </span>
 
                    <h1>
 
                        Promovendo cidadania, segurança e acesso aos direitos.
 
                    </h1>
 
                    <p>
 
                        O Equitá é uma plataforma desenvolvida para facilitar o acesso à informação, incentivar a cidadania e aproximar pessoas dos serviços de proteção, educação e apoio social. Nossa missão é oferecer um ambiente seguro, acessível e acolhedor para todos.
 
                    </p>
 
                </section>
 
                {/* MISSÃO | VISÃO | VALORES */}
 
                <section className="mission-section">
 
                    <div className="mission-grid">
 
                        <div className="mission-card">
 
                            <h2>🎯 Missão</h2>
 
                            <p>
                                Promover o acesso aos direitos, incentivar a cidadania e conectar pessoas aos serviços de proteção e apoio por meio da tecnologia.
                            </p>
 
                        </div>
 
                        <div className="mission-card">
 
                            <h2>👁️ Visão</h2>
 
                            <p>
                                Ser uma plataforma de referência em cidadania digital, contribuindo para uma sociedade mais justa, segura e inclusiva.
                            </p>
 
                        </div>
 
                        <div className="mission-card">
 
                            <h2>💙 Valores</h2>
 
                            <ul>
 
                                <li>Respeito</li>
 
                                <li>Inclusão</li>
 
                                <li>Transparência</li>
 
                                <li>Ética</li>
 
                                <li>Segurança</li>
 
                            </ul>
 
                        </div>
 
                    </div>
 
                </section>
                 {/* SERVIÇOS */}
 
                <section className="services-section">
 
                    <h2>
 
                        O que o Equitá oferece?
 
                    </h2>
 
                    <p className="section-description">
 
                        A plataforma reúne diferentes serviços em um único ambiente, tornando o acesso à informação, à proteção e ao aprendizado mais simples e acessível.
 
                    </p>
 
                    <div className="services-grid">
 
                        <div className="service-card">
 
                            <span>🚨</span>
 
                            <h3>Canal de Denúncias</h3>
 
                            <p>
                                Permite registrar denúncias de forma segura, identificada ou anônima, com acompanhamento por protocolo.
                            </p>
 
                        </div>
 
                        <div className="service-card">
 
                            <span>📍</span>
 
                            <h3>Localizador de Recursos</h3>
 
                            <p>
                                Ajuda o usuário a encontrar instituições de apoio próximas, como CRAS, CREAS, hospitais, delegacias e ONGs.
                            </p>
 
                        </div>
 
                        <div className="service-card">
 
                            <span>📚</span>
 
                            <h3>Guia de Direitos</h3>
 
                            <p>
                                Disponibiliza informações sobre direitos, orientações e caminhos para buscar ajuda em diferentes situações.
                            </p>
 
                        </div>
 
                        <div className="service-card">
 
                            <span>🎓</span>
 
                            <h3>Plataforma de Cursos</h3>
 
                            <p>
                                Oferece cursos gratuitos para promover conhecimento, cidadania e desenvolvimento pessoal.
                            </p>
 
                        </div>
 
                    </div>
 
                </section>
 
                {/* ODS */}
 
                <section className="ods-section">
 
                    <div className="ods-card">
 
                        <h2>
 
                            🌍 Objetivo de Desenvolvimento Sustentável 16
 
                        </h2>
 
                        <p>
 
                            O Equitá está alinhado ao ODS 16 da Agenda 2030 da ONU, que busca promover sociedades pacíficas e inclusivas, garantir o acesso à justiça para todos e construir instituições eficazes, responsáveis e inclusivas.
 
                        </p>
 
                    </div>
 
                </section>
 
                {/* EQUIPE */}
 
                <section className="team-section">
 
                    <h2>
 
                        Equipe do Projeto
 
                    </h2>
 
                    <p className="section-description">
 
                        Este projeto foi desenvolvido pelos estudantes responsáveis pelo TCC, unindo tecnologia e cidadania para criar uma plataforma acessível e de impacto social.
 
                    </p>
 
                    <div className="team-card">
 
                        <p>
 <ul>
                       <li>João Marcos de Aguiar Gonçalves dos Santos</li> 
                        <li>  Maria Eduarda Carvalho da Silva </li>
                        <li>  Maria Eduarda Silva Fernandes </li>
                        <li> Maria Eduarda Tenorio Turquete </li> 
                     <li>Sophia Santos Gaspar </li>
 
</ul>                        
</p>
 
                    </div>
 
                </section>
 
                {/* CONTATO */}
 
                <section className="contact-section">
 
                    <h2>
 
                        Contato
 
                    </h2>
 
                    <div className="contact-grid">
 
                        <div className="contact-card">
 
                            <h3>📧 E-mail</h3>
 
                            <p>contato@equita.com</p>
 
                        </div>
 
                        <div className="contact-card">
 
                            <h3>📱 Telefone</h3>
 
                            <p>(00) 00000-0000</p>
 
                        </div>
 
                        <div className="contact-card">
 
                            <h3>📍 Localização</h3>
 
                            <p>Barueri - SP</p>
 
                        </div>
 
                    </div>
 
                </section>
 
            </main>
 
            <Footer />
 
        </>
 
    );
 
}
 
export default Sobre;
 