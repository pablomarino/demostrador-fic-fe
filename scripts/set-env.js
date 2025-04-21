
// scripts/set-env.ts
const fs = require('fs');
const dotenv = require('dotenv');
const envConfig = dotenv.parse(fs.readFileSync('.env'));

const targetPath = './src/environments/environment.ts';

const content = `
export const environment = {
  production: true,
  apiURL: '${envConfig.API_URL}',
  apiPort: '${envConfig.API_PORT}'
};
`;

fs.writeFileSync(targetPath, content);
console.log(`✅ environment.prod.ts generado con apiUrl=${envConfig.API_URL}`);
