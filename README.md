# Landing Page - Attis Pro

Landing page para a plataforma de gestão WhatsApp Attis Pro, com integração à API Evolution para envio de mensagens de teste.

## 🚀 Funcionalidades

- ✅ Design glassmorphism moderno e responsivo
- ✅ Modal de teste grátis com integração WhatsApp
- ✅ Modal de demonstração com vídeo
- ✅ Calculadora de custos Meta vs Attis
- ✅ Formulário de contato
- ✅ Animações e efeitos interativos
- ✅ Carrossel de depoimentos
- ✅ Seção de preços com toggle mensal/anual

## 📋 Pré-requisitos

- Servidor web local (Python, Node.js, ou qualquer outro)
- API Evolution rodando em http://localhost:8080
- Instância do WhatsApp configurada

## 🔧 Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/jjvrattis/landingpage-attis.git
cd landingpage-attis
```

### 2. Configure as variáveis de ambiente

Copie o arquivo de exemplo e preencha com suas credenciais:

```bash
cp .env.example .env
```

Edite o arquivo `.env`:

```env
VITE_API_SERVER_URL=http://localhost:8080
VITE_API_INSTANCE=TesteGratis
VITE_API_KEY=sua_api_key_aqui
```

### 3. Inicie um servidor local

**Opção 1 - Python:**
```bash
python -m http.server 8003
```

**Opção 2 - Node.js:**
```bash
npx http-server -p 8003
```

### 4. Acesse no navegador

```
http://localhost:8003
```

## 📁 Estrutura do Projeto

```
├── index.html              # Página principal
├── styles/
│   └── main.css           # Estilos da página
├── scripts/
│   ├── env.js             # Carregador de variáveis de ambiente
│   ├── config.js          # Configurações da API
│   └── app.js             # Lógica principal
├── *.png, *.jpg           # Imagens e ícones
├── testenvios.mp4         # Vídeo de demonstração
├── .env                   # Variáveis de ambiente (não commitado)
├── .env.example           # Exemplo de configuração
└── .gitignore             # Arquivos ignorados pelo Git

## 🔒 Segurança

**IMPORTANTE:** O arquivo `.env` contém informações sensíveis e **NÃO** deve ser commitado no Git.

### Em Produção

Para ambiente de produção, **NUNCA** exponha a API key no frontend. Implemente um backend intermediário:

```
[Frontend] → [Backend Seguro] → [API Evolution]
```

O backend deve:
1. Receber requisições do frontend
2. Validar dados
3. Fazer chamadas à API Evolution com a API key
4. Retornar resposta ao frontend

## 🛠️ Tecnologias

- HTML5
- CSS3 (Glassmorphism design)
- Vanilla JavaScript (ES6+)
- WhatsApp Evolution API

## 📝 Endpoints Utilizados

### Verificar Número
```
POST /chat/fetchProfile/{instance}
```

### Enviar Mensagem
```
POST /message/sendText/{instance}
```

## 🤝 Como Contribuir

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado e pertence à Attis Pro.

## 📞 Contato

- Email: contato@plataformawhatsapp.com.br
- WhatsApp: (11) 99999-9999

---

Desenvolvido com ❤️ para Attis Pro
