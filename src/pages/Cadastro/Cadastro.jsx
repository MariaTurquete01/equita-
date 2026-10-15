import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { Link } from "react-router-dom";
import { useState } from "react";

import styles from "./cadastro.module.css";

const CHAVE_SOLICITACOES_VOLUNTARIO = "equita_solicitacoes_voluntario";

function Cadastro() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [perfil, setPerfil] = useState("");
  const [documentos, setDocumentos] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const dados = new FormData(event.currentTarget);

    if (dados.get("senha") !== dados.get("confirmacao")) {
      setErro("As senhas informadas não coincidem.");
      setMensagem("");
      return;
    }

    if (dados.get("perfil") === "voluntario") {
      const nome = String(dados.get("nome") || "").trim();
      const email = String(dados.get("email") || "").trim();
      const nomesDocumentos = dados.getAll("documentos")
        .filter((documento) => documento instanceof File && documento.size > 0)
        .map((documento) => documento.name);

      try {
        const solicitacoes = JSON.parse(
          window.sessionStorage.getItem(CHAVE_SOLICITACOES_VOLUNTARIO) || "[]"
        );
        const solicitacaoPendente = solicitacoes.find((solicitacao) => (
          String(solicitacao.email || "").toLocaleLowerCase("pt-BR") === email.toLocaleLowerCase("pt-BR")
          && solicitacao.status === "Pendente"
        ));

        if (solicitacaoPendente) {
          setErro("Já existe uma solicitação pendente para este e-mail nesta sessão.");
          setMensagem("");
          return;
        }

        const novaSolicitacao = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          nome,
          email,
          apresentacao: String(dados.get("apresentacao") || "").trim(),
          propostaConteudo: String(dados.get("propostaConteudo") || "").trim(),
          documentos: nomesDocumentos,
          status: "Pendente",
          criadaEm: new Date().toISOString(),
        };

        window.sessionStorage.setItem(
          CHAVE_SOLICITACOES_VOLUNTARIO,
          JSON.stringify([...solicitacoes, novaSolicitacao])
        );
        event.currentTarget.reset();
        setPerfil("");
        setDocumentos([]);
        setErro("");
        setMensagem("Solicitação de demonstração registrada nesta sessão. Nenhuma conta foi criada e os arquivos não foram enviados.");
      } catch {
        setErro("Não foi possível salvar a solicitação nesta sessão.");
        setMensagem("");
      }
      return;
    }

    setErro("");
    setMensagem("O cadastro ainda não está conectado a um serviço. Nenhum dado foi salvo ou enviado.");
  }

  return (
    <>
      <Navbar />

      <main className={styles.registerPage}>
        <section className={styles.registerFormSection}>
          <div className={styles.registerCard}>
            <span className={styles.registerBadge}>Plataforma Equitá</span>
            <h1>Criar conta</h1>
            <p>Preencha os dados abaixo para criar sua conta.</p>
            <p className={styles.serviceNotice} role="note">
              {perfil === "voluntario"
                ? "Protótipo: os dados textuais e nomes dos documentos ficam nesta sessão. Senhas e arquivos não são salvos nem enviados; não use dados reais."
                : "O cadastro de usuário ainda não está conectado a um serviço. Nenhum dado será salvo."}
            </p>

            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="cadastro-nome">Nome completo</label>
                <input id="cadastro-nome" name="nome" type="text" autoComplete="name" placeholder="Digite seu nome completo" required />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="cadastro-cpf">CPF (opcional)</label>
                <input id="cadastro-cpf" name="cpf" type="text" autoComplete="off" placeholder="000.000.000-00" />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="cadastro-email">E-mail</label>
                <input id="cadastro-email" name="email" type="email" autoComplete="email" placeholder="Digite seu e-mail" required />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="cadastro-telefone">Telefone</label>
                <input id="cadastro-telefone" name="telefone" type="tel" autoComplete="tel" placeholder="(11) 99999-9999" />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="cadastro-perfil">Perfil</label>
                <select id="cadastro-perfil" name="perfil" value={perfil} onChange={(event) => setPerfil(event.target.value)} required>
                  <option value="">Selecione um perfil</option>
                  <option value="usuario">Usuário</option>
                  <option value="voluntario">Voluntário</option>
                </select>
              </div>

              {perfil === "voluntario" && (
                <>
                  <p className={styles.volunteerNotice}>
                    O acesso às ferramentas de voluntário depende da análise e aprovação da solicitação.
                  </p>
                  <div className={styles.inputGroup}>
                    <label htmlFor="cadastro-apresentacao">Apresentação e experiência</label>
                    <textarea
                      id="cadastro-apresentacao"
                      name="apresentacao"
                      rows="4"
                      maxLength="1200"
                      placeholder="Conte sobre sua experiência e área de atuação."
                      required
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="cadastro-proposta">Proposta de conteúdo</label>
                    <textarea
                      id="cadastro-proposta"
                      name="propostaConteudo"
                      rows="4"
                      maxLength="1600"
                      placeholder="Descreva o conteúdo educativo que pretende oferecer."
                      required
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="cadastro-documentos">Documentos para análise</label>
                    <input
                      id="cadastro-documentos"
                      name="documentos"
                      type="file"
                      multiple
                      required
                      onChange={(event) => setDocumentos(Array.from(event.target.files || []))}
                    />
                    {documentos.length > 0 && (
                      <ul className={styles.documentList} aria-label="Documentos selecionados" aria-live="polite">
                        {documentos.map((documento) => <li key={`${documento.name}-${documento.lastModified}`}>{documento.name}</li>)}
                      </ul>
                    )}
                  </div>
                </>
              )}

              <div className={styles.inputGroup}>
                <label htmlFor="cadastro-senha">Senha</label>
                <div className={styles.passwordInput}>
                  <input id="cadastro-senha" name="senha" type={mostrarSenha ? "text" : "password"} autoComplete="new-password" placeholder="Digite sua senha" required />
                  <button type="button" onClick={() => setMostrarSenha(!mostrarSenha)} aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}>
                    {mostrarSenha ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="cadastro-confirmacao">Confirmar senha</label>
                <div className={styles.passwordInput}>
                  <input id="cadastro-confirmacao" name="confirmacao" type={mostrarConfirmacao ? "text" : "password"} autoComplete="new-password" placeholder="Confirme sua senha" required />
                  <button type="button" onClick={() => setMostrarConfirmacao(!mostrarConfirmacao)} aria-label={mostrarConfirmacao ? "Ocultar confirmação de senha" : "Mostrar confirmação de senha"}>
                    {mostrarConfirmacao ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              </div>

              {erro && <p className={styles.errorMessage} role="alert">{erro}</p>}
              {mensagem && <p className={styles.feedbackMessage} role="status">{mensagem}</p>}
              <button type="submit" className={styles.registerButton}>
                {perfil === "voluntario" ? "Enviar solicitação" : "Criar conta"}
              </button>

              <div className={styles.divider}>
                <span>Já possui uma conta?</span>
              </div>

              <Link to="/login" className={styles.loginLink}>Entrar</Link>
            </form>
          </div>
        </section>
      </main>

      <Footer />

    </>
  );
}

export default Cadastro;

 