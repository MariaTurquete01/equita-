import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
 
import "./style.css";
 
function Configuracoes() {
 
    return (
 
        <>
 
            <Navbar />
 
            <main className="settings-page">
 
                {/* HERO */}
 
                <section className="settings-hero">
 
                    <span className="hero-badge">
 
                        Configurações
 
                    </span>
 
                    <h1>
 
                        Gerencie sua conta
 
                    </h1>
 
                    <p>
 
                        Personalize suas informações, gerencie sua segurança e controle as configurações da sua conta no Equitá.
 
                    </p>
 
                </section>
 
                {/* DADOS */}
 
                <section className="settings-section">
 
                    <div className="settings-card">
 
                        <h2>
 
                            👤 Informações pessoais
 
                        </h2>
 
                        <div className="form-grid">
 
                            <div className="input-group">
 
                                <label>Nome</label>
 
                                <input
                                    type="text"
                                    placeholder="Nome completo"
                                />
 
                            </div>
 
                            <div className="input-group">
 
                                <label>E-mail</label>
 
                                <input
                                    type="email"
                                    placeholder="email@email.com"
                                />
 
                            </div>
 
                            <div className="input-group">
 
                                <label>Telefone</label>
 
                                <input
                                    type="text"
                                    placeholder="(00) 00000-0000"
                                />
 
                            </div>
 
                            <div className="input-group">
 
                                <label>Foto de perfil</label>
 
                                <input
                                    type="file"
                                />
 
                            </div>
 
                        </div>
 
                        <button className="save-button">
 
                            Salvar Alterações
 
                        </button>
 
                    </div>
 
                </section>
                 {/* SEGURANÇA */}
 
                <section className="settings-section">
 
                    <div className="settings-card">
 
                        <h2>
 
                            🔒 Segurança
 
                        </h2>
 
                        <div className="form-grid">
 
                            <div className="input-group">
 
                                <label>Senha atual</label>
 
                                <input
                                    type="password"
                                    placeholder="********"
                                />
 
                            </div>
 
                            <div className="input-group">
 
                                <label>Nova senha</label>
 
                                <input
                                    type="password"
                                    placeholder="********"
                                />
 
                            </div>
 
                            <div className="input-group">
 
                                <label>Confirmar nova senha</label>
 
                                <input
                                    type="password"
                                    placeholder="********"
                                />
 
                            </div>
 
                        </div>
 
                        <button className="save-button">
 
                            Alterar Senha
 
                        </button>
 
                    </div>
 
                </section>
 
                {/* NOTIFICAÇÕES */}
 
                <section className="settings-section">
 
                    <div className="settings-card">
 
                        <h2>
 
                            🔔 Notificações
 
                        </h2>
 
                        <div className="switch-group">
 
                            <label>
 
                                <input type="checkbox" defaultChecked />
 
                                Receber notificações sobre denúncias.
 
                            </label>
 
                            <label>
 
                                <input type="checkbox" defaultChecked />
 
                                Receber novidades sobre cursos.
 
                            </label>
 
                            <label>
 
                                <input type="checkbox" defaultChecked />
 
                                Receber avisos importantes da plataforma.
 
                            </label>
 
                        </div>
 
                    </div>
 
                </section>
 
                {/* PRIVACIDADE */}
 
                <section className="settings-section">
 
                    <div className="settings-card danger-card">
 
                        <h2>
 
                            🛡️ Privacidade
 
                        </h2>
 
                        <p>
 
                            Caso deseje encerrar sua conta permanentemente, essa ação removerá seus dados conforme a política da plataforma.
 
                        </p>
 
                        <button className="delete-button">
 
                            Excluir Conta
 
                        </button>
 
                    </div>
 
                </section>
 
            </main>
 
            <Footer />
 
        </>
 
    );
 
}
 
export default Configuracoes;
 