// Carrega variáveis de ambiente do arquivo .env
// Este é um helper simples para desenvolvimento local

async function loadEnvVariables() {
  try {
    const response = await fetch('.env');
    const text = await response.text();

    const envVars = {};
    text.split('\n').forEach(line => {
      // Ignora comentários e linhas vazias
      if (line.trim() && !line.trim().startsWith('#')) {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length) {
          const value = valueParts.join('=').trim();
          envVars[key.trim()] = value;
        }
      }
    });

    return envVars;
  } catch (error) {
    console.warn('⚠️ Não foi possível carregar .env. Usando valores padrão do config.js');
    return null;
  }
}

// Exporta função para uso global
window.loadEnvVariables = loadEnvVariables;
