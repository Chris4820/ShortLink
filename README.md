# 🔗 ShortLink – Encurtador de Links em Angular

Este projeto é um encurtador de links simples desenvolvido em **Angular 20**, que utiliza o `localStorage` do navegador para guardar, listar e gerir os links encurtados.

## 🚀 Funcionalidades

- Guardar links no `localStorage` com:
  - **Nome** (para identificar o link)
  - **RedirectTo** (URL original)
  - **Hash** (URL curta gerada automaticamente)
- Listagem de todos os links guardados numa tabela com:
  - Nome
  - Hash (URL curta → `/hash`)
  - RedirectTo
  - Botões de ação (**Visitar** / **Eliminar**)
- Redirecionamento automático:
  - Ao aceder a `http://localhost:4200/<hash>`, a aplicação verifica o hash:
    - ✅ Se existir, redireciona para o URL original (`redirectTo`).
    - ❌ Se não existir, mostra uma página de erro **404 – Link não encontrado**.
- Atualização automática da lista quando se adiciona ou remove links, sem necessidade de recarregar a página.

## 📦 Instalação e Execução

1. Clonar este repositório:
   ```bash
   git clone https://github.com/teu-repo/shortlink-angular.git
   cd shortlink-angular


Instalar dependências:
```bash
npm install
Iniciar o servidor de desenvolvimento:

```bash
ng serve
Abrir no browser:

```arduino
Copiar código
http://localhost:4200/
🛠️ Estrutura principal
LocalStorageService → serviço que gere os links no localStorage.

UrlsComponent → tabela que lista os links, com botões para visitar ou eliminar.

RedirectComponent → trata do acesso a /:hash, verificando se existe e redirecionando.

app.routes.ts → define as rotas principais da aplicação.

📖 Exemplo de utilização
Adicionar um novo link (formulário interno da app).

Nome: Google

RedirectTo: https://www.google.com

Será gerado automaticamente algo como:

```json
Copiar código
{
  "name": "Google",
  "redirectTo": "https://www.google.com",
  "hash": "aB3kXy"
}
Na lista, vais ver:

```nginx
Copiar código
Nome      Hash      RedirectTo
Google    aB3kXy    https://www.google.com
Ao abrir http://localhost:4200/aB3kXy, és automaticamente redirecionado para https://www.google.com.

Se o hash não existir, surge uma página de erro 404.