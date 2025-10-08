## **Sistema de Lista de Presentes e Gestão de Evento de Casamento**.  

Uma aplicação web completa para criar e gerenciar eventos de casamento, incluindo lista de presentes personalizados, controle de convidados, dashboard administrativo com   gráficos e estatísticas.

 No **banco de dados**, temos três modelos principais: **Convidado**, **Evento** e **TabelaDePresentes**, ligados por uma relação 1-para-1 **Convidado** e **TabelaDePresentes**. Cada convidado pode escolher apenas um presente, e cada presente só pode ser associado a um convidado.  
 
 O **backend** foi feito em **Express + Prisma**. Foi criado rotas para adicionar, listar, excluir presentes, além de permitir que convidados escolham presentes usando um token. Também foi feito rotas administrativas para listar convidados e remover vínculos entre presentes e convidados.  

---

## Tecnologias

  Front-end: Next.js 14+, React 18+, Tailwind CSS

  Back-end: Next.js App Router (API Routes)

  Banco de Dados: Postgres (NeonDB) integrado via Prisma ORM

  Deployment: Vercel

  Gráficos: react-chartjs-2

  Notificações: Sonner

---

## Principais fluxos

  O administrador acessa o dashboard para visualizar os presentes disponíveis, escolhidos e confirmações de convidados.

  Ao editar o evento, a data é exibida em formato brasileiro e salva/recuperada do banco no padrão ISO. Funções utilitárias convertem entre os formatos.

  O frontend consome APIs próprias do Next.js, integradas ao banco NeonDB via Prisma.

---

## Funcionalidades

  Cadastro de Convidados: Adicione, confirme presença e gerencie convidados.

  Lista de Presentes: Administre presentes disponíveis, escolhidos e visualize sua popularidade através de gráficos.

  Dashboard Administrativo: Visualize KPIs do evento, como presentes cadastrados, confirmados e evolução das escolhas em tempo real.

  Gestão de Evento: Crie e edite o evento, informando data, local e descrição com entrada e apresentação em formato brasileiro.

  Gráficos Dinâmicos: Dashboard com gráficos interativos usando Chart.js, integrados ao backend para exibir estatísticas reais.

---

## Como rodar o projeto

Clone o repositório:

    git clone https://github.com/seu-usuario/seu-repo.git

Instale dependências:
    
    npm install


Configure o banco NeonDB e as variáveis de ambiente no .env:

    DATABASE_URL=postgresql://usuario:senha@host:porta/banco?sslmode=require

Rode as migrações:

    npx prisma migrate deploy

Inicie o projeto:

    npm run dev

---

## Imagens

#### Area Administrativa

  <p>Dashboard</p>
  <img width="1310" height="639" alt="dashboard do painel administrativo" src="https://github.com/user-attachments/assets/ee66dc0f-b0a0-40ce-884c-bc2fada07dbe" />
  <p>Area para criar os presentes</p>
  <img width="1335" height="804" alt="seleção de presentes" src="https://github.com/user-attachments/assets/0fe86874-6f0d-4661-b5c8-030962ce2da2" />
  <p>Link para enviar os convites</p>
  <img width="1335" height="804" alt="link para convite" src="https://github.com/user-attachments/assets/1c3f5254-8e9a-490f-84cb-76652f9713ae" />
  <p>Area para criar/editar o evento</p>
  <img width="1335" height="804" alt="cadastrar evento" src="https://github.com/user-attachments/assets/8e3eb647-3929-4e13-bd76-328e24b9f8de" />

#### Area do convidado

  <p>Seleção de presente</p>
  <img width="1335" height="804" alt="image" src="https://github.com/user-attachments/assets/d9fa32c2-46e5-425a-a4e8-a17943a6472d" />
  <p>Preencher dados relacionados ao presente selecionado</p>
  <img width="842" height="585" alt="image" src="https://github.com/user-attachments/assets/6f599d18-428b-4f47-9ac3-12f023352bcb" />
  <p>Confirmação do presente selecionado e descrição do evento</p>
  <img width="988" height="717" alt="image" src="https://github.com/user-attachments/assets/f5dbb236-80b3-468e-bb1c-425d5cc1099c" />

---

### Deploy

A aplicação pode ser facilmente publicada no Vercel, basta conectar o repositório, configurar **DATABASE_URL** nas variáveis de ambiente e fazer o deploy automático.

---

### Autor

Desenvolvido por **Guilherme Martins**, desenvolvedor web se especializando em aplicações React, Next.js, Prisma e automação de deploy para eventos personalizados.


