# Calendário de Marketing 2027

Aplicação web gratuita para planejamento anual de conteúdo e campanhas, criada com Next.js, TypeScript e uma organização inspirada em MVC.

## Funcionalidades

- 94 datas estratégicas de 2027 com descrição e ideia de campanha.
- Busca por palavras-chave.
- Filtros por mês, categoria e prioridade.
- Categorias comerciais, digitais, institucionais, sociais, de saúde, sazonais e feriados.
- Cadastro e exclusão de datas personalizadas no navegador.
- Persistência gratuita por `localStorage`.
- Exportação dos resultados filtrados em CSV.
- Exportação em `.ics` para Google Calendar, Outlook e Apple Calendar.
- Modo claro e escuro.
- API JSON em `/api/events`.
- Interface responsiva para computador, tablet e celular.

## Arquitetura MVC

```text
src/
├── app/                         # Rotas e pontos de entrada do Next.js
│   ├── api/events/route.ts      # Controller HTTP / API
│   ├── layout.tsx
│   └── page.tsx
├── controllers/
│   └── calendar-controller.ts   # Filtros, agrupamento, estatísticas e exportações
├── data/
│   └── marketing-events-2027.ts # Base de dados estática
├── models/
│   └── marketing-event.ts       # Tipos e regras do domínio
└── views/
    ├── calendar-dashboard.tsx    # View principal
    └── components/
        └── event-card.tsx        # Componente visual de evento
```

Neste projeto:

- **Model:** tipos, categorias, prioridades e base de eventos.
- **Controller:** tratamento dos filtros, agrupamento, estatísticas e exportações.
- **View:** componentes React responsáveis pela interface.

## Requisitos

- Node.js 20 ou superior.
- npm 10 ou superior.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Validar e gerar versão de produção

```bash
npm run check
npm run build
npm start
```

## Publicar no GitHub

Crie um repositório vazio chamado `calendario-marketing-2027` na sua conta. Depois, dentro da pasta do projeto, execute:

```bash
git init
git add .
git commit -m "feat: calendário de marketing 2027"
git branch -M main
git remote add origin https://github.com/dinicleyaguiar/calendario-marketing-2027.git
git push -u origin main
```

Para usar SSH, substitua a URL do `origin` por:

```bash
git@github.com:dinicleyaguiar/calendario-marketing-2027.git
```

## Publicar gratuitamente na Vercel

1. Acesse o painel da Vercel e escolha **Add New > Project**.
2. Conecte sua conta do GitHub.
3. Importe o repositório `calendario-marketing-2027`.
4. Mantenha o preset **Next.js**.
5. Não é necessário configurar variáveis de ambiente.
6. Clique em **Deploy**.

A Vercel fará novos deploys automaticamente sempre que houver um `push` na branch `main`.

## Atualizar as datas

Edite o arquivo:

```text
src/data/marketing-events-2027.ts
```

Cada evento segue o formato:

```ts
{
  id: "2027-03-15-dia-do-consumidor",
  date: "2027-03-15",
  title: "Dia do Consumidor",
  category: "comercial",
  priority: "alta",
  description: "Descrição da oportunidade.",
  campaignIdea: "Sugestão de conteúdo ou campanha."
}
```

## Observações sobre as datas

Este é um calendário editorial e de marketing, não um calendário jurídico. Datas religiosas, pontos facultativos, feriados estaduais e eventos regionais podem variar. Confirme a aplicação na sua cidade e no seu estado antes de comunicar horários de funcionamento.

As datas móveis de 2027 foram organizadas a partir da Páscoa em 28 de março de 2027. Black Friday foi posicionada em 26 de novembro de 2027, seguida da Cyber Monday em 29 de novembro.

## Tecnologias

- Next.js 16
- React 19
- TypeScript
- CSS puro
- LocalStorage

## Licença

MIT.
