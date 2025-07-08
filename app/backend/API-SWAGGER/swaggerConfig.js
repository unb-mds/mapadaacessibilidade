// API-SWAGGER/swaggerConfig.js
import swaggerJsdoc from 'swagger-jsdoc';
import YAML from 'yamljs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Corrigir a declaração do __dirname para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API - Mapa da Acessibilidade',
      version: '1.0.0',
      description: 'Documentação das rotas da API',
    },
    servers: [
      {
        url: 'http://localhost:3000/',
        description: 'Servidor de Desenvolvimento'
      }
    ]
  },
  apis: [
    // Corrigir os caminhos - remover vírgula desnecessária e usar __dirname consistentemente
    `${__dirname}/../src/routes/*.js`,
    `${__dirname}/../src/controllers/*.js`,
    `${__dirname}/swaggerComponents.js`
  ]
};

const swaggerSpec = swaggerJsdoc(options);

// Exportação para ES Modules
export default swaggerSpec;