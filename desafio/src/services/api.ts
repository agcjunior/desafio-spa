import type { Author, Genre, Book } from "../types";

let cachedApiBaseUrl: string | null = null;

const getApiBaseUrl = async (): Promise<string> => {
  if (cachedApiBaseUrl) return cachedApiBaseUrl;

  try {
    const response = await fetch("/api-config.json");
    if (!response.ok) throw new Error();
    const config = await response.json();
    cachedApiBaseUrl = config.API_BASE_URL;
  } catch {
    // Se falhar, verifica se estamos em desenvolvimento (Vite)
    // Se estivermos em produção e o arquivo falhar, usa a URL direta
    const isDev = import.meta.env.DEV;
    cachedApiBaseUrl = isDev ? "/api" : "https://desafio-api.ajr.dev.br/api";
  }
  return cachedApiBaseUrl!;
};

const fetchOptions: RequestInit = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const api = {
  getAuthors: async (): Promise<Author[]> => {
    const API_BASE_URL = await getApiBaseUrl();
    const response = await fetch(`${API_BASE_URL}/autores`, fetchOptions);
    if (!response.ok) throw new Error("Erro ao buscar autores");
    return response.json();
  },
  getGenres: async (): Promise<Genre[]> => {
    const API_BASE_URL = await getApiBaseUrl();
    const response = await fetch(`${API_BASE_URL}/generos`, fetchOptions);
    if (!response.ok) throw new Error("Erro ao buscar gêneros");
    return response.json();
  },
  getBooks: async (): Promise<Book[]> => {
    const API_BASE_URL = await getApiBaseUrl();
    const response = await fetch(`${API_BASE_URL}/livros`, fetchOptions);
    if (!response.ok) throw new Error("Erro ao buscar livros");
    return response.json();
  },
  getBooksByAuthor: async (authorId: string): Promise<Book[]> => {
    const API_BASE_URL = await getApiBaseUrl();
    const response = await fetch(
      `${API_BASE_URL}/livros/autor/${authorId}`,
      fetchOptions,
    );
    if (!response.ok) throw new Error("Erro ao buscar livros por autor");
    return response.json();
  },
  getBooksByGenre: async (genreId: string): Promise<Book[]> => {
    const API_BASE_URL = await getApiBaseUrl();
    const response = await fetch(
      `${API_BASE_URL}/livros/genero/${genreId}`,
      fetchOptions,
    );
    if (!response.ok) throw new Error("Erro ao buscar livros por gênero");
    return response.json();
  },
  createGenre: async (nome: string): Promise<Genre> => {
    const API_BASE_URL = await getApiBaseUrl();
    const response = await fetch(`${API_BASE_URL}/generos`, {
      ...fetchOptions,
      method: "POST",
      body: JSON.stringify({ nome }),
    });
    if (!response.ok) throw new Error("Erro ao criar gênero");
    return response.json();
  },
  createBook: async (data: {
    nome: string;
    autorId: string;
    generoId: string;
  }): Promise<Book> => {
    const API_BASE_URL = await getApiBaseUrl();
    const response = await fetch(`${API_BASE_URL}/livros`, {
      ...fetchOptions,
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Erro ao criar livro");
    return response.json();
  },
  createAuthor: async (nome: string): Promise<Author> => {
    const API_BASE_URL = await getApiBaseUrl();
    const response = await fetch(`${API_BASE_URL}/autores`, {
      ...fetchOptions,
      method: "POST",
      body: JSON.stringify({ nome }),
    });
    if (!response.ok) throw new Error("Erro ao criar autor");
    return response.json();
  },
};
