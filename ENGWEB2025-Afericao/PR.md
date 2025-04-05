# Documentação do Sistema de Gestão de Livros

## 1. Estrutura do Sistema

### API de Dados (Backend)
- **Porta:** `17000`
- **Responsabilidade:** Gestão dos dados de livros armazenados em MongoDB
- **Framework:** Node.js + Express
- **Base de dados:** MongoDB

#### Endpoints principais:
- `GET /livros` – Lista todos os livros (com possibilidade de filtro por `character` e `genre`)
- `GET /livros/genres/lista` – Lista de géneros únicos ordenada
- `GET /livros/characters/lista` – Lista de personagens únicos ordenada
- `GET /livros/:id` – Devolve os dados completos de um livro com o identificador fornecido
- `GET /livros/autores/:id` – Devolve todos os livros de um autor (via `_id` do autor)
- `POST /livros` – Adiciona um novo livro à base de dados
- `PUT /livros/:id` – Atualiza o livro com o identificador dado
- `DELETE /livros/:id` – Elimina o livro com o identificador dado

**Identificação dos livros:**  
Para identificar de forma única cada livro, será utilizado o campo `_id` do MongoDB, que é atribuído automaticamente a cada documento quando é inserido na base de dados. Este campo é único e imutável, garantindo que cada livro tenha um identificador exclusivo.

### Interface Web (Frontend)
- **Porta:** `17001`
- **Responsabilidade:** Apresentação dos dados ao utilizador
- **Tecnologias:** Node.js + Express + Pug + W3.CSS

#### Rotas principais:
- `/` – Página inicial com a lista de livros (ID, título, autor, data de publicação, páginas)
- `/:id` – Página de detalhes do livro, com todos os campos e imagem da capa (`coverImg`)
- `/entidades/:idAutor` – Página de um autor específico, com:
  - Nome e identificador do autor
  - Tabela com todos os livros do autor
  - Total de livros publicados por esse autor
  - Link para voltar à página principal

## 2. Transformação e Importação de Dados

Durante a preparação dos dados para importação no MongoDB:

1. Corrigiu-se a estrutura de campos como `genres`, `characters`, `awards` e `author`, convertendo-os de strings com listas para arrays válidos do JSON.
2. O campo `author` foi transformado em array de objetos com `{ _id, name }` para permitir navegação direta entre páginas de autores.
3. Adicionou-se o campo `_id` manualmente para cada livro (extraído do `bookId`) de forma consistente.
4. Foram aplicadas normalizações de texto e validação de tipos (`pages`, `numRatings`, `price`, etc.).
5. Os dados foram finalmente importados via `mongoimport`, garantindo integridade e eficiência nas queries.

## 3. Ligação entre Livros e Autores (`author._id` como referência)

Para permitir que o nome do autor seja clicável e redirecione para a respetiva página (`/entidades/:idAutor`), o campo `author` foi transformado de string para um array de objetos com a estrutura `{ _id, name }`.  
O `_id` foi gerado a partir do nome do autor em formato slug (ex: `j-k-rowling`) para servir como identificador único.  
Na interface, cada autor é apresentado como um link com `href="/entidades/:idAutor"`, permitindo navegar até uma página que lista todos os livros desse autor e mostra o total de publicações.
