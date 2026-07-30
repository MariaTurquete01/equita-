import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
 
import { useState } from "react";
 
import "./style.css";
 
function Denuncias() {
 
  const [anonima, setAnonima] = useState(false);
 
  return (
    <>
      <Navbar />
 
      <main className="denuncia-page">
 
        {/* HERO */}
 
        <section className="denuncia-hero">
 
          <span className="hero-badge">
            Canal de Denúncias
          </span>
 
          <h1>
            Registre uma denúncia
          </h1>
 
          <p>
            Sua denúncia será encaminhada para análise. Você pode optar por realizá-la de forma identificada ou anônima.
          </p>
 
        </section>
 
        {/* FORMULÁRIO */}
 
        <section className="form-section">
 
          <form className="denuncia-form">
 
            <h2>Informações da denúncia</h2>
 
            {/* Tipo */}
 
            <div className="input-group">
 
              <label>Tipo da denúncia</label>
 
              <select>
 
                <option>Selecione</option>
 
                <option>Violência contra a mulher</option>
 
                <option>Violência contra crianças</option>
 
                <option>Violência contra idosos</option>
 
                <option>Racismo</option>
 
                <option>Bullying</option>
 
                <option>Assédio</option>
 
                <option>Discriminação</option>
 
                <option>Outro</option>
 
              </select>
 
            </div>
 
            {/* Descrição */}
 
            <div className="input-group">
 
              <label>Descrição</label>
 
              <textarea
 
                rows="7"
 
                placeholder="Descreva detalhadamente o ocorrido."
 
              ></textarea>
 
            </div>
 
            {/* Linha */}
 
            <div className="row">
 
              <div className="input-group">
 
                <label>Data</label>
 
                <input type="date"/>
 
              </div>
 
              <div className="input-group">
 
                <label>Local</label>
 
                <input
                  type="text"
                  placeholder="Cidade, bairro ou endereço"
                />
 
              </div>
 
            </div>
 
            {/* Arquivo */}
 
            <div className="input-group">
 
              <label>
 
                Anexar fotos ou documentos
 
              </label>
 
              <input type="file"/>
 
            </div>
 
            {/* Anônima */}
 
            <div className="checkbox">
 
              <input
 
                type="checkbox"
 
                checked={anonima}
 
                onChange={() => setAnonima(!anonima)}
 
              />
 
              <label>
 
                Desejo realizar esta denúncia de forma anônima.
 
              </label>
 
            </div>
 
            {/* Botão */}
 
            <button
              type="submit"
              className="submit-button"
            >
 
              Enviar denúncia
 
            </button>
 
          </form>
 
        </section>
 
        {/* RESULTADO */}
 
        <section className="protocol-section">
 
          <div className="protocol-card">
 
            <h2>
 
              Após o envio
 
            </h2>
 
            <p>
 
              Sua denúncia será registrada e receberá um número de protocolo.
 
            </p>
 
            <div className="protocol">
 
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
 