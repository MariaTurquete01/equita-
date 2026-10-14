
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import styles from "./protocolo.module.css";

const CHAVE_DENUNCIAS = "equita_denuncias";
const ETAPAS = ["Recebida", "Em análise", "Encaminhada", "Finalizada"];

function localizarDenuncia(numero) {
  try {
    const denuncias = JSON.parse(window.sessionStorage.getItem(CHAVE_DENUNCIAS) || "[]");
    return Array.isArray(denuncias)
      ? denuncias.find((denuncia) => denuncia.protocolo === numero) || null
      : null;
  } catch {
    return null;
  }
}

function Protocolo() {
  const [searchParams] = useSearchParams();
  const protocoloInicial = searchParams.get("numero") || "";
  const denunciaInicial = protocoloInicial ? localizarDenuncia(protocoloInicial) : null;
  const [protocolo, setProtocolo] = useState(protocoloInicial);
  const [denuncia, setDenuncia] = useState(denunciaInicial);
  const [erro, setErro] = useState(
    protocoloInicial && !denunciaInicial
      ? "Protocolo não encontrado nesta sessão. Confira o número informado."
      : ""
  );

  function handleSubmit(event) {
    event.preventDefault();
    const encontrada = localizarDenuncia(protocolo.trim());
    setDenuncia(encontrada);
    setErro(encontrada ? "" : "Protocolo não encontrado nesta sessão. Confira o número informado.");
  }

  return (
    <>
      <Navbar />

      <main className={styles["protocol-page"]}>

        {/* HERO */}

        <section className={styles["protocol-hero"]}>

          <span className={styles["hero-badge"]}>
            Consulta de Protocolo
          </span>

          <h1>
            Acompanhe sua denúncia
          </h1>

          <p>
            Digite o número do protocolo para acompanhar o andamento da sua denúncia.
          </p>

        </section>

        {/* CONSULTA */}

        <section className={styles["consulta-section"]}>

          <form className={styles["consulta-card"]} onSubmit={handleSubmit}>
            <h2>Consultar Protocolo</h2>
            <div className={styles["input-group"]}>
              <label htmlFor="numero-protocolo">Número do protocolo</label>
              <input
                id="numero-protocolo"
                type="text"
                value={protocolo}
                onChange={(event) => setProtocolo(event.target.value)}
                placeholder="Ex.: EQ-2026-ABC123"
                required
              />
          </div>
            {erro && <p className={styles["error-message"]} role="alert">{erro}</p>}
            <button type="submit" className={styles["consultar-button"]}>Consultar</button>
          </form>

        </section>

        {/* RESULTADO */}

        {denuncia && (
        <section className={styles["status-section"]} aria-live="polite">
          <div className={styles["status-card"]}>
            <h2>Status da denúncia</h2>
            <p className={styles["current-status"]}>
              Protocolo {denuncia.protocolo}: <strong>{denuncia.status}</strong>
            </p>
            <div className={styles["status-timeline"]}>
              {ETAPAS.map((etapa, indice) => (
                <div
                  className={`${styles["status-item"]} ${indice <= ETAPAS.indexOf(denuncia.status) ? styles.active : ""}`}
                  key={etapa}
                >
                  <div className={styles["status-circle"]} />
                  <div>
                    <h3>{etapa}</h3>
                    <p>{indice === 0 ? "A denúncia foi registrada no sistema." : etapa === denuncia.status ? "Esta é a etapa atual da sua denúncia." : "Etapa ainda não iniciada."}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        )}

      </main>

      <Footer />
    </>
  );
}

export default Protocolo;

