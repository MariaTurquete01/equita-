
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { useState } from "react";

import styles from "./protocolo.module.css";

function Protocolo() {
  const [protocolo, setProtocolo] = useState("");

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

          <div className={styles["consulta-card"]}>

            <h2>
              Consultar Protocolo
            </h2>

            <div className={styles["input-group"]}>

              <label>
                Número do protocolo
              </label>

              <input
                type="text"
                value={protocolo}
                onChange={(e) => setProtocolo(e.target.value)}
                placeholder="Ex.: EQ-2026-000001"
              />

            </div>

            <button className={styles["consultar-button"]}>
              Consultar
            </button>

          </div>

        </section>

        {/* RESULTADO */}

        <section className={styles["status-section"]}>

          <div className={styles["status-card"]}>

            <h2>
              Status da denúncia
            </h2>

            <div className={styles["status-timeline"]}>

              <div
                className={`${styles["status-item"]} ${styles.active}`}
              >

                <div className={styles["status-circle"]}></div>

                <div>

                  <h3>
                    Recebida
                  </h3>

                  <p>
                    A denúncia foi registrada no sistema.
                  </p>

                </div>

              </div>

              <div className={styles["status-item"]}>

                <div className={styles["status-circle"]}></div>

                <div>

                  <h3>
                    Em análise
                  </h3>

                  <p>
                    A denúncia está sendo analisada.
                  </p>

                </div>

              </div>

              <div className={styles["status-item"]}>

                <div className={styles["status-circle"]}></div>

                <div>

                  <h3>
                    Encaminhada
                  </h3>

                  <p>
                    Foi encaminhada ao órgão competente.
                  </p>

                </div>

              </div>

              <div className={styles["status-item"]}>

                <div className={styles["status-circle"]}></div>

                <div>

                  <h3>
                    Finalizada
                  </h3>

                  <p>
                    O atendimento foi concluído.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default Protocolo;

