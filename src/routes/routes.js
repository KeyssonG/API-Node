/*exporta o documento de rotas*/
const { productsRoutes } = require("./products");

/*acrescenta o modulo fastify as rotas*/
module.exports = fastify => {
    productsRoutes(fastify);
};