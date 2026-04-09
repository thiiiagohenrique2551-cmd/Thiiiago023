# ⚽ XG Sports Analytics - Análise de Apostas Esportivas em Tempo Real

Uma plataforma web moderna para análise de partidas de futebol ao vivo com foco em **Expected Goals (xG)**, **Big Chances**, **Over/Under** e **Probabilidade de Vitória**.

## 🎯 Funcionalidades Principais

### 📊 Análise Completa de Partidas
- **xG (Expected Goals)** - Gols esperados baseado em qualidade de oportunidades
- **Big Chances** - Chances perigosas de gol (como no FlashScore)
- **Over/Under** - Probabilidade de 1.5, 2.5, 3.5 gols
- **Probabilidade de Vitória** - Home/Draw/Away em tempo real
- **Análise de Escanteios** - Previsão de escanteios

### 🏆 Ranking Inteligente
- Ranking automático por chance de gol
- Destaque em verde para times favoritos
- Filtros por liga, campeonato e probabilidade

### 🎨 Interface Moderna
- Design inspirado em Bet365
- Tema escuro profissional
- Responsivo para desktop e mobile
- Cards interativos com detalhes completos

### 🔐 Sistema de Autenticação
- Login seguro com usuário/senha
- Dashboard pessoal
- Histórico de apostas

## 🚀 Deploy Rápido (Gratuito)

### Opção 1: Railway (Recomendado)
```bash
# 1. Faça fork do repositório
# 2. Acesse https://railway.app
# 3. Clique em "New Project"
# 4. Selecione "Deploy from GitHub"
# 5. Autorize e selecione o repositório
# 6. Configure as variáveis de ambiente
# 7. Deploy automático!
```

### Opção 2: Vercel + Railway
- Frontend: Vercel (https://vercel.com)
- Backend: Railway (https://railway.app)

### Opção 3: Docker Local
```bash
docker-compose up -d
```

Veja [DEPLOYMENT.md](./DEPLOYMENT.md) para instruções detalhadas.

## 📋 Requisitos

### Backend
- Python 3.11+
- Flask 2.3+
- PostgreSQL (opcional, SQLite funciona)

### Frontend
- Node.js 18+
- React 18+
- TypeScript
- TailwindCSS

## 🛠️ Instalação Local

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/xg-sports-app.git
cd xg-sports-app
```

### 2. Setup Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Backend rodará em http://localhost:5000

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend rodará em http://localhost:3001

## 🔑 Variáveis de Ambiente

Crie arquivo `.env` na raiz do projeto:

```env
# Backend
FLASK_ENV=production
FLASK_DEBUG=False
API_FOOTBALL_KEY=sua_chave_aqui
SECRET_KEY=sua_chave_secreta

# Database (opcional)
DATABASE_URL=postgresql://user:password@localhost:5432/xg_sports

# Frontend
VITE_API_URL=http://localhost:5000/api
```

## 📊 API Endpoints

### Partidas ao Vivo
```
GET /api/live-matches
```

Retorna todas as partidas ao vivo com análises completas.

**Resposta:**
```json
{
  "success": true,
  "count": 7,
  "matches": [
    {
      "fixture_id": 1001,
      "league": { "name": "Europa League", "country": "Europe" },
      "teams": {
        "home": { "name": "FC Porto", "logo": "..." },
        "away": { "name": "Nottingham Forest", "logo": "..." }
      },
      "score": { "home": 1, "away": 1 },
      "minute": 93,
      "status": "2H",
      "xg": { "home": 1.2, "away": 1.1, "total": 2.3 },
      "win_probability": { "home": 45.0, "draw": 35.0, "away": 20.0 },
      "big_chances": { "home": 3, "away": 2 },
      "over_under": {
        "over_1_5": 95.0,
        "over_2_5": 55.0,
        "over_3_5": 25.0
      }
    }
  ]
}
```

### Status do Servidor
```
GET /api/status
```

## 🎮 Como Usar

1. **Acesse o app** - https://seu-dominio.com
2. **Faça login** - Use suas credenciais
3. **Veja as partidas ao vivo** - Ranking automático por chance de gol
4. **Clique em uma partida** - Veja análise detalhada
5. **Analise os dados** - xG, Big Chances, Over/Under, Escanteios
6. **Faça suas apostas** - Baseado nas probabilidades

## 📱 Suportado em

- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Tablet (iPad, Android)
- ✅ Mobile (iPhone, Android)

## 🔒 Segurança

- ✅ Autenticação com hash de senha
- ✅ CORS configurado
- ✅ Variáveis de ambiente sensíveis
- ✅ HTTPS em produção
- ✅ Rate limiting

## 📈 Performance

- ⚡ Frontend: Vite (build rápido)
- ⚡ Backend: Gunicorn com workers
- ⚡ Cache de dados ao vivo
- ⚡ Atualização a cada 60 segundos

## 🐛 Troubleshooting

### Erro: "Connection refused"
```bash
# Verifique se o backend está rodando
curl http://localhost:5000/api/status
```

### Erro: "CORS error"
```bash
# Verifique se o frontend está acessando a URL correta
# Veja VITE_API_URL no .env
```

### Erro: "Database connection"
```bash
# Verifique DATABASE_URL no .env
# Certifique-se de que o banco está rodando
```

## 📚 Documentação

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Guia de deploy
- [API.md](./API.md) - Documentação da API
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Como contribuir

## 📄 Licença

MIT License - veja [LICENSE](./LICENSE)

## 👨‍💻 Autor

Desenvolvido com ❤️ para apostadores inteligentes.

## 🤝 Contribuições

Contribuições são bem-vindas! Abra uma issue ou pull request.

## 📞 Suporte

- 📧 Email: support@xgsports.com
- 💬 Discord: [Servidor XG Sports]
- 🐦 Twitter: [@xgsports]

---

**Última atualização:** Abril 2026

**Status:** ✅ Produção

**Versão:** 1.0.0
