const Fastify = require("fastify");

const fastify = Fastify({
    /* Proriedade que exibe o log da aplicação no terminal. False para desabilitado e true para habilitado.*/
    logger: false,
});


/*Registrando o plugin do mysql */
fastify.register(require("@fastify/mysql"), {
    /*conectando no banco através do usuário, senha, local, porta e nome do banco */
    connectionString: "mysql://root:251299@localhost:3306/sys",
});

/*referencia as rotas com o fastify*/
require("./routes/routes")(fastify);

/* A constante fastify recebe o objeto port com o valor 3000 e a function que possui dois parâmetros, error e address que é o endereço local.*/
fastify.listen({port: 3000}, function(error, address){
    /*Essa condição verifica se existe um erro, caso exista, exibe o erro e encerra o processo.*/
    if(error) {
        console.log(error)
        process.exit(1)
    }
    console.log("Servidor rodando:", address);
})