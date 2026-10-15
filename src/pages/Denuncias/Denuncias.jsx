import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import styles from "./denuncias.module.css";

const CHAVE_DENUNCIAS = "equita_denuncias";

function Denuncias() {
  const [identificacao, setIdentificacao] = useState("");
  const [protocolo, setProtocolo] = useState("");
  const [arquivos, setArquivos] = useState([]);
  const [erro, setErro] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const dados = new FormData(event.currentTarget);
    const anexos = dados.getAll("arquivo")
      .filter((arquivo) => arquivo instanceof File && arquivo.size > 0)
      .map((arquivo) => arquivo.name);
    const denunciaAnonima = identificacao === "anonima";

    try {
      const denunciasSalvas = JSON.parse(
        window.sessionStorage.getItem(CHAVE_DENUNCIAS) || "[]"
      );
      const numeroProtocolo = `EQ-${new Date().getFullYear()}-${Math.random()
        .toString(36)
        .slice(2, 8)
        .toUpperCase()}`;
      const denuncia = {
        protocolo: numeroProtocolo,
        tipo: dados.get("tipo"),
        descricao: dados.get("descricao"),
        data: dados.get("data"),
        local: dados.get("local"),
        identificacao: denunciaAnonima ? "anonima" : "identificada",
        nome: denunciaAnonima ? "" : dados.get("nome") || "",
        contato: denunciaAnonima ? "" : dados.get("contato") || "",
        anexos,
        status: "Recebida",
        criadaEm: new Date().toISOString(),
      };

      window.sessionStorage.setItem(
        CHAVE_DENUNCIAS,
        JSON.stringify([...denunciasSalvas, denuncia])
      );
      setProtocolo(numeroProtocolo);
      setErro("");
      event.currentTarget.reset();
      setIdentificacao("");
      setArquivos([]);
    } catch {
      setErro("Não foi possível registrar a denúncia nesta sessão. Tente novamente.");
    }
  };

  return (
    <>
      <Navbar />

      <main className={styles.denunciaPage}>

        {/* HERO */}

        <section className={styles.denunciaHero}>

          <span className={styles.heroBadge}>
            Canal de Denúncias
          </span>

          <h1>
            Registre uma denúncia
          </h1>

          <p>
            Registre as informações do ocorrido e escolha se deseja se identificar
            ou permanecer anônimo.
          </p>

        </section>

        {/* FORMULÁRIO */}

        <section className={styles.formSection}>

          <form
            className={styles.denunciaForm}
            onSubmit={handleSubmit}
          >

            <h2>
              Informações da denúncia
            </h2>

            <p className={styles.formNotice}>
              Este protótipo salva o registro apenas nesta sessão do navegador. Ele
              não envia a denúncia a um serviço externo, e arquivos anexados não são enviados.
            </p>

            {/* Tipo */}

            <div className={styles.inputGroup}>

              <label htmlFor="tipo">
                Tipo da denúncia <span aria-hidden="true">*</span>
              </label>

              <select id="tipo" name="tipo" required>

                <option value="">
                  Selecione
                </option>

                <option value="violencia-mulher">
                  Violência contra a mulher
                </option>

                <option value="violencia-criancas">
                  Violência contra crianças
                </option>

                <option value="violencia-idosos">
                  Violência contra idosos
                </option>

                <option value="racismo">
                  Racismo
                </option>

                <option value="bullying">
                  Bullying
                </option>

                <option value="assedio">
                  Assédio
                </option>

                <option value="discriminacao">
                  Discriminação
                </option>

                <option value="outro">
                  Outro
                </option>

              </select>

            </div>

            {/* Descrição */}

            <div className={styles.inputGroup}>

              <label htmlFor="descricao">
                Descrição <span aria-hidden="true">*</span>
              </label>

              <textarea
                id="descricao"
                name="descricao"
                rows="7"
                placeholder="Descreva detalhadamente o ocorrido."
                required
              />

            </div>

            {/* Data e Local */}

            <div className={styles.row}>

              <div className={styles.inputGroup}>

                <label htmlFor="data">
                  Data <span aria-hidden="true">*</span>
                </label>

                <input
                  id="data"
                  type="date"
                  name="data"
                  required
                />

              </div>

              <div className={styles.inputGroup}>

                <label htmlFor="local">
                  Local <span aria-hidden="true">*</span>
                </label>

                <input
                  id="local"
                  type="text"
                  name="local"
                  placeholder="Cidade, bairro ou endereço"
                  required
                />

              </div>

            </div>

            {/* Arquivo */}

            <div className={styles.inputGroup}>

              <label htmlFor="arquivo">
                Anexar arquivos (opcional)
              </label>

              <input
                id="arquivo"
                name="arquivo"
                type="file"
                multiple
                onChange={(event) => setArquivos(Array.from(event.target.files || []))}
              />

              {arquivos.length > 0 && (
                <ul className={styles.attachmentList} aria-label="Arquivos selecionados" aria-live="polite">
                  {arquivos.map((arquivo) => <li key={`${arquivo.name}-${arquivo.lastModified}`}>{arquivo.name}</li>)}
                </ul>
              )}

            </div>

            <fieldset className={styles.identificationFieldset}>
              <legend>Como deseja se identificar? <span aria-hidden="true">*</span></legend>
              <div className={styles.identificationOptions}>
                <label className={styles.identificationOption} htmlFor="identificada">
                  <input
                    id="identificada"
                    type="radio"
                    name="identificacao"
                    value="identificada"
                    checked={identificacao === "identificada"}
                    onChange={(event) => setIdentificacao(event.target.value)}
                    required
                  />
                  <span>Identificada</span>
                </label>
                <label className={styles.identificationOption} htmlFor="anonima">
                  <input
                    id="anonima"
                    type="radio"
                    name="identificacao"
                    value="anonima"
                    checked={identificacao === "anonima"}
                    onChange={(event) => setIdentificacao(event.target.value)}
                    required
                  />
                  <span>Anônima</span>
                </label>
              </div>
            </fieldset>

            {identificacao === "identificada" && (
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label htmlFor="nome">Nome completo <span aria-hidden="true">*</span></label>
                  <input id="nome" name="nome" type="text" autoComplete="name" required />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="contato">E-mail ou telefone <span aria-hidden="true">*</span></label>
                  <input id="contato" name="contato" type="text" autoComplete="email" required />
                </div>
              </div>
            )}

            {erro && <p className={styles.errorMessage} role="alert">{erro}</p>}

            <button
              type="submit"
              className={styles.submitButton}
            >
              Enviar denúncia
            </button>

          </form>

        </section>

        <section className={styles.protocolSection} aria-live="polite">
          <div className={styles.protocolCard}>
            {protocolo ? (
              <>
                <h2>Denúncia registrada</h2>
                <p>Guarde este protocolo para consultar o andamento nesta sessão.</p>
                <div className={styles.protocol}>{protocolo}</div>
                <Link
                  className={styles.protocolLink}
                  to={`/protocolo?numero=${encodeURIComponent(protocolo)}`}
                >
                  Consultar protocolo
                </Link>
              </>
            ) : (
              <>
                <h2>Já tem um protocolo?</h2>
                <p>Acompanhe o andamento de uma denúncia registrada.</p>
                <Link className={styles.protocolLink} to="/protocolo">
                  Consultar protocolo
                </Link>
              </>
            )}
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

export default Denuncias;
