# Dashboard Profissional de Produtos e Vendas

Um dashboard moderno e responsivo para gerenciamento de produtos e métricas de vendas, desenvolvido com React, Node.js/Express, PostgreSQL e CSS puro.

## 🎯 Funcionalidades

- **Autenticação JWT**: Sistema seguro de login e logout
- **Proteção de Rotas**: Apenas usuários autenticados podem acessar o dashboard
- **Sidebar Fixa**: Navegação intuitiva com menu colapsável
- **Header Responsivo**: Exibe nome do usuário logado com menu de ações
- **Cards de Métricas**: Visualização de KPIs em tempo real (usuários, vendas, faturamento, conversão)
- **Gráficos Interativos**: Gráfico de vendas por mês usando Canvas
- **Tabela Dinâmica**: Lista completa de produtos com informações detalhadas
- **Responsividade**: Design adaptável para desktop, tablet e mobile
- **CSS Puro**: Sem dependências de frameworks CSS, totalmente customizável

## 🏗️ Arquitetura

### Frontend
- **React 19**: Interface de usuário moderna e reativa
- **TypeScript**: Tipagem estática para maior segurança
- **tRPC**: Comunicação type-safe com o backend
- **CSS Puro**: Estilos organizados por componentes

### Backend
- **Node.js + Express**: Servidor robusto e escalável
- **tRPC**: Procedures type-safe para APIs
- **Drizzle ORM**: Gerenciamento de banco de dados
- **JWT**: Autenticação segura

### Banco de Dados
- **PostgreSQL/TiDB**: Armazenamento confiável de dados
- **Tabelas**: users, products, sales
- **Índices**: Otimizados para performance

## 📂 Estrutura de Pastas

```
/dashboard-tile-dates-produtos-one
├── client/                          # Frontend React
│   ├── src/
│   │   ├── components/              # Componentes reutilizáveis
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── MetricCard.tsx
│   │   │   ├── Chart.tsx
│   │   │   └── ProductTable.tsx
│   │   ├── pages/                   # Páginas da aplicação
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Home.tsx
│   │   │   └── NotFound.tsx
│   │   ├── styles/                  # CSS organizado por componentes
│   │   │   ├── global.css
│   │   │   ├── sidebar.css
│   │   │   ├── header.css
│   │   │   ├── metric-card.css
│   │   │   ├── chart.css
│   │   │   ├── table.css
│   │   │   ├── dashboard.css
│   │   │   └── app.css
│   │   ├── lib/
│   │   │   └── trpc.ts              # Cliente tRPC
│   │   ├── App.tsx                  # Componente principal
│   │   └── main.tsx                 # Ponto de entrada
│   └── package.json
│
├── server/                          # Backend Node.js
│   ├── routers.ts                   # Procedures tRPC
│   ├── db.ts                        # Query helpers
│   ├── _core/                       # Framework core
│   │   ├── index.ts
│   │   ├── context.ts
│   │   ├── trpc.ts
│   │   ├── env.ts
│   │   └── ...
│   └── auth.logout.test.ts          # Testes
│
├── drizzle/                         # Schema e migrations
│   ├── schema.ts                    # Definição de tabelas
│   ├── 0001_*.sql                   # Migrations
│   └── drizzle.config.ts
│
├── shared/                          # Código compartilhado
│   └── const.ts
│
├── package.json                     # Dependências do projeto
├── tsconfig.json                    # Configuração TypeScript
├── vite.config.ts                   # Configuração Vite
└── README.md                        # Este arquivo
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 22+
- PostgreSQL/TiDB
- npm ou pnpm

### Instalação e Execução

1. **Instalar dependências**
```bash
pnpm install
```

2. **Configurar variáveis de ambiente**
```bash
# Criar arquivo .env com as variáveis necessárias
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

3. **Executar migrations do banco de dados**
```bash
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```

4. **Iniciar o servidor de desenvolvimento**
```bash
pnpm dev
```

5. **Acessar a aplicação**
- Abra http://localhost:3000 no navegador
- Faça login com as credenciais de teste

### Credenciais de Teste
- **Email**: admin@manus.im
- **Senha**: (Use o sistema de autenticação OAuth do Manus)

## 🧪 Testes

Executar testes unitários:
```bash
pnpm test
```

## 📊 Dados de Teste

O projeto inclui dados de teste pré-carregados:
- **2 usuários**: admin e user
- **8 produtos**: Notebook, Mouse, Teclado, Monitor, Webcam, Headset, SSD, RAM
- **10 vendas**: Com datas variadas para demonstração

## 🎨 Customização

### Cores e Temas
Edite as variáveis CSS em `client/src/styles/global.css`:
```css
:root {
  --primary: #2563eb;
  --primary-dark: #1e40af;
  --success: #10b981;
  --danger: #ef4444;
  /* ... mais variáveis */
}
```

### Componentes
Todos os componentes estão em `client/src/components/` e podem ser facilmente customizados.

## 📱 Responsividade

O dashboard é totalmente responsivo com breakpoints em:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: até 767px

## 🔐 Segurança

- **JWT**: Autenticação segura com tokens
- **Proteção de Rotas**: Apenas usuários autenticados acessam dados
- **CORS**: Configurado para aceitar requisições do frontend
- **Variáveis de Ambiente**: Credenciais não são commitadas

## 📦 Dependências Principais

### Frontend
- react@19
- @trpc/react-query
- vite
- typescript

### Backend
- express
- @trpc/server
- drizzle-orm
- jsonwebtoken

## 🔄 Fluxo de Autenticação

1. Usuário acessa a aplicação
2. Se não autenticado, é redirecionado para login
3. Após login bem-sucedido, recebe JWT token
4. Token é armazenado em cookie seguro
5. Todas as requisições incluem o token
6. Backend valida o token antes de processar
7. Logout limpa o token e redireciona para login

## 📈 Performance

- **Lazy Loading**: Componentes carregam sob demanda
- **Otimização de Imagens**: Placeholders e lazy loading
- **Caching**: Dados em cache quando apropriado
- **Compressão**: Assets comprimidos em produção

## 🐛 Troubleshooting

### Erro de conexão com banco de dados
- Verifique se o PostgreSQL está rodando
- Confirme a `DATABASE_URL` no arquivo `.env`
- Verifique as credenciais de acesso

### Erro de autenticação
- Limpe os cookies do navegador
- Verifique se o `JWT_SECRET` está configurado
- Tente fazer logout e login novamente

### Componentes não carregam
- Verifique o console do navegador para erros
- Limpe o cache do navegador (Ctrl+Shift+Delete)
- Reinicie o servidor de desenvolvimento

## 📝 Licença

Este projeto é fornecido como está para fins educacionais e comerciais.

## 👨‍💻 Autor

Desenvolvido com ❤️ usando React, Node.js e PostgreSQL.

---

**Última atualização**: Fevereiro de 2026
