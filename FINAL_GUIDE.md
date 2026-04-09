# 🎉 XG Sports Analytics - Guia Completo de Uso e Deploy

## 📊 O que é XG Sports Analytics?

O **XG Sports Analytics** é uma plataforma web moderna para análise de partidas de futebol ao vivo com foco em métricas avançadas de apostas esportivas. O app fornece análises em tempo real de **Expected Goals (xG)**, **Big Chances**, **Over/Under**, **Probabilidade de Vitória** e **Odds de Casas de Apostas**.

---

## 🚀 Deploy Rápido (5 Minutos)

### Opção 1: Railway (Recomendado - 100% Gratuito)

#### Passo 1: Preparar GitHub
```bash
# 1. Crie conta em https://github.com
# 2. Faça fork deste repositório
# 3. Clone seu fork:
git clone https://github.com/SEU_USUARIO/xg-sports-app.git
cd xg-sports-app

# 4. Faça um commit inicial
git add .
git commit -m "Initial commit"
git push origin main
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
2. Adicione as seguintes variáveis:

```
FLASK_ENV=production
FLASK_DEBUG=False
API_FOOTBALL_KEY=seu_api_key_aqui
SECRET_KEY=sua_chave_secreta_aqui
```

#### Passo 4: Deploy Automático
- Clique em "Deploy"
- Aguarde 2-3 minutos
- Seu site estará em: `https://seu-projeto.railway.app`

---

## 🎯 Funcionalidades Principais

### 📈 Análise Completa de Partidas

| Métrica | Descrição | Utilidade |
|---------|-----------|-----------|
| **xG (Expected Goals)** | Gols esperados baseado em qualidade de oportunidades | Prever probabilidade de gols |
| **Big Chances** | Chances perigosas de gol (como no FlashScore) | Identificar oportunidades claras |
| **Over/Under** | Probabilidade de 1.5, 2.5, 3.5 gols | Apostar em total de gols |
| **Win Probability** | Probabilidade de vitória (Home/Draw/Away) | Prever resultado final |
| **Escanteios** | Previsão de número de escanteios | Apostar em escanteios |
| **Odds em Tempo Real** | Odds de múltiplas casas de apostas | Encontrar melhores odds |

### 🏆 Ranking Inteligente
- Ranking automático por chance de gol
- Destaque em verde para times favoritos
- Filtros por liga, campeonato e probabilidade
- Atualização a cada 60 segundos

### 🎨 Interface Moderna
- Design inspirado em Bet365
- Tema escuro profissional
- Responsivo para desktop e mobile
- Cards interativos com detalhes completos

---

## 📱 Como Usar o App

