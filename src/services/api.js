// Camada de acesso à API (equita_api — Spring Boot).
// Base: VITE_API_URL (opcional). Padrão: http://localhost:8080
// O CorsConfig da API já libera o origin http://localhost:5173 (Vite).
const BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:8080").replace(/\/+$/, "");

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function extrairMensagem(resposta, padrao) {
  try {
    const corpo = await resposta.json();
    return corpo.mensagem || corpo.message || corpo.error || padrao;
  } catch {
    return padrao;
  }
}

async function requisitar(caminho, opcoes = {}) {
  let resposta;

  try {
    resposta = await fetch(`${BASE_URL}${caminho}`, {
      ...opcoes,
      headers: {
        "Content-Type": "application/json",
        ...(opcoes.headers || {}),
      },
    });
  } catch {
    throw new ApiError(
      `Não foi possível conectar à API em ${BASE_URL}. Verifique se o equita_api está rodando.`,
      0
    );
  }

  if (!resposta.ok) {
    const mensagem = await extrairMensagem(
      resposta,
      `A requisição falhou (HTTP ${resposta.status}).`
    );
    throw new ApiError(mensagem, resposta.status);
  }

  if (resposta.status === 204) return null;

  const texto = await resposta.text();
  return texto ? JSON.parse(texto) : null;
}

export function apiGet(caminho) {
  return requisitar(caminho, { method: "GET" });
}

export function apiPost(caminho, corpo) {
  return requisitar(caminho, { method: "POST", body: JSON.stringify(corpo ?? {}) });
}

export function apiPut(caminho, corpo) {
  return requisitar(caminho, { method: "PUT", body: JSON.stringify(corpo ?? {}) });
}
