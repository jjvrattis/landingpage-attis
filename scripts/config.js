// Configuração da API do WhatsApp
// As credenciais são carregadas do arquivo .env

// Valores padrão (fallback caso .env não esteja disponível)
let API_CONFIG = {
  serverUrl: 'http://localhost:8080',
  instance: 'TesteGratis',
  apiKey: 'YOUR_API_KEY_HERE' // Será sobrescrito pelo .env
};

// Carrega variáveis de ambiente
(async () => {
  if (typeof window !== 'undefined' && window.loadEnvVariables) {
    const env = await window.loadEnvVariables();
    if (env) {
      API_CONFIG.serverUrl = env.VITE_API_SERVER_URL || API_CONFIG.serverUrl;
      API_CONFIG.instance = env.VITE_API_INSTANCE || API_CONFIG.instance;
      API_CONFIG.apiKey = env.VITE_API_KEY || API_CONFIG.apiKey;

      console.log('✅ Configurações carregadas do .env');
    }
  }
})();

// Exporta a configuração (se estiver usando módulos)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = API_CONFIG;
}
