const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0', // Specify OpenAPI version
        info: {
            title: 'E Commerce',
            version: '1.0.0',
            description: 'A simple API documentation with Swagger',
        },
        servers: [
            {
                url: 'http://localhost:3000/api', // Your API base URL
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/api-routes/*.js'], // Path to your API route files containing JSDoc comments
};

const specs = swaggerJsdoc(options);

module.exports = specs;
