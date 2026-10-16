// Instituições passam a vir da API (equita_api) em vez do localStorage.
// A API grava categoriaInstituicaoId (FK → CategoriasInstituicao);
// o formulário do frontend usa o código (DELEGACIA, ONG, ...). Este módulo faz a ponte.
import { apiGet, apiPost, apiPut } from "./api";

let cacheCategorias = null;

async function carregarCategorias() {
  if (!cacheCategorias) {
    const categorias = await apiGet("/categorias-instituicao/all");
    cacheCategorias = {
      porId: Object.fromEntries(categorias.map((categoria) => [categoria.id, categoria.nome])),
      porNome: Object.fromEntries(categorias.map((categoria) => [categoria.nome, categoria.id])),
    };
  }
  return cacheCategorias;
}

function paraPayload(dados, categoriaInstituicaoId, ativa) {
  return {
    categoriaInstituicaoId,
    nome: dados.nome,
    descricao: dados.descricao || null,
    endereco: dados.endereco,
    cidade: dados.cidade,
    estado: dados.estado,
    cep: dados.cep || null,
    telefone: dados.telefone || null,
    email: dados.email || null,
    horarioFuncionamento: dados.horarioFuncionamento || null,
    latitude: dados.latitude === "" || dados.latitude == null ? null : Number(dados.latitude),
    longitude: dados.longitude === "" || dados.longitude == null ? null : Number(dados.longitude),
    ativa,
  };
}

export async function carregarInstituicoes() {
  const [instituicoes, categorias] = await Promise.all([
    apiGet("/instituicoes/all"),
    carregarCategorias(),
  ]);

  // devolve as mesmas instituições + o código da categoria (usado pelos filtros e pelo form)
  return instituicoes.map((instituicao) => ({
    ...instituicao,
    categoria: categorias.porId[instituicao.categoriaInstituicaoId] || "",
  }));
}

export async function criarInstituicao(dados) {
  const categorias = await carregarCategorias();
  const categoriaInstituicaoId = categorias.porNome[dados.categoria];
  if (!categoriaInstituicaoId) throw new Error("Categoria de instituição inválida.");

  return apiPost(
    "/instituicoes/create",
    paraPayload(dados, categoriaInstituicaoId, dados.ativa !== false)
  );
}

export async function atualizarInstituicao(id, dados) {
  const categorias = await carregarCategorias();
  const categoriaInstituicaoId = categorias.porNome[dados.categoria];
  if (!categoriaInstituicaoId) throw new Error("Categoria de instituição inválida.");

  const instituicao = await apiPut(
    `/instituicoes/${id}`,
    paraPayload(dados, categoriaInstituicaoId, dados.ativa !== false)
  );

  // o PUT de edição não altera "ativa" → usa os endpoints de ativar/inativar
  if (dados.ativa === false) {
    await apiPut(`/instituicoes/${id}/inativar`);
  } else {
    await apiPut(`/instituicoes/${id}/ativar`);
  }

  return { ...instituicao, categoria: dados.categoria };
}

// delete físico não existe na API → inativação lógica (ativa = 0)
export async function inativarInstituicao(id) {
  return apiPut(`/instituicoes/${id}/inativar`);
}
