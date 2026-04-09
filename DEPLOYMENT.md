# 🚀 Guia de Deploy - XG Sports Analytics

## Opção 1: Deploy Gratuito no Railway (Recomendado)

### Passo 1: Criar conta no Railway
1. Acesse https://railway.app
2. Clique em "Start Project"
3. Faça login com GitHub ou email

### Passo 2: Conectar repositório GitHub
1. Clique em "Deploy from GitHub"
2. Autorize o Railway a acessar seus repositórios
3. Selecione o repositório `xg-sports-app`

### Passo 3: Configurar variáveis de ambiente
No painel do Railway, vá para "Variables" e adicione:

```
FLASK_ENV=production
FLASK_DEBUG=False
API_FOOTBALL_KEY=seu_api_key_aqui
SECRET_KEY=sua_chave_secreta_aqui
```

### Passo 4: Deploy automático
O Railway fará deploy automaticamente quando você fazer push para a branch principal.

---

## Opção 2: Deploy no Vercel (Frontend) + Railway (Backend)

### Frontend no Vercel:
1. Acesse https://vercel.com
2. Clique em "New Project"
3. Importe o repositório GitHub
4. Selecione a pasta `frontend`
5. Configure variáveis de ambiente:
   ```
   VITE_API_URL=https://seu-backend-railway.railway.app/api
   ```

### Backend no Railway:
Siga os passos da Opção 1

---

## Opção 3: Deploy Local com Docker

### Pré-requisitos:
- Docker instalado
- Docker Compose instalado

### Passos:
1. Clone o repositório
2. Crie arquivo `.env`:
   ```bash
   cp .env.example .env
   ```
3. Edite `.env` com suas configurações

4. Execute:
   ```bash
   docker-compose up -d
   ```

5. Acesse em http://localhost:5000

---

## Estrutura do Projeto

```
xg-sports-app/
├── backend/
│   ├── app.py              # Aplicação Flask principal
│   ├── auth.py             # Sistema de autenticação
│   ├── database.py         # Configuração do banco
│   ├── models.py           # Modelos SQLAlchemy
│   └── requirements.txt    # Dependências Python
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── Dockerfile
├── docker-compose.yml
├── .env.example
└── railway.json
```

---

## Variáveis de Ambiente Necessárias

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `FLASK_ENV` | Ambiente (production/development) | `production` |
| `FLASK_DEBUG` | Debug mode | `False` |
| `API_FOOTBALL_KEY` | Chave da API-Football | `seu_api_key` |
| `DATABASE_URL` | URL do banco de dados | `postgresql://...` |
| `SECRET_KEY` | Chave secreta para sessões | `sua_chave_secreta` |
| `VITE_API_URL` | URL da API para frontend | `https://seu-backend.com/api` |

---

## Monitoramento e Logs

### Railway:
- Acesse o painel do Railway
- Vá para "Logs"
- Veja logs em tempo real

### Local:
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

---

## Troubleshooting

### Erro: "Connection refused"
- Verifique se as variáveis de ambiente estão corretas
- Aguarde alguns segundos para o serviço iniciar

### Erro: "Database connection error"
- Verifique a URL do banco de dados
- Certifique-se de que o banco está rodando

### Erro: "CORS error"
- Verifique a configuração de CORS no `backend/app.py`
- Adicione o domínio do frontend na lista de origens permitidas

---

## Suporte

Para dúvidas ou problemas, abra uma issue no GitHub.
