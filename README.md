## 📘 README.md Atualizado

Agora, aqui está o `README.md` finalizado para você colocar no GitHub:

```markdown
# 📍 Locafy

**Locafy** é uma plataforma web desenvolvida com **Next.js 14** e **MongoDB** que permite aos usuários **publicar locais para aluguel** e **realizar reservas** com **pagamento integrado via Mercado Pago**.

> ✅ Projeto em produção: [https://locafyproject.netlify.app](https://locafyproject.netlify.app)

---

## ✨ Funcionalidades

- Login com conta do Google (NextAuth)
- Cadastro de locais com imagem, descrição, valor e datas disponíveis
- Sistema de reservas com pagamento via Mercado Pago (checkout pro)
- Upload de imagens via Cloudinary
- Painel do usuário com suas reservas e locais publicados
- Atualização automática da reserva após pagamento aprovado
- Totalmente responsivo com Tailwind CSS
- Integração com MongoDB e Prisma ORM

---

## 🧭 Fluxo de Uso

1. O usuário entra com conta Google
2. Publica ou reserva um local disponível
3. É redirecionado para o checkout do Mercado Pago
4. Após o pagamento, o status da reserva é atualizado automaticamente via webhook

---

## 🧰 Tecnologias Utilizadas

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB Atlas](https://www.mongodb.com/)
- [Prisma ORM](https://www.prisma.io/)
- [NextAuth](https://next-auth.js.org/)
- [Cloudinary](https://cloudinary.com/)
- [Mercado Pago](https://www.mercadopago.com.br/)
- [Jest](https://jestjs.io/)

---

## 🗂️ Estrutura de Pastas

`locafy/
├── app/                        # Rotas e páginas com o App Router
│   └── (subpastas de rotas)
├── pages/                      # Arquivos auxiliares de rota
├── prisma/                     # Configuração do Prisma + schema.prisma
│   └── schema.prisma
├── public/                     # Arquivos públicos (imagens, favicon, etc.)
├── .env.local                  # Variáveis de ambiente (não versionar)
├── .env.example                # Modelo de variáveis de ambiente
├── .gitignore
├── eslint.config.mjs
├── jest.config.js
├── mercadopago.d.ts
├── middleware.ts
├── next-env.d.ts
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── estrutura.txt              # (opcional, usado para referência interna)
└── README.md


---

## ⚙️ Como Rodar o Projeto Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/italo1101locafy.git
cd locafy
````

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie o arquivo `.env.local` com base em `.env.example`:

```bash
cp .env.example .env.local
```

Preencha os valores de acordo com as suas credenciais (ou use valores de teste fornecidos pelo desenvolvedor).

### 4. Rode a aplicação

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Variáveis de Ambiente

Todas as variáveis obrigatórias estão descritas no arquivo `.env.example`. Elas incluem:

* Conexão com MongoDB
* Autenticação Google
* Chave secreta do NextAuth
* Token do Mercado Pago (modo sandbox)
* Cloudinary para upload de imagens
* URL base do frontend

---

## ✅ Testes

Execute os testes com:

```bash
npm run test
```

---

## 📌 Melhorias Futuras (TODO)

* Filtros por cidade e faixa de preço
* Sistema de avaliação/comentários
* Upload múltiplo de imagens
* Notificações por e-mail
* Tradução multilíngue (i18n)

---


---

## 📄 Licença

Este projeto está sob a licença **MIT** – sinta-se à vontade para usar, estudar e modificar.

```
