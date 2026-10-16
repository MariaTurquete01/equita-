// Catálogo e inscrições de cursos — ponte entre o frontend e /cursos, /materiais e /inscricoes.
import { apiGet, apiPost, apiPut } from "./api";

// O banco (tabela Cursos) não tem coluna de categoria →
// a categoria exibida é inferida do título/descrição (mesmos valores do filtro da UI)
const REGRAS_CATEGORIA = [
  { categoria: "Direitos Humanos", termos: ["direitos humanos", "dignidade"] },
  {
    categoria: "Violência",
    termos: ["violência", "violencia", "assedio", "assédio", "bullying", "doméstica", "domestica", "feminicídio", "feminicidio"],
  },
  { categoria: "Diversidade", termos: ["racismo", "diversidade", "lgbt", "racial"] },
  {
    categoria: "Inclusão",
    termos: ["inclusão", "inclusao", "deficiência", "deficiencia", "acessibilidade", "pcd"],
  },
  { categoria: "Saúde", termos: ["saúde", "saude", "bem-estar", "bem estar"] },
  { categoria: "Educação", termos: ["educação", "educacao", "escola"] },
  {
    categoria: "Formação profissional",
    termos: ["profissional", "formação", "formacao", "capacitação", "carreira"],
  },
  { categoria: "Cidadania", termos: ["cidadania", "voto", "participação social"] },
  {
    categoria: "Direitos",
    termos: ["mulheres", "mulher", "criança", "crianca", "adolescente", "idoso", "família", "familia", "trabalho", "trabalhista"],
  },
];

export function inferirCategoria(curso) {
  const texto = `${curso.titulo || ""} ${curso.descricao || ""}`.toLowerCase();
  for (const regra of REGRAS_CATEGORIA) {
    if (regra.termos.some((termo) => texto.includes(termo))) return regra.categoria;
  }
  return "Outros";
}

export function rotuloStatusCurso(status) {
  if (status === "APROVADO") return "Aprovado";
  if (status === "REPROVADO") return "Reprovado";
  return "Em análise";
}

function paraCursoUI(curso, totalAulas) {
  return {
    id: curso.id,
    titulo: curso.titulo,
    descricao: curso.descricao || "",
    categoria: inferirCategoria(curso),
    professor: "Voluntário Equitá",
    cargaHoraria: curso.cargaHoraria ? `${curso.cargaHoraria} horas` : "Não informada",
    nivel: "Não informado",
    imagem: null,
    aulas: totalAulas,
    certificado: true,
    origem: curso, // objeto cru da API (statusAprovacao, publicado, voluntarioId...)
  };
}

async function contarMateriaisPublicados(cursoId) {
  try {
    const materiais = await apiGet(`/materiais/curso/${cursoId}`);
    return materiais.filter((material) => material.publicado).length;
  } catch {
    return 0;
  }
}

// catálogo público (GET /cursos/publicados) + nº de conteúdos publicados de cada curso
export async function carregarCursosPublicados() {
  const cursos = await apiGet("/cursos/publicados");
  const contagens = await Promise.all(cursos.map((curso) => contarMateriaisPublicados(curso.id)));
  return cursos.map((curso, indice) => paraCursoUI(curso, contagens[indice]));
}

export async function carregarCurso(id) {
  const curso = await apiGet(`/cursos/${id}`);
  const totalAulas = await contarMateriaisPublicados(curso.id);
  return paraCursoUI(curso, totalAulas);
}

// os materiais publicados do curso viram as "aulas" exibidas na página de detalhe
export async function carregarAulasDoCurso(cursoId) {
  const materiais = await apiGet(`/materiais/curso/${cursoId}`);
  return materiais
    .filter((material) => material.publicado)
    .map((material) => ({
      id: material.id,
      titulo: material.titulo,
      descricao: material.descricao || "",
      link: material.linkExterno || material.caminhoArquivo || "",
    }));
}

export async function carregarInscricoesDoUsuario(usuarioId) {
  const inscricoes = await apiGet(`/inscricoes/usuario/${usuarioId}`);
  return inscricoes
    .filter((inscricao) => inscricao.ativo)
    .map((inscricao) => ({
      id: inscricao.id,
      usuarioId: inscricao.usuarioId,
      cursoId: inscricao.cursoId,
      progresso: Number(inscricao.percentualProgresso) || 0,
      concluido: Boolean(inscricao.concluido),
      inscritoEm: inscricao.dataInscricao,
      origem: inscricao,
    }));
}

export async function inscrever(usuarioId, cursoId) {
  return apiPost("/inscricoes/create", {
    usuarioId,
    cursoId,
    percentualProgresso: 0,
    concluido: false,
    ativo: true,
  });
}

// progresso da inscrição (percentual) — o nível de aula concluída fica no navegador
export async function atualizarProgresso(inscricao, percentualProgresso) {
  const concluido = percentualProgresso >= 100;
  return apiPut(`/inscricoes/${inscricao.id}`, {
    usuarioId: inscricao.usuarioId,
    cursoId: inscricao.cursoId,
    percentualProgresso,
    concluido,
    dataConclusao: concluido ? new Date().toISOString().slice(0, 19) : null,
  });
}

// "excluir" inscrição = inativação lógica (a API não tem DELETE)
export async function cancelarInscricao(inscricaoId) {
  return apiPut(`/inscricoes/${inscricaoId}/inativar`);
}