### 1. Acessar o App
- Abra o navegador e acesse seu domínio (ex: https://seu-projeto.railway.app)

### 2. Fazer Login
- **Usuário:** `Thiiiago023`
- **Senha:** `213249`

### 3. Visualizar Partidas ao Vivo
- A página inicial mostra todas as partidas em andamento
- Ranking automático por chance de gol (maior probabilidade no topo)
- Cada card mostra: placar, minuto, xG, Big Chances, Over/Under

### 4. Analisar Partida Detalhada
- Clique em qualquer partida
- Modal abre com abas:
  - **Visão Geral:** Resumo geral com probabilidades
  - **Over/Under:** Probabilidades de 1.5, 2.5, 3.5 gols
  - **Estatísticas:** Dados completos da partida
  - **xG:** Análise detalhada de Expected Goals
  - **Escanteios:** Previsão de escanteios

### 5. Consultar Odds
- Cada partida mostra odds de múltiplas casas
- Odds são atualizadas em tempo real
- Compare odds entre casas para melhores retornos

---

## 🔧 Instalação Local (Para Desenvolvimento)

### Pré-requisitos
- Python 3.11+
- Node.js 18+
- Docker (opcional)

### Instalação Manual

#### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Backend rodará em http://localhost:5000

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend rodará em http://localhost:3001

### Instalação com Docker
```bash
# Crie arquivo .env
cp .env.example .env

# Inicie os containers
docker-compose up -d

# Acesse em http://localhost:3001
```

---

## 📊 API Endpoints

### Partidas ao Vivo com Odds
```
GET /api/live-matches
```

**Resposta:**
```json
{
  "success": true,
  "count": 7,
  "matches": [
    {
      "fixture_id": 1001,
      "league": { "name": "Europa League" },
      "teams": { "home": { "name": "FC Porto" }, "away": { "name": "Nottingham Forest" } },
      "score": { "home": 1, "away": 1 },
      "minute": 93,
      "xg": { "home": 1.2, "away": 1.1, "total": 2.3 },
      "win_probability": { "home": 45.0, "draw": 35.0, "away": 20.0 },
      "big_chances": { "home": 3, "away": 2 },
      "over_under": { "over_1_5": 95.0, "over_2_5": 55.0, "over_3_5": 25.0 },
      "odds": {
        "fixture_id": 1001,
        "providers": {
          "simulated": {
            "bookmaker": "Bet365",
            "markets": {
              "Match Winner": {
                "values": [
                  { "name": "Home", "odd": 2.15 },
                  { "name": "Draw", "odd": 3.40 },
                  { "name": "Away", "odd": 3.20 }
                ]
              }
            }
          }
        }
      }
    }
  ]
}
```

### Odds de uma Partida Específica
```
GET /api/match/<fixture_id>/odds
```

### Status do Servidor
```
GET /api/status
```

---

## 🔐 Segurança

- ✅ Autenticação com hash de senha
- ✅ CORS configurado
- ✅ Variáveis de ambiente sensíveis
- ✅ HTTPS em produção
- ✅ Rate limiting

---

## 🐛 Troubleshooting

### Erro: "Cannot connect to backend"
```bash
# Verifique se o backend está rodando
curl http://localhost:5000/api/status

# Se não funcionar, reinicie:
docker-compose restart backend
```

### Erro: "Port already in use"
```bash
# Linux/Mac:
lsof -ti:5000 | xargs kill -9

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Erro: "CORS error"
Verifique se `VITE_API_URL` está correto no `.env` do frontend.

### Erro: "Database connection"
Verifique `DATABASE_URL` no `.env` e certifique-se de que o banco está rodando.

---

## 📈 Performance

- ⚡ Frontend: Vite (build rápido)
- ⚡ Backend: Gunicorn com workers
- ⚡ Cache de dados ao vivo
- ⚡ Atualização a cada 60 segundos
- ⚡ Odds atualizadas em tempo real

---

## 🔄 Atualizar Dados

Os dados são atualizados automaticamente a cada 60 segundos. Para forçar uma atualização:

```bash
# Reiniciar backend
docker-compose restart backend

# Ou recarregar página no navegador
F5 ou Ctrl+R
```

---

## 📚 Documentação Adicional

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Guia detalhado de deploy
- [QUICK_START.md](./QUICK_START.md) - Quick start em 5 minutos
- [README.md](./README.md) - Documentação técnica

---

## 🎓 Exemplos de Uso

### Exemplo 1: Encontrar Melhor Odd para Over 2.5
```javascript
// Filtrar partidas com Over 2.5 > 80%
const goodOdds = matches.filter(m => m.over_under.over_2_5 > 80);

// Encontrar melhor odd
const bestOdd = Math.max(...goodOdds.map(m => 
  m.odds.best_odds['Over/Under 2.5']['Over 2.5'].odd
));
```

### Exemplo 2: Apostar em Time Favorito com xG Alto
```javascript
// Times favoritos com xG > 1.5
const strongTeams = matches.filter(m => 
  m.xg.home > 1.5 && m.win_probability.home > 60
);
```

### Exemplo 3: Monitorar Escanteios
```javascript
// Partidas com alta probabilidade de escanteios
const cornerMatches = matches.filter(m => 
  m.corner_probability > 80
);
```

---

## 📞 Suporte

- 📧 Email: support@xgsports.com
- 💬 Discord: [Servidor XG Sports]
- 🐦 Twitter: [@xgsports]

---

## 📄 Licença

MIT License - veja [LICENSE](./LICENSE)

---

## 🙏 Agradecimentos

Desenvolvido com ❤️ para apostadores inteligentes.

---

**Versão:** 1.0.0 com Odds em Tempo Real

**Status:** ✅ Produção

**Última atualização:** Abril 2026

---

## 📋 Checklist de Deploy

- [ ] Repositório criado no GitHub
- [ ] Fork do repositório feito
- [ ] Conta Railway criada
- [ ] Projeto conectado ao Railway
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy realizado com sucesso
- [ ] App acessível em produção
- [ ] Login funcionando
- [ ] Partidas ao vivo exibindo
- [ ] Odds carregando corretamente
- [ ] Filtros funcionando
- [ ] Detalhes de partida abrindo

---

**Parabéns! Seu app de análise de apostas esportivas está no ar! 🚀**
