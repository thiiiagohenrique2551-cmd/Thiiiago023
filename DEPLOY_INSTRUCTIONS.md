# 🚀 Instruções de Deploy - XG Sports Analytics

## ⚠️ IMPORTANTE: Siga os passos EXATAMENTE na ordem!

---

## PASSO 1: Criar Conta no GitHub (5 minutos)

### 1.1 Acesse GitHub
- Abra: https://github.com/signup
- Preencha com seus dados:
  - **Email:** thiiiagohenrique2551@gmail.com
  - **Senha:** Escolha uma senha forte
  - **Username:** Escolha um nome (ex: thiiiago-xg-sports)
- Clique em **"Create account"**

### 1.2 Verificar Email
- GitHub enviará um email para thiiiagohenrique2551@gmail.com
- Abra o email e clique no link de verificação
- Pronto! Conta criada ✅

---

## PASSO 2: Criar Repositório no GitHub (2 minutos)

### 2.1 Criar Novo Repositório
1. Faça login em https://github.com
2. Clique no **"+"** no canto superior direito
3. Selecione **"New repository"**
4. Preencha:
   - **Repository name:** `xg-sports-app`
   - **Description:** `XG Sports Analytics - Real-time Betting Analysis`
   - **Visibility:** Public
   - **Initialize repository:** NÃO marque nada
5. Clique em **"Create repository"**

### 2.2 Copiar URL do Repositório
- Você verá uma página com a URL
- Copie a URL (parecida com: `https://github.com/SEU_USERNAME/xg-sports-app.git`)
- **Guarde essa URL!** 📝

---

## PASSO 3: Fazer Upload do Código (5 minutos)

### 3.1 No Terminal/Prompt (Windows/Mac/Linux)

Abra o terminal e execute os comandos:

```bash
# 1. Navegue até a pasta do projeto
cd /home/ubuntu/xg-sports-app

# 2. Configure Git com seu email
git config user.email "thiiiagohenrique2551@gmail.com"
git config user.name "Seu Nome"

# 3. Adicione o repositório remoto (COLE A URL QUE VOCÊ COPIOU)
git remote add origin https://github.com/SEU_USERNAME/xg-sports-app.git

# 4. Renomeie a branch para main
git branch -M main

# 5. Faça o push do código
git push -u origin main
```

### 3.2 Autenticação GitHub
- GitHub pedirá sua senha ou token
- Se pedir token:
  1. Acesse: https://github.com/settings/tokens
  2. Clique em **"Generate new token"**
  3. Selecione **"repo"**
  4. Clique em **"Generate token"**
  5. Copie o token e cole no terminal

**Pronto! Código enviado para GitHub ✅**

---

## PASSO 4: Criar Conta no Railway (3 minutos)

### 4.1 Acesse Railway
- Abra: https://railway.app
- Clique em **"Start a New Project"**
- Selecione **"Deploy from GitHub"**

### 4.2 Autorizar GitHub
- Railway pedirá para autorizar seu GitHub
- Clique em **"Authorize"**
- Selecione seu repositório `xg-sports-app`

### 4.3 Selecionar Repositório
- Escolha `xg-sports-app` da lista
- Clique em **"Deploy"**

**Railway começará a fazer deploy! ⏳**

---

## PASSO 5: Configurar Variáveis de Ambiente (2 minutos)

### 5.1 Acessar Painel do Railway
1. Vá para: https://railway.app/dashboard
2. Clique no seu projeto `xg-sports-app`
3. Clique na aba **"Variables"**

### 5.2 Adicionar Variáveis
Clique em **"Add Variable"** e adicione:

| Variável | Valor |
|----------|-------|
| `FLASK_ENV` | `production` |
| `FLASK_DEBUG` | `False` |
| `API_FOOTBALL_KEY` | `sua_chave_aqui` |
| `SECRET_KEY` | `sua_chave_secreta_aqui` |

### 5.3 Onde Conseguir Chaves

**API_FOOTBALL_KEY:**
1. Acesse: https://www.api-football.com
2. Clique em **"Free Plan"**
3. Registre-se
4. Copie sua API Key
5. Cole em `API_FOOTBALL_KEY`

**SECRET_KEY:**
- Pode ser qualquer string aleatória
- Exemplo: `abc123xyz789def456`

---

## PASSO 6: Deploy Automático (5 minutos)

### 6.1 Aguardar Deploy
1. Vá para: https://railway.app/dashboard
2. Clique no seu projeto
3. Veja o status do deploy
4. Aguarde até aparecer **"Deployment Successful"** ✅

### 6.2 Obter URL Pública
1. No painel do Railway, clique em **"Deployments"**
2. Clique no deployment bem-sucedido
3. Procure por **"Public URL"**
4. Copie a URL (parecida com: `https://xg-sports-app.railway.app`)

**PRONTO! Seu app está no ar! 🚀**

---

## PASSO 7: Acessar o App (1 minuto)

### 7.1 Abrir no Navegador
1. Copie a URL pública do Railway
2. Cole no navegador
3. Pressione Enter

### 7.2 Fazer Login
- **Usuário:** `Thiiiago023`
- **Senha:** `213249`

### 7.3 Pronto!
- Você verá as partidas ao vivo
- Odds em tempo real
- Análises completas

---

## 🎯 Resumo Rápido

| Passo | O que fazer | Tempo |
|-------|-----------|-------|
| 1 | Criar conta GitHub | 5 min |
| 2 | Criar repositório | 2 min |
| 3 | Upload do código | 5 min |
| 4 | Criar conta Railway | 3 min |
| 5 | Configurar variáveis | 2 min |
| 6 | Deploy automático | 5 min |
| 7 | Acessar app | 1 min |
| **TOTAL** | | **23 minutos** |

---

## 🆘 Problemas Comuns

### Erro: "Repository not found"
- Verifique se o repositório é **Public**
- Verifique se a URL está correta

### Erro: "Permission denied"
- Gere um token GitHub (veja passo 3.2)
- Use o token como senha

### Erro: "Deployment failed"
- Verifique as variáveis de ambiente
- Verifique se a API Key é válida
- Reinicie o deploy

### Erro: "Cannot connect to backend"
- Aguarde 2-3 minutos após deploy
- Recarregue a página (F5)

---

## 📞 Suporte

Se tiver dúvidas:
1. Leia este guia novamente
2. Verifique os erros comuns acima
3. Abra uma issue no GitHub

---

## ✅ Checklist Final

- [ ] Conta GitHub criada
- [ ] Email verificado
- [ ] Repositório criado
- [ ] Código enviado para GitHub
- [ ] Conta Railway criada
- [ ] Repositório conectado ao Railway
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy bem-sucedido
- [ ] URL pública obtida
- [ ] App acessível no navegador
- [ ] Login funcionando
- [ ] Partidas ao vivo exibindo

---

**Parabéns! Seu app de análise de apostas esportivas está no ar! 🎉**

**Link do seu app:** `https://seu-projeto.railway.app`

Compartilhe com seus amigos! 📱
