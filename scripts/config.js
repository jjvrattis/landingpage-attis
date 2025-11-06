// Configuração da API do WhatsApp
// As credenciais podem vir de variáveis de ambiente ou .env

// Valores padrão (fallback)
let API_CONFIG = {
  serverUrl: '__VITE_API_SERVER_URL__',
  instance: '__VITE_API_INSTANCE__',
  apiKey: '__VITE_API_KEY__'
};

// Função para obter variável de ambiente
function getEnvVar(key, fallback) {
  // Tenta pegar de window (injetado pelo build)
  if (typeof window !== 'undefined' && window[key]) {
    return window[key];
  }
  // Tenta pegar de import.meta.env (Vite)
  if (typeof import !== 'undefined' && import.meta && import.meta.env && import.meta.env[key]) {
    return import.meta.env[key];
  }
  return fallback;
}

// Carrega configurações
async function loadConfig() {
  // Primeiro tenta carregar do .env (desenvolvimento local)
  if (typeof window !== 'undefined' && window.loadEnvVariables) {
    try {
      const env = await window.loadEnvVariables();
      if (env) {
        API_CONFIG.serverUrl = env.VITE_API_SERVER_URL || API_CONFIG.serverUrl;
        API_CONFIG.instance = env.VITE_API_INSTANCE || API_CONFIG.instance;
        API_CONFIG.apiKey = env.VITE_API_KEY || API_CONFIG.apiKey;
        console.log('✅ Configurações carregadas do .env');
        return;
      }
    } catch (e) {
      console.log('📝 .env não disponível, usando variáveis de ambiente');
    }
  }

  // Fallback para variáveis de ambiente (produção)
  API_CONFIG.serverUrl = getEnvVar('VITE_API_SERVER_URL', API_CONFIG.serverUrl);
  API_CONFIG.instance = getEnvVar('VITE_API_INSTANCE', API_CONFIG.instance);
  API_CONFIG.apiKey = getEnvVar('VITE_API_KEY', API_CONFIG.apiKey);

  console.log('✅ Configurações carregadas:', {
    serverUrl: API_CONFIG.serverUrl,
    instance: API_CONFIG.instance,
    hasApiKey: !!API_CONFIG.apiKey
  });
}

// Inicializa configuração
loadConfig();

// Exporta a configuração (se estiver usando módulos)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = API_CONFIG;
}
