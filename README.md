# Calendário de Marketing 2027

Aplicação web para planejamento anual de campanhas, conteúdos e ações de marketing ao longo de 2027.

O sistema reúne datas comerciais, sazonais, institucionais, sociais, profissionais, digitais e de saúde em uma interface responsiva, permitindo localizar oportunidades e organizar ideias de campanha com mais facilidade.

## Objetivo do sistema

O Calendário de Marketing 2027 foi desenvolvido para ajudar empresas, agências, profissionais de comunicação, social media, criadores de conteúdo e instituições públicas a planejarem suas ações com antecedência.

Cada data cadastrada apresenta informações como categoria, prioridade, descrição e sugestão de campanha.

## Funcionalidades

- Calendário com 94 datas estratégicas de 2027.
- Busca por título, descrição e ideia de campanha.
- Filtro por mês.
- Filtro por categoria.
- Filtro por nível de prioridade.
- Agrupamento dos eventos por mês.
- Indicadores com quantidade de datas e oportunidades.
- Descrição detalhada de cada evento.
- Sugestões de conteúdo e campanha.
- Cadastro de datas personalizadas.
- Exclusão de datas personalizadas.
- Armazenamento das datas personalizadas no navegador.
- Exportação dos resultados em CSV.
- Exportação em formato `.ics`.
- Compatibilidade do arquivo `.ics` com Google Calendar, Outlook e Apple Calendar.
- Modo claro e escuro.
- Interface adaptada para computador, tablet e celular.
- API interna para consulta dos eventos.

## Categorias disponíveis

O sistema organiza as datas nas seguintes categorias:

- Comercial
- Digital
- Institucional
- Social
- Saúde
- Sazonal
- Profissional
- Feriado

## Níveis de prioridade

Cada evento pode ser classificado conforme sua relevância para o planejamento:

- Alta
- Média
- Baixa

A prioridade ajuda a identificar rapidamente as datas que podem gerar campanhas mais importantes ou que exigem maior antecedência.

## Arquitetura MVC

O projeto utiliza uma organização inspirada no padrão MVC:

- **Model:** define os tipos, categorias, prioridades e regras dos eventos.
- **Controller:** processa filtros, agrupamentos, estatísticas e exportações.
- **View:** apresenta os dados e controla a interação com o usuário.

### Estrutura principal

```text
src/
├── app/
│   ├── api/
│   │   └── events/
│   │       └── route.ts
│   ├── globals.css
│   ├── icon.svg
│   ├── layout.tsx
│   └── page.tsx
├── controllers/
│   └── calendar-controller.ts
├── data/
│   └── marketing-events-2027.ts
├── models/
│   └── marketing-event.ts
└── views/
    ├── calendar-dashboard.tsx
    └── components/
        └── event-card.tsx
```

## Componentes do sistema

### Model

O arquivo abaixo contém as definições do domínio da aplicação:

```text
src/models/marketing-event.ts
```

Nele estão definidos:

- Estrutura dos eventos.
- Categorias disponíveis.
- Níveis de prioridade.
- Tipos utilizados nos filtros.

### Controller

O processamento dos dados está concentrado em:

```text
src/controllers/calendar-controller.ts
```

Esse controller é responsável por:

- Aplicar os filtros selecionados.
- Ordenar os eventos por data.
- Agrupar os resultados por mês.
- Gerar estatísticas.
- Gerar arquivos CSV.
- Gerar arquivos de calendário no formato `.ics`.

### View

A interface principal está localizada em:

```text
src/views/calendar-dashboard.tsx
```

Os cards individuais dos eventos são renderizados pelo componente:

```text
src/views/components/event-card.tsx
```

## Base de dados das datas

Os eventos oficiais do calendário estão armazenados no arquivo:

```text
src/data/marketing-events-2027.ts
```

Cada evento segue esta estrutura:

```ts
{
  id: "2027-03-15-dia-do-consumidor",
  date: "2027-03-15",
  title: "Dia do Consumidor",
  category: "comercial",
  priority: "alta",
  description: "Descrição da oportunidade de marketing.",
  campaignIdea: "Sugestão de conteúdo ou campanha."
}
```

## Datas personalizadas

As datas adicionadas pelo usuário são armazenadas no `localStorage` do navegador.

Isso significa que:

- Não é necessário banco de dados externo.
- As informações ficam salvas no próprio navegador.
- Os dados não são compartilhados entre dispositivos.
- A limpeza dos dados do navegador pode remover as datas personalizadas.

## API de eventos

O sistema disponibiliza uma rota interna para consulta dos eventos:

```text
GET /api/events
```

A resposta é fornecida em formato JSON e contém a lista de datas cadastradas no calendário oficial.

## Exportação CSV

A exportação CSV gera uma planilha com os eventos que estiverem visíveis após a aplicação dos filtros.

O arquivo inclui informações como:

- Data
- Título
- Categoria
- Prioridade
- Descrição
- Ideia de campanha

## Exportação de calendário

A exportação `.ics` permite importar as datas para aplicativos de calendário compatíveis, como:

- Google Calendar
- Microsoft Outlook
- Apple Calendar

Os eventos exportados respeitam os filtros ativos no momento da geração do arquivo.

## Tecnologias utilizadas

- Next.js 16
- React 19
- TypeScript
- CSS
- LocalStorage
- API Routes do Next.js

## Requisitos

- Node.js 20 ou superior.
- npm 10 ou superior.

## Executar o sistema localmente

Instale as dependências:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

Acesse no navegador:

```text
http://localhost:3000
```

## Scripts disponíveis

### Ambiente de desenvolvimento

```bash
npm run dev
```

### Verificação do TypeScript

```bash
npm run check
```

### Gerar a versão de produção

```bash
npm run build
```

### Executar a versão de produção

```bash
npm start
```

## Personalização das datas

Para adicionar, editar ou remover datas oficiais, altere o arquivo:

```text
src/data/marketing-events-2027.ts
```

Mantenha os identificadores únicos e utilize datas no formato:

```text
AAAA-MM-DD
```

Exemplo:

```text
2027-11-26
```

## Observações importantes

O sistema funciona como um calendário editorial e de marketing. Ele não substitui calendários oficiais, jurídicos ou administrativos.

Feriados estaduais, municipais, pontos facultativos, datas religiosas e eventos regionais podem variar conforme a localidade. Antes de divulgar horários de funcionamento ou informações institucionais, confirme os dados nos órgãos oficiais responsáveis.

## Licença

Este projeto utiliza a licença MIT. 

