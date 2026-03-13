export interface Author {
  id: string;
  nome: string;
}

export interface Genre {
  id: string;
  nome: string;
}

export interface Book {
  id: string;
  nome: string;
  autorId: string;
  autorNome: string;
  generoId: string;
  generoNome: string;
}
