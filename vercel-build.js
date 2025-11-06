// Script para injetar variáveis de ambiente no build da Vercel
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'scripts', 'config.js');
let configContent = fs.readFileSync(configPath, 'utf8');

// Substitui os valores padrão pelas variáveis de ambiente
const serverUrl = process.env.VITE_API_SERVER_URL || 'http://localhost:8080';
const instance = process.env.VITE_API_INSTANCE || 'TesteGratis';
const apiKey = process.env.VITE_API_KEY || 'YOUR_API_KEY_HERE';

// Injeta as variáveis no início do arquivo
const injectedVars = `
// Variáveis injetadas durante o build
window.VITE_API_SERVER_URL = '${serverUrl}';
window.VITE_API_INSTANCE = '${instance}';
window.VITE_API_KEY = '${apiKey}';

`;

configContent = injectedVars + configContent;

fs.writeFileSync(configPath, configContent);

console.log('✅ Variáveis de ambiente injetadas no config.js');
console.log('Server URL:', serverUrl);
console.log('Instance:', instance);
console.log('Has API Key:', !!apiKey);
