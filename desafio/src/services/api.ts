import type { Author, Genre, Book } from '../types';

const API_BASE_URL = 'http://localhost:5220/api';

export const api = {
  getAuthors: async (): Promise<Author[]> => {
    const response = await fetch(`${API_BASE_URL}/autores`);
    if (!response.ok) throw new Error('Erro ao buscar autores');
    return response.json();
  },
  getGenres: async (): Promise<Genre[]> => {
    const response = await fetch(`${API_BASE_URL}/generos`);
    if (!response.ok) throw new Error('Erro ao buscar gêneros');
    return response.json();
  },
  getBooks: async (): Promise<Book[]> => {
    const response = await fetch(`${API_BASE_URL}/livros`);
    if (!response.ok) throw new Error('Erro ao buscar livros');
    return response.json();
  },
  getBooksByAuthor: async (authorId: string): Promise<Book[]> => {
    const response = await fetch(`${API_BASE_URL}/livros/autor/${authorId}`);
    if (!response.ok) throw new Error('Erro ao buscar livros por autor');
    return response.json();
  },
  getBooksByGenre: async (genreId: string): Promise<Book[]> => {
    const response = await fetch(`${API_BASE_URL}/livros/genero/${genreId}`);
    if (!response.ok) throw new Error('Erro ao buscar livros por gênero');
    return response.json();
  }
};
