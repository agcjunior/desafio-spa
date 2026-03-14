# Desafio - Gerenciamento de Livros

## 📚 Sobre a Aplicação

Esta é uma aplicação SPA (Single Page Application) para gerenciamento de livros, autores e gêneros literários. O projeto permite:

- **Visualizar** autores e gêneros em cards no painel lateral
- **Filtrar** livros por autor ou gênero
- **Adicionar** novos autores, gêneros e livros através de modais
- **Visualizar** a lista de livros em uma tabela

## 🛠️ Tecnologias Utilizadas

| Tecnologia     | Descrição                                           |
| -------------- | --------------------------------------------------- |
| **React**      | Biblioteca JavaScript para construção de interfaces |
| **TypeScript** | Superset JavaScript com tipagem estática            |
| **Vite**       | Build tool rápido para desenvolvimento              |
| **CSS**        | Estilização com CSS Modules                         |

## 📋 Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** (gerenciador de pacotes do Node.js)

## 🚀 Como Executar

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd desafio
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

A aplicação será iniciada em `http://localhost:5173`

### 4. Backend (necessário para funcionamento)

A aplicação consome uma API REST que deve estar rodando em `http://localhost:5220`.

Endpoints esperados:

- `GET /api/autores` - Lista de autores
- `GET /api/generos` - Lista de gêneros
- `GET /api/livros` - Lista de livros
- `POST /api/autores` - Criar autor
- `POST /api/generos` - Criar gênero
- `POST /api/livros` - Criar livro

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── Card.tsx        # Componente de card base
│   ├── FilterCard.tsx  # Card para filtros (autores/gêneros)
│   ├── Modal.tsx       # Componente de modal
│   └── Toast.tsx       # Componente de notificação
├── services/
│   └── api.ts          # Configuração da API
├── App.tsx             # Componente principal
├── App.css             # Estilos globais
├── types.ts            # Definições de tipos TypeScript
└── main.tsx            # Entry point da aplicação
```

## 🔧 Comandos Disponíveis

| Comando           | Descrição                            |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Inicia o servidor de desenvolvimento |
| `npm run build`   | Compila o projeto para produção      |
| `npm run lint`    | Executa o linter                     |
| `npm run preview` | Visualiza a versão de produção       |

## 📄 Licença

MIT
