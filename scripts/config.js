// Configuração da API do WhatsApp
// IMPORTANTE: Substitua os valores abaixo com suas credenciais reais

const API_CONFIG = {
  // URL do servidor da API
  serverUrl: 'http://localhost:8080',

  // Nome da instância do WhatsApp
  instance: 'TesteGratis',

  // API Key para autenticação
  // ATENÇÃO: Em produção, NUNCA exponha a API key no frontend
  // Use um backend intermediário para fazer as chamadas à API
  apiKey: '1004'
};

// Exporta a configuração (se estiver usando módulos)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = API_CONFIG;
}
