const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../dist/portfolio-frontend/config.json');
const apiUrl = process.env.API_URL || '';

const config = { apiUrl };
fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
console.log('config.json updated with API_URL:', apiUrl);
