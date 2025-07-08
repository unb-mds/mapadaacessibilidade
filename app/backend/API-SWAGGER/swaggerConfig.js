const swaggerJsdoc = require("swagger-jsdoc");
const YAML = require("yamljs");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API - Mapa da Acessibilidade",
      version: "1.0.0",
      description:
        "Documentação das rotas da API para gerenciamento de locais acessíveis",

      apis: ["./src/routes/*.js", "./src/controllers/*.js"],
    },
  },
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
