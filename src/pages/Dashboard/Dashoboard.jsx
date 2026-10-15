import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { carregarCursosPropostos, salvarCursosPropostos } from "../Voluntario/cursosPropostos";
import {
  atualizarInstituicao,
  carregarInstituicoes,
  criarInstituicao,
  excluirInstituicao,
} from "../../services/instituicoes";
import styles from "./dashboard.module.css";

const CHAVE_DENUNCIAS = "equita_denuncias";
const CHAVE_SOLICITACOES_VOLUNTARIO = "equita_solicitacoes_voluntario";
const STATUS_DENUNCIA = ["Recebida", "Em análise", "Encaminhada", "Finalizada"];
const ABAS = ["Voluntários", "Conteúdos", "Instituições", "Denúncias"];
const FORMULARIO_INSTITUICAO_VAZIO = {
  categoria: "",
  nome: "",
  descricao: "",
  endereco: "",
  cidade: "",
  estado: "",
  cep: "",
  telefone: "",
  email: "",
  horarioFuncionamento: "",
  latitude: "",
  longitude: "",
  ativa: true,
};

function obterLinkHttpSeguro(link) {
  if (typeof link !== "string" || !link.trim()) return null;

  try {
    const url = new URL(link);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

function carregarDenuncias() {
  try {
    const denuncias = JSON.parse(window.sessionStorage.getItem(CHAVE_DENUNCIAS) || "[]");
    return Array.isArray(denuncias) ? denuncias : [];
  } catch {
    return [];
  }
}

function carregarSolicitacoesVoluntario() {
  try {
    const solicitacoes = JSON.parse(
      window.sessionStorage.getItem(CHAVE_SOLICITACOES_VOLUNTARIO) || "[]"
    );
    return Array.isArray(solicitacoes) ? solicitacoes : [];
  } catch {
    return [];
  }
}

function Dashboard() {
  const [abaAtiva, setAbaAtiva] = useState("Voluntários");
  const [solicitacoesVoluntario, setSolicitacoesVoluntario] = useState(carregarSolicitacoesVoluntario);
  const [cursos, setCursos] = useState(carregarCursosPropostos);
  const [instituicoes, setInstituicoes] = useState(carregarInstituicoes);
  const [denuncias, setDenuncias] = useState(carregarDenuncias);
  const [instituicaoEmEdicao, setInstituicaoEmEdicao] = useState(null);
  const [formularioInstituicao, setFormularioInstituicao] = useState(FORMULARIO_INSTITUICAO_VAZIO);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  function atualizarStatusVoluntario(solicitacaoId, status) {
    try {
      const solicitacoesAtualizadas = carregarSolicitacoesVoluntario().map((solicitacao) => (
        solicitacao.id === solicitacaoId
          ? { ...solicitacao, status, revisadaEm: new Date().toISOString() }
          : solicitacao
      ));

      window.sessionStorage.setItem(
        CHAVE_SOLICITACOES_VOLUNTARIO,
        JSON.stringify(solicitacoesAtualizadas)
      );
      setSolicitacoesVoluntario(solicitacoesAtualizadas);
      setMensagem(`Solicitação marcada como ${status.toLocaleLowerCase("pt-BR")} neste navegador. Nenhuma conta foi alterada.`);
      setErro("");
    } catch {
      setErro("Não foi possível atualizar a solicitação nesta sessão.");
      setMensagem("");
    }
  }

  function atualizarStatus(curso, status) {
    try {
      const cursosAtualizados = cursos.map((item) => item.id === curso.id
        ? { ...item, status, revisadoEm: new Date().toISOString() }
        : item);
      salvarCursosPropostos(cursosAtualizados);
      setCursos(cursosAtualizados);
      setMensagem(`Proposta “${curso.titulo}” marcada como ${status.toLowerCase()}.`);
      setErro("");
    } catch {
      setErro("Não foi possível atualizar o status neste navegador.");
      setMensagem("");
    }
  }

  function atualizarStatusDenuncia(protocolo, status) {
    try {
      const denunciasAtuais = carregarDenuncias();
      const denunciasAtualizadas = denunciasAtuais.map((denuncia) => (
        denuncia.protocolo === protocolo
          ? { ...denuncia, status, atualizadaEm: new Date().toISOString() }
          : denuncia
      ));

      window.sessionStorage.setItem(CHAVE_DENUNCIAS, JSON.stringify(denunciasAtualizadas));
      setDenuncias(denunciasAtualizadas);
      setMensagem(`Status do protocolo ${protocolo} atualizado.`);
      setErro("");
    } catch {
      setErro("Não foi possível atualizar o status nesta sessão.");
      setMensagem("");
    }
  }

  function atualizarFormularioInstituicao(event) {
    const { name, value, type, checked } = event.target;
    setFormularioInstituicao((formularioAtual) => ({
      ...formularioAtual,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function salvarFormularioInstituicao(event) {
    event.preventDefault();

    const possuiLatitude = formularioInstituicao.latitude !== "";
    const possuiLongitude = formularioInstituicao.longitude !== "";
    if (possuiLatitude !== possuiLongitude) {
      setErro("Preencha latitude e longitude juntas ou deixe as duas vazias.");
      setMensagem("");
      return;
    }

    const dados = {
      ...formularioInstituicao,
      nome: formularioInstituicao.nome.trim(),
      endereco: formularioInstituicao.endereco.trim(),
      cidade: formularioInstituicao.cidade.trim(),
      estado: formularioInstituicao.estado.trim().toUpperCase(),
    };

    try {
      if (instituicaoEmEdicao) {
        atualizarInstituicao(instituicaoEmEdicao, dados);
        setMensagem("Instituição atualizada neste navegador.");
      } else {
        criarInstituicao(dados);
        setMensagem("Instituição cadastrada neste navegador.");
      }

      setInstituicoes(carregarInstituicoes());
      setInstituicaoEmEdicao(null);
      setFormularioInstituicao(FORMULARIO_INSTITUICAO_VAZIO);
      setErro("");
    } catch {
      setErro("Não foi possível salvar a instituição neste navegador.");
      setMensagem("");
    }
  }

  function editarInstituicao(instituicao) {
    setInstituicaoEmEdicao(instituicao.id);
    setFormularioInstituicao({
      ...FORMULARIO_INSTITUICAO_VAZIO,
      ...instituicao,
      latitude: instituicao.latitude ?? "",
      longitude: instituicao.longitude ?? "",
    });
    setMensagem("");
    setErro("");
  }

  function cancelarEdicaoInstituicao() {
    setInstituicaoEmEdicao(null);
    setFormularioInstituicao(FORMULARIO_INSTITUICAO_VAZIO);
    setErro("");
    setMensagem("");
  }

  function removerInstituicao(instituicao) {
    if (!window.confirm(`Excluir a instituição “${instituicao.nome}”?`)) return;

    try {
      excluirInstituicao(instituicao.id);
      setInstituicoes(carregarInstituicoes());
      if (instituicaoEmEdicao === instituicao.id) cancelarEdicaoInstituicao();
      setMensagem("Instituição excluída deste navegador.");
      setErro("");
    } catch {
      setErro("Não foi possível excluir a instituição neste navegador.");
      setMensagem("");
    }
  }

  return (
    <>
      <Navbar />
      <main className={styles["dashboard-page"]}>
        <header className={styles["admin-header"]}>
          <span className={styles["dashboard-badge"]}>Administração</span>
          <h1>Painel do Administrador</h1>
          <p>Acompanhe solicitações e propostas pendentes de análise.</p>
          <p className={styles["prototype-notice"]} role="note">
            Protótipo local: não há autenticação ou controle de acesso administrativo. Os dados ficam neste navegador.
          </p>
        </header>

        <section className={styles["admin-content"]}>
          <div className={styles["admin-tabs"]} role="tablist" aria-label="Seções administrativas">
            {ABAS.map((aba) => (
              <button
                type="button"
                role="tab"
                id={`admin-tab-${aba.toLowerCase()}`}
                aria-selected={abaAtiva === aba}
                aria-controls="admin-panel"
                className={abaAtiva === aba ? styles["admin-tab-active"] : ""}
                key={aba}
                onClick={() => {
                  setAbaAtiva(aba);
                  setMensagem("");
                  setErro("");
                }}
              >
                {aba}
              </button>
            ))}
          </div>

          <section
            className={styles["admin-panel"]}
            id="admin-panel"
            role="tabpanel"
            aria-labelledby={`admin-tab-${abaAtiva.toLowerCase()}`}
          >
            {mensagem && <p className={styles["admin-feedback"]} role="status">{mensagem}</p>}
            {erro && <p className={styles["admin-error"]} role="alert">{erro}</p>}

            {abaAtiva === "Voluntários" ? (
              <>
                <div className={styles["panel-heading"]}>
                  <div>
                    <h2>Solicitações de voluntariado</h2>
                    <p>Analise a apresentação, a proposta e os documentos informados.</p>
                  </div>
                  <span>{solicitacoesVoluntario.filter((item) => item.status === "Pendente").length} pendentes</span>
                </div>
                {solicitacoesVoluntario.length === 0 ? (
                  <div className={styles["admin-empty"]}>
                    <h3>Nenhuma solicitação de voluntariado</h3>
                    <p>As solicitações preenchidas no cadastro desta sessão aparecerão aqui.</p>
                  </div>
                ) : (
                  <div className={styles["request-list"]}>
                    {solicitacoesVoluntario.map((solicitacao) => (
                      <article className={styles["request-item"]} key={solicitacao.id}>
                        <div className={styles["request-details"]}>
                          <span className={styles["request-category"]}>Status: {solicitacao.status}</span>
                          <h3>{solicitacao.nome}</h3>
                          <p><strong>E-mail:</strong> {solicitacao.email}</p>
                          <p><strong>Apresentação:</strong> {solicitacao.apresentacao || "Não informada"}</p>
                          <p><strong>Proposta:</strong> {solicitacao.propostaConteudo || "Não informada"}</p>
                          <p><strong>Documentos selecionados:</strong></p>
                          {Array.isArray(solicitacao.documentos) && solicitacao.documentos.length > 0 ? (
                            <ul className={styles["volunteer-document-list"]}>
                              {solicitacao.documentos.map((documento, indice) => (
                                <li key={`${solicitacao.id}-documento-${indice}`}>{documento}</li>
                              ))}
                            </ul>
                          ) : (
                            <p>Nenhum documento informado.</p>
                          )}
                          <small>Solicitada em {new Date(solicitacao.criadaEm).toLocaleString("pt-BR")}</small>
                        </div>
                        {solicitacao.status === "Pendente" && (
                          <div className={styles["request-actions"]}>
                            <button
                              type="button"
                              className={styles["approve-button"]}
                              onClick={() => atualizarStatusVoluntario(solicitacao.id, "Aprovada")}
                            >
                              Aprovar
                            </button>
                            <button
                              type="button"
                              className={styles["reject-button"]}
                              onClick={() => atualizarStatusVoluntario(solicitacao.id, "Reprovada")}
                            >
                              Reprovar
                            </button>
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                )}
                <p className={styles["storage-note"]}>
                  Protótipo local: documentos são listados apenas por nome, sem envio ou armazenamento dos arquivos. A decisão não altera uma conta real.
                </p>
              </>
            ) : abaAtiva === "Conteúdos" ? (
              <>
                <div className={styles["panel-heading"]}>
                  <div>
                    <h2>Propostas de cursos</h2>
                    <p>As propostas aprovadas ficam disponíveis no catálogo público.</p>
                  </div>
                  <span>{cursos.length} propostas</span>
                </div>
                {cursos.length === 0 ? (
                  <div className={styles["admin-empty"]}>
                    <h3>Nenhuma proposta de conteúdo</h3>
                    <p>Propostas enviadas pelos voluntários aparecerão aqui para análise.</p>
                  </div>
                ) : (
                  <div className={styles["request-list"]}>
                    {cursos.map((curso) => (
                      <article className={styles["request-item"]} key={curso.id}>
                        <div className={styles["request-details"]}>
                          <span className={styles["request-category"]}>{curso.categoria}</span>
                          <h3>{curso.titulo}</h3>
                          <p>{curso.descricao}</p>
                          <small>{curso.duracao} · Status: {curso.status || "Em análise"}</small>
                          {Array.isArray(curso.aulas) && curso.aulas.length > 0 && (
                            <ol className={styles["lesson-review-list"]}>
                              {curso.aulas.map((aula, indice) => {
                                const linkMaterial = obterLinkHttpSeguro(aula.link);

                                return (
                                  <li key={aula.id || `${curso.id}-aula-${indice}`}>
                                    <strong>{aula.titulo || `Aula ${indice + 1}`}</strong>
                                    {aula.descricao && <p>{aula.descricao}</p>}
                                    {linkMaterial && (
                                      <a href={linkMaterial} target="_blank" rel="noopener noreferrer">
                                        Abrir material da aula
                                      </a>
                                    )}
                                  </li>
                                );
                              })}
                            </ol>
                          )}
                        </div>
                        <div className={styles["request-actions"]}>
                          <button
                            type="button"
                            className={styles["approve-button"]}
                            disabled={curso.status === "Aprovado"}
                            onClick={() => atualizarStatus(curso, "Aprovado")}
                          >
                            Aprovar
                          </button>
                          <button
                            type="button"
                            className={styles["reject-button"]}
                            disabled={curso.status === "Rejeitado"}
                            onClick={() => atualizarStatus(curso, "Rejeitado")}
                          >
                            Rejeitar
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </>
            ) : abaAtiva === "Instituições" ? (
              <>
                <div className={styles["panel-heading"]}>
                  <div>
                    <h2>Gerenciar instituições</h2>
                    <p>Cadastre e mantenha os serviços de apoio da plataforma.</p>
                  </div>
                  <span>{instituicoes.length} instituições</span>
                </div>

                <form className={styles["institution-form"]} onSubmit={salvarFormularioInstituicao}>
                  <h3>{instituicaoEmEdicao ? "Editar instituição" : "Nova instituição"}</h3>
                  <div className={styles["institution-form-grid"]}>
                    <label className={styles["institution-field"]} htmlFor="instituicao-categoria">
                      Categoria
                      <select id="instituicao-categoria" name="categoria" value={formularioInstituicao.categoria} onChange={atualizarFormularioInstituicao} required>
                        <option value="">Selecione uma categoria</option>
                        <option value="DELEGACIA">Delegacia</option>
                        <option value="ONG">ONG</option>
                        <option value="ABRIGO">Abrigo</option>
                        <option value="ASSISTENCIA_SOCIAL">Assistência social</option>
                        <option value="DEFENSORIA">Defensoria</option>
                        <option value="CENTRO_DE_APOIO">Centro de apoio</option>
                      </select>
                    </label>
                    <label className={styles["institution-field"]} htmlFor="instituicao-nome">
                      Nome
                      <input id="instituicao-nome" name="nome" value={formularioInstituicao.nome} onChange={atualizarFormularioInstituicao} maxLength="150" required />
                    </label>
                    <label className={`${styles["institution-field"]} ${styles["institution-field-wide"]}`} htmlFor="instituicao-descricao">
                      Descrição
                      <textarea id="instituicao-descricao" name="descricao" value={formularioInstituicao.descricao} onChange={atualizarFormularioInstituicao} maxLength="500" rows="3" />
                    </label>
                    <label className={`${styles["institution-field"]} ${styles["institution-field-wide"]}`} htmlFor="instituicao-endereco">
                      Endereço
                      <input id="instituicao-endereco" name="endereco" value={formularioInstituicao.endereco} onChange={atualizarFormularioInstituicao} maxLength="250" required />
                    </label>
                    <label className={styles["institution-field"]} htmlFor="instituicao-cidade">
                      Cidade
                      <input id="instituicao-cidade" name="cidade" value={formularioInstituicao.cidade} onChange={atualizarFormularioInstituicao} maxLength="100" required />
                    </label>
                    <label className={styles["institution-field"]} htmlFor="instituicao-estado">
                      Estado (UF)
                      <input id="instituicao-estado" name="estado" value={formularioInstituicao.estado} onChange={atualizarFormularioInstituicao} maxLength="2" minLength="2" pattern="[A-Za-z]{2}" required />
                    </label>
                    <label className={styles["institution-field"]} htmlFor="instituicao-cep">
                      CEP
                      <input id="instituicao-cep" name="cep" value={formularioInstituicao.cep} onChange={atualizarFormularioInstituicao} maxLength="10" />
                    </label>
                    <label className={styles["institution-field"]} htmlFor="instituicao-telefone">
                      Telefone
                      <input id="instituicao-telefone" name="telefone" type="tel" value={formularioInstituicao.telefone} onChange={atualizarFormularioInstituicao} maxLength="30" />
                    </label>
                    <label className={styles["institution-field"]} htmlFor="instituicao-email">
                      E-mail
                      <input id="instituicao-email" name="email" type="email" value={formularioInstituicao.email} onChange={atualizarFormularioInstituicao} maxLength="150" />
                    </label>
                    <label className={styles["institution-field"]} htmlFor="instituicao-horario">
                      Horário de funcionamento
                      <input id="instituicao-horario" name="horarioFuncionamento" value={formularioInstituicao.horarioFuncionamento} onChange={atualizarFormularioInstituicao} maxLength="200" />
                    </label>
                    <label className={styles["institution-field"]} htmlFor="instituicao-latitude">
                      Latitude
                      <input id="instituicao-latitude" name="latitude" type="number" min="-90" max="90" step="any" value={formularioInstituicao.latitude} onChange={atualizarFormularioInstituicao} />
                    </label>
                    <label className={styles["institution-field"]} htmlFor="instituicao-longitude">
                      Longitude
                      <input id="instituicao-longitude" name="longitude" type="number" min="-180" max="180" step="any" value={formularioInstituicao.longitude} onChange={atualizarFormularioInstituicao} />
                    </label>
                    <label className={styles["institution-active"]} htmlFor="instituicao-ativa">
                      <input id="instituicao-ativa" name="ativa" type="checkbox" checked={formularioInstituicao.ativa} onChange={atualizarFormularioInstituicao} />
                      Instituição ativa
                    </label>
                  </div>
                  <div className={styles["institution-form-actions"]}>
                    <button type="submit" className={styles["approve-button"]}>
                      {instituicaoEmEdicao ? "Salvar alterações" : "Cadastrar instituição"}
                    </button>
                    {instituicaoEmEdicao && (
                      <button type="button" className={styles["cancel-button"]} onClick={cancelarEdicaoInstituicao}>
                        Cancelar edição
                      </button>
                    )}
                  </div>
                </form>

                {instituicoes.length === 0 ? (
                  <div className={styles["admin-empty"]}>
                    <h3>Nenhuma instituição cadastrada</h3>
                    <p>As instituições adicionadas aparecerão nesta lista.</p>
                  </div>
                ) : (
                  <div className={styles["request-list"]}>
                    {instituicoes.map((instituicao) => (
                      <article className={styles["request-item"]} key={instituicao.id}>
                        <div className={styles["request-details"]}>
                          <span className={styles["request-category"]}>{instituicao.categoria.replaceAll("_", " ")}</span>
                          <h3>{instituicao.nome}</h3>
                          <p>{instituicao.endereco}, {instituicao.cidade} - {instituicao.estado}</p>
                          <small>{instituicao.ativa ? "Ativa" : "Inativa"}{instituicao.telefone ? ` · ${instituicao.telefone}` : ""}</small>
                        </div>
                        <div className={styles["request-actions"]}>
                          <button type="button" onClick={() => editarInstituicao(instituicao)}>Editar</button>
                          <button type="button" className={styles["reject-button"]} onClick={() => removerInstituicao(instituicao)}>Excluir</button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
                <p className={styles["storage-note"]}>Os dados ficam somente neste navegador e ainda não aparecem no localizador público.</p>
              </>
            ) : abaAtiva === "Denúncias" ? (
              <>
                <div className={styles["panel-heading"]}>
                  <div>
                    <h2>Andamento de denúncias</h2>
                    <p>Atualize o status exibido na consulta por protocolo desta sessão.</p>
                  </div>
                  <span>{denuncias.length} denúncias</span>
                </div>
                {denuncias.length === 0 ? (
                  <div className={styles["admin-empty"]}>
                    <h3>Nenhuma denúncia nesta sessão</h3>
                    <p>Registros feitos neste navegador aparecerão aqui enquanto a sessão estiver ativa.</p>
                  </div>
                ) : (
                  <div className={styles["request-list"]}>
                    {denuncias.map((denuncia) => (
                      <article className={styles["request-item"]} key={denuncia.protocolo}>
                        <div className={styles["request-details"]}>
                          <span className={styles["request-category"]}>Protocolo</span>
                          <h3>{denuncia.protocolo}</h3>
                          <small>Registrada em {new Date(denuncia.criadaEm).toLocaleString("pt-BR")}</small>
                        </div>
                        <label className={styles["report-status-field"]} htmlFor={`status-${denuncia.protocolo}`}>
                          Status
                          <select
                            id={`status-${denuncia.protocolo}`}
                            value={STATUS_DENUNCIA.includes(denuncia.status) ? denuncia.status : STATUS_DENUNCIA[0]}
                            onChange={(event) => atualizarStatusDenuncia(denuncia.protocolo, event.target.value)}
                          >
                            {STATUS_DENUNCIA.map((status) => <option key={status} value={status}>{status}</option>)}
                          </select>
                        </label>
                      </article>
                    ))}
                  </div>
                )}
                <p className={styles["storage-note"]}>Protótipo sem controle de acesso: não use denúncias ou dados reais. Os registros são apagados ao encerrar a sessão do navegador.</p>
              </>
            ) : (
              <div className={styles["admin-empty"]}>
                <h2>{abaAtiva}</h2>
                <p>Nenhuma solicitação cadastrada nesta seção.</p>
              </div>
            )}
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Dashboard;

 