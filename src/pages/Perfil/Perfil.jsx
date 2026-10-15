import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
 
import styles from "./perfil.module.css";

const CHAVE_PERFIL = "equita_perfil_local";
const PERFIL_PADRAO = {
    nome: "Usuário Equitá",
    email: "usuario@email.com",
    tipo: "Usuário",
};

function carregarPerfil() {
    try {
        const perfilSalvo = JSON.parse(window.localStorage.getItem(CHAVE_PERFIL) || "null");
        return perfilSalvo ? { ...PERFIL_PADRAO, ...perfilSalvo } : PERFIL_PADRAO;
    } catch {
        return PERFIL_PADRAO;
    }
}
 
function Perfil() {
    const [perfil, setPerfil] = useState(carregarPerfil);
    const [formulario, setFormulario] = useState(carregarPerfil);
    const [editando, setEditando] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState("");

    function atualizarCampo(event) {
        const { name, value } = event.target;
        setFormulario((formularioAtual) => ({ ...formularioAtual, [name]: value }));
    }

    function iniciarEdicao() {
        setFormulario(perfil);
        setEditando(true);
        setMensagem("");
        setErro("");
    }

    function cancelarEdicao() {
        setFormulario(perfil);
        setEditando(false);
        setErro("");
    }

    function salvarPerfil(event) {
        event.preventDefault();
        const perfilAtualizado = {
            ...perfil,
            nome: formulario.nome.trim(),
            email: formulario.email.trim(),
        };

        try {
            window.localStorage.setItem(CHAVE_PERFIL, JSON.stringify(perfilAtualizado));
            setPerfil(perfilAtualizado);
            setFormulario(perfilAtualizado);
            setEditando(false);
            setMensagem("Perfil salvo neste navegador.");
            setErro("");
        } catch {
            setErro("Não foi possível salvar o perfil neste navegador.");
            setMensagem("");
        }
    }
 
    return (
        <>
            <Navbar />
 
            <main className={styles.perfilPage}>
 
                {/* CABEÇALHO */}
 
                <section className={styles.perfilHero}>
 
                    <span className={styles.heroBadge}>
                        Minha conta
                    </span>
 
                    <h1>
                        Meu Perfil
                    </h1>
 
                    <p>
                        Consulte e edite os dados demonstrativos deste navegador.
                    </p>
                    <p className={styles.profileNotice} role="note">
                        Este protótipo não usa autenticação; estas informações não representam uma conta real.
                    </p>
 
                </section>
 
                {/* PERFIL */}
 
                <section className={styles.perfilContent}>
 
                    <div className={styles.perfilCard}>
 
                        <div className={styles.perfilFoto}>
                            👤
                        </div>
 
                        <div className={styles.perfilInfo}>
 
                            <h2>
                                Meu perfil
                            </h2>
 
                            {editando ? (
                                <form onSubmit={salvarPerfil}>
                                    <div className={styles.infoItem}>
                                        <label htmlFor="perfil-nome">Nome</label>
                                        <input id="perfil-nome" className={styles.profileInput} name="nome" value={formulario.nome} onChange={atualizarCampo} maxLength="120" required />
                                    </div>
                                    <div className={styles.infoItem}>
                                        <label htmlFor="perfil-email">E-mail</label>
                                        <input id="perfil-email" className={styles.profileInput} name="email" type="email" value={formulario.email} onChange={atualizarCampo} maxLength="150" required />
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span>Tipo de conta</span>
                                        <strong>{perfil.tipo}</strong>
                                    </div>
                                    {erro && <p className={styles.errorMessage} role="alert">{erro}</p>}
                                    <div className={styles.profileActions}>
                                        <button className={styles.profileButton} type="submit">Salvar</button>
                                        <button className={styles.cancelButton} type="button" onClick={cancelarEdicao}>Cancelar</button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <div className={styles.infoItem}>
                                        <span>Nome</span>
                                        <strong>{perfil.nome}</strong>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span>E-mail</span>
                                        <strong>{perfil.email}</strong>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span>Tipo de conta</span>
                                        <strong>{perfil.tipo}</strong>
                                    </div>
                                    {mensagem && <p className={styles.feedbackMessage} role="status">{mensagem}</p>}
                                    <div className={styles.profileActions}>
                                        <button className={styles.profileButton} type="button" onClick={iniciarEdicao}>Editar perfil</button>
                                    </div>
                                </>
                            )}
 
                        </div>
 
                    </div>
 
                </section>
 
            </main>
 
            <Footer />
        </>
    );
}
 
export default Perfil;
 