exports.productsRoutes = (fastify) => {
    /*Rota do tipo get para o endpoint products, recebe função com dois parâmetros, a requisição e a resposta.*/
    fastify.get("/products", function (request, reply) {
        /*utilizando o plugin, feito a consulta direto no banco de dados. a função onResult irá retornar erro ou resultado. */
        fastify.mysql.query(
            "SELECT id, name, price FROM products",
            function onResult(error, result) {
                reply.send(error || result);
            }
        );
    });

    /* rota do tipo post para o banco, irá registrar informações*/
    fastify.post("/products", function (request, reply) {
        fastify.mysql.query(
            /* faz a inserção dos valores referenciando as colunas e valores*/
            `INSERT INTO products (id, name, price) VALUES  ('${request.body.id}', '${request.body.name}', '${request.body.price}')`,
            function onResult(error, result) {
                reply.send(error || result);
            }
        );
    });

    /* rota para buscar produtos pelo id. */
    fastify.get("/products/:id", function (request, reply) {
        fastify.mysql.query(
            `SELECT id, name, price FROM products WHERE products.id = ${Number(request.params.id)}`,
            function onResult(error, result) {
                reply.send(error || result);
            }
        );
    });

    /* rota que altera o produto pelo id. */
    fastify.put("/products/:id", function (request, reply) {
        fastify.mysql.query(
            `UPDATE products SET name = '${request.body.name}', price = '${request.body.price}' WHERE products.id = ${Number(request.params.id)}`,
            function onResult(error, result) {
                reply.send(error || result);
            }
        );
    });

    /* rota para apagar */
    fastify.delete("/products/:id", function (request, reply) {
        fastify.mysql.query(
            `DELETE FROM products WHERE products.id = ${Number(request.params.id)}`,
            function onResult(error, result) {
                reply.send(error || result);
            }
        );
    });
}