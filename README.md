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

A aplicação consome uma API REST que deve estar rodando em `http://localhost:5220` (desenvolvimento) ou `https://desafio.ajr.dev.br/api` (produção - em breve).

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

---

## 🔄 CI/CD e Deploy Automático

Este projeto possui um workflow de CI/CD configurado utilizando **GitHub Actions** que realiza deploy automático a cada push na branch `main`.

### Workflow: Deploy Desafio-spa to SmarterAsp

O workflow está definido em [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) e executa as seguintes etapas:

1. **Checkout** - Baixa o código do repositório
2. **Setup Node** - Configura o ambiente com Node.js versão 20
3. **Install dependencies** - Instala as dependências do projeto
4. **Build project** - Compila o projeto para produção
5. **Deploy via FTP** - Faz o upload dos arquivos compilados para o servidor SmarterAsp

### Configuração

Para que o deploy funcione, as seguintes secrets devem ser configuradas no repositório GitHub:

| Secret         | Descrição                         |
| -------------- | --------------------------------- |
| `FTP_SERVER`   | Endereço do servidor FTP          |
| `FTP_USERNAME` | Usuário FTP                       |
| `FTP_PASSWORD` | Senha FTP                         |
| `FTP_DIR`      | Diretório no servidor para upload |

### Como funciona

A cada push realizado na branch `main`, o GitHub Actions automaticamente:

- Compila a aplicação
- Faz o deploy para o servidor de produção

Não é necessário realizar deploy manual.
