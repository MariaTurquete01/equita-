import { useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import styles from "./denuncias.module.css";

function Denuncias() {
  const [anonima, setAnonima] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    alert("Denúncia enviada com sucesso!");
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
            Sua denúncia será encaminhada para análise. Você pode optar por
            realizá-la de forma identificada ou anônima.
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

            {/* Tipo */}

            <div className={styles.inputGroup}>

              <label htmlFor="tipo">
                Tipo da denúncia
              </label>

              <select id="tipo" required>

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
                Descrição
              </label>

              <textarea
                id="descricao"
                rows="7"
                placeholder="Descreva detalhadamente o ocorrido."
                required
              />

            </div>

            {/* Data e Local */}

            <div className={styles.row}>

              <div className={styles.inputGroup}>

                <label htmlFor="data">
                  Data
                </label>

                <input
                  id="data"
                  type="date"
                  required
                />

              </div>

              <div className={styles.inputGroup}>

                <label htmlFor="local">
                  Local
                </label>

                <input
                  id="local"
                  type="text"
                  placeholder="Cidade, bairro ou endereço"
                  required
                />

              </div>

            </div>

            {/* Arquivo */}

            <div className={styles.inputGroup}>

              <label htmlFor="arquivo">
                Anexar fotos ou documentos
              </label>

              <input
                id="arquivo"
                type="file"
              />

            </div>

            {/* Anônima */}

            <div className={styles.checkbox}>

              <input
                id="anonima"
                type="checkbox"
                checked={anonima}
                onChange={(event) => setAnonima(event.target.checked)}
              />

              <label htmlFor="anonima">
                Desejo realizar esta denúncia de forma anônima.
              </label>

            </div>

            {/* Botão */}

            <button
              type="submit"
              className={styles.submitButton}
            >
              Enviar denúncia
            </button>

          </form>

        </section>

        {/* RESULTADO */}

        <section className={styles.protocolSection}>

          <div className={styles.protocolCard}>

            <h2>
              Após o envio
            </h2>

            <p>
              Sua denúncia será registrada e receberá um número de protocolo.
            </p>

            <div className={styles.protocol}>
              EQ-2026-000001
            </div>

            <p>
              Utilize este protocolo para acompanhar o andamento da denúncia.
            </p>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default Denuncias;
