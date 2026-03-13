import { useState, useEffect } from 'react';
import FilterCard from './components/FilterCard';
import Card from './components/Card';
import { api } from './services/api';
import type { Book, Author, Genre } from './types';
import './App.css';

function App() {
  const [selectedAuthorId, setSelectedAuthorId] = useState<string | null>(null);
  const [selectedGenreId, setSelectedGenreId] = useState<string | null>(null);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState({
    authors: true,
    genres: true,
    books: false
  });

  // Carregamento inicial de autores e gêneros
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [authorsData, genresData] = await Promise.all([
          api.getAuthors(),
          api.getGenres()
        ]);
        setAuthors(authorsData);
        setGenres(genresData);
      } catch (error) {
        console.error("Erro ao buscar filtros:", error);
      } finally {
        setLoading(prev => ({ ...prev, authors: false, genres: false }));
      }
    };

    fetchFilters();
  }, []);

  // Busca livros quando um filtro é selecionado
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(prev => ({ ...prev, books: true }));
      try {
        let booksData: Book[] = [];
        if (selectedAuthorId) {
          booksData = await api.getBooksByAuthor(selectedAuthorId);
        } else if (selectedGenreId) {
          booksData = await api.getBooksByGenre(selectedGenreId);
        } else {
          // Se nenhum filtro estiver selecionado, podemos optar por mostrar todos ou nenhum.
          // O enunciado sugere popular "assim que um Autor ou Genero for selecionado".
          // Vou mostrar todos se nenhum estiver selecionado, ou você pode mudar para [] se preferir.
          booksData = await api.getBooks();
        }
        setBooks(booksData);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
        setBooks([]);
      } finally {
        setLoading(prev => ({ ...prev, books: false }));
      }
    };

    fetchBooks();
  }, [selectedAuthorId, selectedGenreId]);

  const toggleAuthor = (id: string) => {
    setSelectedAuthorId(prev => {
      const isNewSelection = prev !== id;
      if (isNewSelection) {
        setSelectedGenreId(null);
        return id;
      }
      return null;
    });
  };

  const toggleGenre = (id: string) => {
    setSelectedGenreId(prev => {
      const isNewSelection = prev !== id;
      if (isNewSelection) {
        setSelectedAuthorId(null);
        return id;
      }
      return null;
    });
  };

  const clearFilters = () => {
    setSelectedAuthorId(null);
    setSelectedGenreId(null);
  };

  const isAnyFilterActive = selectedAuthorId !== null || selectedGenreId !== null;

  return (
    <div className="container">
      <header className="header">
        <div className="header-content">
          <h1>Desafio</h1>
          {isAnyFilterActive && (
            <button className="clear-btn" onClick={clearFilters}>Limpar Filtros</button>
          )}
        </div>
      </header>

      <main className="dashboard">
        <div className="sidebar">
          <FilterCard 
            title="Autores" 
            items={authors} 
            selectedItemId={selectedAuthorId} 
            onToggle={toggleAuthor} 
            addLabel="Adicionar autor" 
            loading={loading.authors}
          />

          <FilterCard 
            title="Gêneros" 
            items={genres} 
            selectedItemId={selectedGenreId} 
            onToggle={toggleGenre} 
            addLabel="Adicionar gênero" 
            loading={loading.genres}
          />
        </div>

        {isAnyFilterActive && (
          <Card 
            className="content-card"
            title={
              <>
                Livros ({books.length})
              </>
            }
          >
            <div className="table-wrapper">
              <table className="books-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Autor</th>
                    <th>Gênero</th>
                  </tr>
                </thead>
                <tbody>
                  {loading.books ? (
                    <tr>
                      <td colSpan={3} className="empty-state">Carregando livros...</td>
                    </tr>
                  ) : books.length > 0 ? (
                    books.map((book) => (
                      <tr key={book.id}>
                        <td>{book.nome}</td>
                        <td>{book.autorNome}</td>
                        <td>
                          <span className="badge">{book.generoNome}</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="empty-state">Nenhum livro encontrado com esses filtros.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </main>
    </div>
  )
}

export default App
