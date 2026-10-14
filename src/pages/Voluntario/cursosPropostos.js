const CHAVE_CURSOS_PROPOSTOS = "equita_cursos_propostos";

export function carregarCursosPropostos() {
  try {
    const cursos = JSON.parse(
      window.localStorage.getItem(CHAVE_CURSOS_PROPOSTOS) || "[]"
    );
    return Array.isArray(cursos) ? cursos : [];
  } catch {
    return [];
  }
}

export function salvarCursosPropostos(cursos) {
  window.localStorage.setItem(CHAVE_CURSOS_PROPOSTOS, JSON.stringify(cursos));
}