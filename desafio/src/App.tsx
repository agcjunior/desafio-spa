import { useState, useEffect } from "react";
import FilterCard from "./components/FilterCard";
import Card from "./components/Card";
import Modal from "./components/Modal";
import Toast from "./components/Toast";
import { api } from "./services/api";
import type { Book, Author, Genre } from "./types";
import "./App.css";

function App() {
  const [selectedAuthorId, setSelectedAuthorId] = useState<string | null>(null);
  const [selectedGenreId, setSelectedGenreId] = useState<string | null>(null);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState({
    authors: true,
    genres: true,
    books: false,
  });

  // Modal states
  const [showGenreModal, setShowGenreModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const [showAuthorModal, setShowAuthorModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Toast state
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Form states
  const [genreName, setGenreName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [bookName, setBookName] = useState("");
  const [bookAuthorId, setBookAuthorId] = useState("");
  const [bookGenreId, setBookGenreId] = useState("");

  // Carregamento inicial de autores e gêneros
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [authorsData, genresData] = await Promise.all([
          api.getAuthors(),
          api.getGenres(),
        ]);
        setAuthors(authorsData);
        setGenres(genresData);
      } catch (error) {
        console.error("Erro ao buscar filtros:", error);
      } finally {
        setLoading((prev) => ({ ...prev, authors: false, genres: false }));
      }
    };

    fetchFilters();
  }, []);

  // Busca livros quando um filtro é selecionado
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading((prev) => ({ ...prev, books: true }));
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
        setLoading((prev) => ({ ...prev, books: false }));
      }
    };

    fetchBooks();
  }, [selectedAuthorId, selectedGenreId]);

  const toggleAuthor = (id: string) => {
    setSelectedAuthorId((prev) => {
      const isNewSelection = prev !== id;
      if (isNewSelection) {
        setSelectedGenreId(null);
        return id;
      }
      return null;
    });
  };

  const toggleGenre = (id: string) => {
    setSelectedGenreId((prev) => {
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

  const handleCreateGenre = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!genreName.trim()) return;

    setSubmitting(true);
    try {
      await api.createGenre(genreName);
      const genresData = await api.getGenres();
      setGenres(genresData);
      setShowGenreModal(false);
      setGenreName("");
    } catch (error) {
      console.error("Erro ao criar gênero:", error);
      alert("Erro ao criar gênero. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateAuthor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim()) return;

    setSubmitting(true);
    try {
      await api.createAuthor(authorName);
      const authorsData = await api.getAuthors();
      setAuthors(authorsData);
      setShowAuthorModal(false);
      setAuthorName("");
    } catch (error) {
      console.error("Erro ao criar autor:", error);
      alert("Erro ao criar autor. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookName.trim() || !bookAuthorId || !bookGenreId) return;

    setSubmitting(true);
    try {
      await api.createBook({
        nome: bookName,
        autorId: bookAuthorId,
        generoId: bookGenreId,
      });

      // Refresh books if a filter is active
      if (selectedAuthorId || selectedGenreId) {
        let booksData: Book[] = [];
        if (selectedAuthorId) {
          booksData = await api.getBooksByAuthor(selectedAuthorId);
        } else if (selectedGenreId) {
          booksData = await api.getBooksByGenre(selectedGenreId);
        }
        setBooks(booksData);
      }

      setShowBookModal(false);
      setBookName("");
      setBookAuthorId("");
      setBookGenreId("");
      setToast({ message: "Livro incluído com sucesso", type: "success" });
    } catch (error) {
      console.error("Erro ao criar livro:", error);
      alert("Erro ao criar livro. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const isAnyFilterActive =
    selectedAuthorId !== null || selectedGenreId !== null;

  return (
    <div className="container">
      <header className="header">
        <div className="header-content">
          <h1>Desafio</h1>
          <div className="header-actions">
            <button
              className="btn btn-primary"
              onClick={() => setShowBookModal(true)}
            >
              + Novo Livro
            </button>
            {isAnyFilterActive && (
              <button className="clear-btn" onClick={clearFilters}>
                Limpar Filtros
              </button>
            )}
          </div>
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
            onAdd={() => setShowAuthorModal(true)}
          />

          <FilterCard
            title="Gêneros"
            items={genres}
            selectedItemId={selectedGenreId}
            onToggle={toggleGenre}
            addLabel="Adicionar gênero"
            loading={loading.genres}
            onAdd={() => setShowGenreModal(true)}
          />
        </div>

        {isAnyFilterActive && (
          <Card className="content-card" title={<>Livros ({books.length})</>}>
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
                      <td colSpan={3} className="empty-state">
                        Carregando livros...
                      </td>
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
                      <td colSpan={3} className="empty-state">
                        Nenhum livro encontrado com esses filtros.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </main>

      {/* Modal para adicionar gênero */}
      <Modal
        isOpen={showGenreModal}
        onClose={() => setShowGenreModal(false)}
        title="Adicionar Gênero"
      >
        <form onSubmit={handleCreateGenre}>
          <div className="form-group">
            <label htmlFor="genreName">Nome do Gênero</label>
            <input
              id="genreName"
              type="text"
              value={genreName}
              onChange={(e) => setGenreName(e.target.value)}
              placeholder="Ex: Ficção"
              required
            />
          </div>
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowGenreModal(false)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal para adicionar autor */}
      <Modal
        isOpen={showAuthorModal}
        onClose={() => setShowAuthorModal(false)}
        title="Adicionar Autor"
      >
        <form onSubmit={handleCreateAuthor}>
          <div className="form-group">
            <label htmlFor="authorName">Nome do Autor</label>
            <input
              id="authorName"
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Ex: Stephen King"
              required
            />
          </div>
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowAuthorModal(false)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal para adicionar livro */}
      <Modal
        isOpen={showBookModal}
        onClose={() => setShowBookModal(false)}
        title="Adicionar Livro"
      >
        <form onSubmit={handleCreateBook}>
          <div className="form-group">
            <label htmlFor="bookName">Nome do Livro</label>
            <input
              id="bookName"
              type="text"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              placeholder="Ex: O Código Da Vinci"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="bookAuthor">Autor</label>
            <select
              id="bookAuthor"
              value={bookAuthorId}
              onChange={(e) => setBookAuthorId(e.target.value)}
              required
            >
              <option value="">Selecione um autor</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="bookGenre">Gênero</label>
            <select
              id="bookGenre"
              value={bookGenreId}
              onChange={(e) => setBookGenreId(e.target.value)}
              required
            >
              <option value="">Selecione um gênero</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowBookModal(false)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Toast de notificação */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
