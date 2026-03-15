import type { Author, Genre, Book } from "../types";

const getApiBaseUrl = async (): Promise<string> => {
  try {
    const response = await fetch("/api-config.json");
    const config = await response.json();
    return config.API_BASE_URL;
  } catch {
    // Fallback URL caso o arquivo de configuração não exista
    return "http://desafio-api.ajr.dev.br/api";
  }
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
