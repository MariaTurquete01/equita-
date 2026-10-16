import { apiPost } from "./api";

// Sessão do usuário logado (fase 1: sem JWT, guarda o UsuarioDTO retornado pelo login)
const CHAVE_SESSAO = "equita_sessao";

export function obterSessao() {
  try {
    const sessao = JSON.parse(window.localStorage.getItem(CHAVE_SESSAO) || "null");
    return sessao && typeof sessao === "object" ? sessao : null;
  } catch {
    return null;
  }
}

export function salvarSessao(usuario) {
  window.localStorage.setItem(CHAVE_SESSAO, JSON.stringify(usuario));
  return usuario;
}

export function encerrarSessao() {
  window.localStorage.removeItem(CHAVE_SESSAO);
}

export function estaLogado() {
  return obterSessao() !== null;
}

export function ehAdmin() {
  return obterSessao()?.nivelAcesso === "ADMIN";
}

export function ehVoluntario() {
  const nivel = obterSessao()?.nivelAcesso;
  return nivel === "VOLUNTARIO" || nivel === "ADMIN";
}

// POST /usuarios/login → UsuarioDTO (sem senha) ou ApiError (401)
export async function entrar(username, password) {
  const usuario = await apiPost("/usuarios/login", { username, password });
  return salvarSessao(usuario);
}

export function rotuloNivel(nivel) {
  if (nivel === "ADMIN") return "Administrador";
  if (nivel === "VOLUNTARIO") return "Voluntário";
  if (nivel === "USER") return "Usuário";
  return nivel || "Usuário";
}
