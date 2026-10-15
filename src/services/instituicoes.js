const CHAVE_INSTITUICOES = "equita_instituicoes";

function lerInstituicoes() {
  try {
    const instituicoes = JSON.parse(window.localStorage.getItem(CHAVE_INSTITUICOES) || "[]");
    return Array.isArray(instituicoes) ? instituicoes : [];
  } catch {
    return [];
  }
}

function gravarInstituicoes(instituicoes) {
  window.localStorage.setItem(CHAVE_INSTITUICOES, JSON.stringify(instituicoes));
}

function criarId() {
  return globalThis.crypto?.randomUUID?.()
    || `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function carregarInstituicoes() {
  return lerInstituicoes();
}

export function criarInstituicao(dados) {
  const instituicao = {
    ...dados,
    latitude: dados.latitude === "" ? null : Number(dados.latitude),
    longitude: dados.longitude === "" ? null : Number(dados.longitude),
    id: criarId(),
    criadaEm: new Date().toISOString(),
  };

  gravarInstituicoes([...lerInstituicoes(), instituicao]);
  return instituicao;
}

export function atualizarInstituicao(id, dados) {
  const instituicoes = lerInstituicoes();
  const existe = instituicoes.some((instituicao) => instituicao.id === id);

  if (!existe) throw new Error("Instituição não encontrada.");

  const instituicoesAtualizadas = instituicoes.map((instituicao) => (
    instituicao.id === id
      ? {
        ...instituicao,
        ...dados,
        latitude: dados.latitude === "" ? null : Number(dados.latitude),
        longitude: dados.longitude === "" ? null : Number(dados.longitude),
        atualizadaEm: new Date().toISOString(),
      }
      : instituicao
  ));

  gravarInstituicoes(instituicoesAtualizadas);
}

export function excluirInstituicao(id) {
  const instituicoes = lerInstituicoes();
  const instituicoesAtualizadas = instituicoes.filter((instituicao) => instituicao.id !== id);

  if (instituicoesAtualizadas.length === instituicoes.length) {
    throw new Error("Instituição não encontrada.");
  }

  gravarInstituicoes(instituicoesAtualizadas);
}