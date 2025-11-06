// Script para injetar variáveis de ambiente no build da Vercel
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'scripts', 'config.js');
let configContent = fs.readFileSync(configPath, 'utf8');

// Pega as variáveis de ambiente
const serverUrl = process.env.VITE_API_SERVER_URL || 'http://localhost:8080';
const instance = process.env.VITE_API_INSTANCE || 'TesteGratis';
const apiKey = process.env.VITE_API_KEY || 'YOUR_API_KEY_HERE';

console.log('🔧 Substituindo placeholders...');
console.log('Server URL:', serverUrl);
console.log('Instance:', instance);
console.log('Has API Key:', !!apiKey);

// Substitui os placeholders pelas variáveis reais
configContent = configContent.replace(/__VITE_API_SERVER_URL__/g, serverUrl);
configContent = configContent.replace(/__VITE_API_INSTANCE__/g, instance);
configContent = configContent.replace(/__VITE_API_KEY__/g, apiKey);

// Salva o arquivo modificado
fs.writeFileSync(configPath, configContent);

console.log('✅ Variáveis de ambiente injetadas no config.js');
