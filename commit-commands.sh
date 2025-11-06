#!/bin/bash

# Comandos para fazer commit e push para o GitHub

# 1. Verifica status
echo "📋 Status do repositório:"
git status

# 2. Adiciona todos os arquivos (exceto os do .gitignore)
echo ""
echo "➕ Adicionando arquivos..."
git add .

# 3. Verifica o que será commitado
echo ""
echo "📦 Arquivos que serão commitados:"
git status

# 4. Cria o commit
echo ""
echo "💾 Criando commit..."
git commit -m "feat: Landing page completa com teste grátis e integração WhatsApp

- Adiciona modal de teste grátis com formulário
- Integração com WhatsApp Evolution API
- Modal de demonstração com vídeo
- Calculadora de custos Meta vs Attis
- Sistema de configuração via .env
- Design glassmorphism responsivo
- Animações e efeitos interativos
- README com documentação completa"

# 5. Push para o GitHub
echo ""
echo "🚀 Enviando para o GitHub..."
git push -u origin main

echo ""
echo "✅ Concluído!"
