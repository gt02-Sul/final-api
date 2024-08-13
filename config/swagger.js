const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.2',
            description: 'Documentação da API do projeto final',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
            },
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        full_name: {
                            type: 'string',
                            description: 'Nome do usuário',
                        },
                        email: {
                            type: 'string',
                            description: 'Email do usuário',
                        },
                        password: {
                            type: 'string',
                            description: 'Senha do usuário',
                        }
                    },
                    required: ['full_name', 'email', 'password'],
                },
                Address: {
                    type: 'object',
                    properties: {
                        street: {
                            type: 'string',
                            description: 'Rua do endereço',
                        },
                        number: {
                            type: 'string',
                            description: 'Número do endereço',
                        },
                        city: {
                            type: 'string',
                            description: 'Cidade do endereço',
                        },
                        state: {
                            type: 'string',
                            description: 'Estado do endereço',
                        },
                        zip_code: {
                            type: 'string',
                            description: 'Código postal do endereço',
                        },
                    },
                    required: ['street', 'city', 'state', 'zip_code'],
                },
            },
        },
    },
    apis: ['./routes/*.js'], // Caminho para os arquivos de rotas onde você vai documentar as rotas
};

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    specs,
};
