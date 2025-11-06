// Configuração da API do WhatsApp
// Os valores são substituídos durante o build pela Vercel

const API_CONFIG = {
  serverUrl: '__VITE_API_SERVER_URL__',
  instance: '__VITE_API_INSTANCE__',
  apiKey: '__VITE_API_KEY__'
};

console.log('✅ API_CONFIG carregado:', {
  serverUrl: API_CONFIG.serverUrl,
  instance: API_CONFIG.instance,
  hasApiKey: !!API_CONFIG.apiKey
});
