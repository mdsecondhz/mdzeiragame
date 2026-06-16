# ⚙️ Arquitetura do Backend - The Crazy Island

Este documento serve como guia técnico para a API e o Banco de Dados do projeto **The Crazy Island**.

---

## 🏗️ Visão Geral

O servidor do backend é construído em **Node.js** com framework **Express**, sendo responsável por expor uma API REST que lida com:
- Autenticação segura de usuários.
- Armazenamento persistente de moedas, nível e inventário dos jogadores.
- Processamento de pagamentos usando Stripe.
- Painel estatístico para administradores do jogo.

---

## 🛠️ Tecnologias Principais

- **Express**: Framework web para roteamento e gerenciamento HTTP.
- **pg (node-postgres)**: Driver para conexão com o banco de dados PostgreSQL.
- **bcryptjs**: Para criptografia unidirecional (hashing) de senhas (salt rounds: 12).
- **jsonwebtoken (JWT)**: Geração e validação de tokens para autenticação sem estado.
- **stripe**: SDK oficial para pagamentos seguros com cartão de crédito.
- **helmet**: Definição de cabeçalhos HTTP focados em segurança básica.
- **express-rate-limit**: Limitação de requisições para mitigar ataques de força bruta e DDoS.

---

## 🔑 Segurança e Autenticação

### Fluxo de Autenticação (JWT)
1. **Registro:** Cria o usuário gerando um hash da senha no banco de dados. Retorna um token assinado.
2. **Login:** Compara a senha informada com o hash salvo utilizando `bcrypt.compare`. Caso coincida, retorna um token JWT com validade de 7 dias contendo o payload:
   ```json
   {
     "sub": "id-do-usuario",
     "email": "email@jogador.com",
     "role": "player | admin"
   }
   ```
3. **Middlewares de Segurança:**
   - `requireAuth`: Extrai e valida o token no cabeçalho `Authorization: Bearer <TOKEN>`. Popula `req.user`.
   - `requireAdmin`: Verifica se `req.user.role === 'admin'`. Lança erro 403 caso contrário.

### Proteções Adicionais
- **Rate Limit:** Limitado a 90 requisições por minuto por IP (`windowMs: 60000`, `limit: 90`).
- **SQL Injection:** Todas as rotas que interagem com PostgreSQL utilizam queries parametrizadas (ex: `$1`, `$2`), impedindo a injeção de comandos maliciosos.

---

## 🗄️ Esquema do Banco de Dados (PostgreSQL)

O arquivo [schema.sql](file:///c:/Users/aluno/OneDrive/Desktop/mdzeira%20aula%2012/db/schema.sql) define a estrutura do banco. As tabelas criadas são:

1.  **`users`**:
    - `id` (UUID, chave primária)
    - `name` (VARCHAR)
    - `email` (VARCHAR, único)
    - `password_hash` (TEXT)
    - `coins` (INT, default 0)
    - `level` (INT, default 1)
    - `role` (VARCHAR, default 'player')
    - `created_at` e `updated_at`

2.  **`items`**:
    - `id` (UUID)
    - `name` (VARCHAR)
    - `description` (TEXT)
    - `price` (INT)
    - `category` (VARCHAR, e.g., 'weapon', 'shield', 'potion')

3.  **`inventory`**:
    - Tabela de associação (N:N) entre `users` e `items`, registrando o inventário de cada jogador.

4.  **`purchases`**:
    - Registro de transações financeiras com ID de referência Stripe (`stripe_session_id`).

5.  **`audit_logs`**:
    - Histórico de ações críticas realizadas por administradores.

---

## 🚦 Endpoints da API

| Método | Rota | Autenticação | Descrição |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/health` | Livre | Retorna `{ ok: true }` para monitoramento. |
| **POST** | `/api/auth/register` | Livre | Registra novo usuário e retorna token JWT. |
| **POST** | `/api/auth/login` | Livre | Valida credenciais e retorna token JWT. |
| **POST** | `/api/auth/password-reset`| Livre | Envia solicitação de redefinição de senha (simulado). |
| **GET** | `/api/player/profile` | `requireAuth` | Retorna os dados do jogador (moedas, nível, etc.). |
| **POST** | `/api/checkout/stripe` | `requireAuth` | Inicia uma sessão de checkout do Stripe para compra de moedas. |
| **GET** | `/api/admin/stats` | `requireAuth` + `requireAdmin` | Retorna total de usuários, pagamentos e itens cadastrados. |

*Nota: Quando o banco de dados (`DATABASE_URL`) ou o Stripe (`STRIPE_SECRET_KEY`) não estão configurados nas variáveis de ambiente, a API responde automaticamente em **modo de demonstração (mock)** para facilitar o teste local.*
