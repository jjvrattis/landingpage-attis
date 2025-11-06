# Funcionalidade de Teste Grátis - WhatsApp

## 📋 Descrição

Esta funcionalidade permite que visitantes do site recebam uma mensagem de demonstração via WhatsApp. O sistema:

1. ✅ Valida se o número existe no WhatsApp
2. ✅ Envia uma mensagem personalizada de teste
3. ✅ Mostra feedback em tempo real ao usuário

## 🚀 Como Configurar

### 1. Configure a API Key

Edite o arquivo `scripts/config.js` e substitua os valores:

```javascript
const API_CONFIG = {
  serverUrl: 'http://localhost:8080',  // URL do seu servidor
  instance: 'TesteGratis',              // Nome da instância
  apiKey: 'SUA_API_KEY_AQUI'            // Sua API key real
};
```

### 2. Certifique-se que o servidor está rodando

O servidor da API Evolution deve estar rodando em:
```
http://localhost:8080/manager/TesteGratis
```

### 3. Endpoints Utilizados

#### Verificar Número
```javascript
POST http://localhost:8080/chat/fetchProfile/TesteGratis
Headers: {
  "apikey": "sua-api-key",
  "Content-Type": "application/json"
}
Body: {
  "number": "+5511987654321"
}
```

#### Enviar Mensagem
```javascript
POST http://localhost:8080/message/sendText/TesteGratis
Headers: {
  "apikey": "sua-api-key",
  "Content-Type": "application/json"
}
Body: {
  "number": "+5511987654321",
  "options": {
    "delay": 1200,
    "presence": "composing",
    "linkPreview": false
  },
  "textMessage": {
    "text": "Sua mensagem aqui"
  }
}
```

## 🎯 Como Usar

### No Site

1. Clique em "Teste Grátis" ou "Começar Teste Grátis"
2. Um modal será aberto com o formulário
3. Selecione o país (DDI)
4. Digite o número do WhatsApp (apenas números)
5. Personalize a mensagem se desejar
6. Clique em "Enviar Mensagem de Teste"

### Fluxo da Aplicação

```
[Usuário preenche formulário]
           ↓
[Valida dados do formulário]
           ↓
[Verifica se número existe no WhatsApp]
           ↓
[Se OK: Envia mensagem de teste]
           ↓
[Mostra mensagem de sucesso/erro]
```

## 🎨 Design

O modal segue o mesmo design glassmorphism do resto do site:
- Background blur
- Bordas translúcidas
- Efeitos de hover
- Feedback visual em tempo real
- Mensagens de erro/sucesso coloridas

## ⚠️ Segurança

**IMPORTANTE**: Em produção, NUNCA exponha a API key no frontend!

### Solução Recomendada para Produção

Crie um backend intermediário (Node.js, PHP, Python, etc.) que:

1. Recebe as requisições do frontend
2. Valida os dados
3. Faz as chamadas à API Evolution com a API key segura
4. Retorna a resposta ao frontend

Exemplo de estrutura:

```
[Frontend] → [Seu Backend] → [API Evolution]
                 ↓
           [API Key segura]
```

## 🐛 Troubleshooting

### Mensagem não enviada

- Verifique se a API key está correta no `config.js`
- Confirme que o servidor está rodando na porta 8080
- Verifique se a instância "TesteGratis" existe
- Abra o console do navegador (F12) para ver erros detalhados

### Número não encontrado

- Certifique-se de que o número está no formato correto: +DDI + número
- Exemplo: +5511987654321 (Brasil)
- O número precisa estar cadastrado no WhatsApp

### CORS Error

Se aparecer erro de CORS, adicione as headers no servidor:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: apikey, Content-Type
```

## 📝 Personalização

### Mensagem Padrão

Edite no HTML ([index.html](index.html), linha ~417):

```html
<textarea id="testMessage" rows="4" required>
  Sua mensagem personalizada aqui...
</textarea>
```

### Países Disponíveis

Adicione mais países no select ([index.html](index.html), linha ~395):

```html
<option value="+XX">🇧🇷 País (+XX)</option>
```

### Estilos

Modifique os estilos em [styles/main.css](styles/main.css) (final do arquivo):

```css
.teste-gratis-form { ... }
.form-message { ... }
```

## 📞 Contato

Para dúvidas ou suporte, entre em contato através do WhatsApp da plataforma.
