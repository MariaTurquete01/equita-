import cursosFixos from "./cursos";
import { carregarCursosPropostos } from "../Voluntario/cursosPropostos";

const CATEGORIAS = {
  direitos: "Direitos",
  cidadania: "Cidadania",
  educacao: "Educação",
  formacao: "Formação profissional",
  outros: "Outros",
};

export function carregarCatalogoCursos() {
  const cursosAprovados = carregarCursosPropostos()
    .filter((curso) => curso.status === "Aprovado")
    .map((curso) => ({
      id: `proposta-${curso.id}`,
      titulo: curso.titulo,
      categoria: CATEGORIAS[curso.categoria] || "Outros",
      professor: "Voluntário aprovado",
      cargaHoraria: curso.duracao || "Não informada",
      nivel: "Não informado",
      descricao: curso.descricao,
      imagem: curso.imagem,
      aulas: Array.isArray(curso.aulas) ? curso.aulas : [],
      certificado: true,
      propostaAprovada: true,
    }));

  return [...cursosFixos, ...cursosAprovados];
}