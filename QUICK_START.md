# ⚡ Quick Start - XG Sports Analytics

## 🚀 Deploy em 5 Minutos (Gratuito)

### Opção 1: Railway (Recomendado - Mais Fácil)

#### Passo 1: Preparar GitHub
```bash
# 1. Crie uma conta em https://github.com (se não tiver)
# 2. Faça fork deste repositório
# 3. Clone seu fork:
git clone https://github.com/SEU_USUARIO/xg-sports-app.git
cd xg-sports-app
```

#### Passo 2: Conectar ao Railway
1. Acesse https://railway.app
2. Clique em "Start a New Project"
3. Selecione "Deploy from GitHub"
4. Autorize o Railway
5. Selecione seu repositório `xg-sports-app`

#### Passo 3: Configurar Variáveis
No painel do Railway:
1. Vá para "Variables"
2. Adicione:
```
FLASK_ENV=production
FLASK_DEBUG=False
API_FOOTBALL_KEY=seu_api_key_aqui
SECRET_KEY=sua_chave_secreta_aqui
```

#### Passo 4: Deploy
- Clique em "Deploy"
- Aguarde 2-3 minutos
- Seu site estará em: `https://seu-projeto.railway.app`

---

### Opção 2: Vercel + Railway (Frontend + Backend Separado)

#### Frontend no Vercel:
1. Acesse https://vercel.com
2. Clique em "New Project"
3. Selecione "Import Git Repository"
4. Escolha seu repositório
5. Configure:
   - **Framework**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

6. Adicione variáveis:
```
VITE_API_URL=https://seu-backend-railway.railway.app/api
```

7. Deploy!

#### Backend no Railway:
Siga os passos da Opção 1, mas selecione apenas a pasta `backend`.

---

### Opção 3: Docker Local (Seu Computador)

#### Pré-requisitos:
- Docker Desktop instalado (https://www.docker.com/products/docker-desktop)

#### Passos:
```bash
# 1. Clone o repositório
git clone https://github.com/SEU_USUARIO/xg-sports-app.git
cd xg-sports-app

# 2. Crie arquivo .env
cp .env.example .env

# 3. Edite .env com suas chaves (opcional para teste)

# 4. Inicie os containers
docker-compose up -d

# 5. Aguarde 30 segundos

# 6. Acesse:
# Frontend: http://localhost:3001
# Backend: http://localhost:5000
# API: http://localhost:5000/api/live-matches
```

---

## 🔑 Onde Conseguir Chaves

### API Football Key
1. Acesse https://www.api-football.com
2. Clique em "Free Plan"
3. Registre-se
4. Copie sua API Key
5. Cole em `API_FOOTBALL_KEY`

### Secret Key
Pode ser qualquer string aleatória:
```bash
# No terminal:
openssl rand -hex 32
```

---

## 🧪 Testar Localmente

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Teste em: http://localhost:5000/api/status

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Acesse em: http://localhost:3001

---

## ✅ Verificar se Está Funcionando

### 1. Verificar Backend
```bash
curl http://localhost:5000/api/status
```

Deve retornar:
```json
{"status": "ok", "version": "5.0"}
```

### 2. Verificar Partidas ao Vivo
```bash
curl http://localhost:5000/api/live-matches
```

Deve retornar lista de partidas.

### 3. Acessar Frontend
Abra o navegador em: http://localhost:3001

---

## 🎯 Próximos Passos

### Após Deploy:
1. ✅ Acesse seu site
2. ✅ Faça login com: `Thiiiago023` / `213249`
3. ✅ Veja as partidas ao vivo
4. ✅ Clique em uma partida para detalhes
5. ✅ Analise xG, Big Chances, Over/Under

### Customizações:
- Edite cores em `frontend/src/index.css`
- Adicione mais ligas em `backend/app.py`
- Configure banco de dados em `backend/database.py`

---

## 🐛 Problemas Comuns

### Erro: "Cannot connect to backend"
```bash
# Verifique se o backend está rodando
curl http://localhost:5000/api/status

# Se não funcionar, reinicie:
docker-compose restart backend
```

### Erro: "Port already in use"
```bash
# Mude a porta em docker-compose.yml
# Ou mate o processo:
# Linux/Mac:
lsof -ti:5000 | xargs kill -9

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Erro: "CORS error"
Verifique se `VITE_API_URL` está correto no `.env` do frontend.

---

## 📞 Suporte

Dúvidas? Abra uma issue no GitHub!

---

**Pronto! Seu site de apostas esportivas está no ar! 🎉**
