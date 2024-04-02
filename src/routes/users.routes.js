//No método GET a rota para acesso é "/message" (raiz da nossa API), terá duas funções
//app.get('/message/:id/:user/:name', (request, response) => { //:id/:user = route params
//    const {id, user} = request.params; //desestruturação
//Params são utilizados para coisas simples, como ID de produtos
//    response.send(`
//    mensagem pelo ID: ${id}.
//    mensagem para o usuário: ${user}.
//    `)
//});

// app.get('/users', (request, response) => { //params(parâmetros) da rota são opcionais
//     const {page, limit} = request.query;

//     response.send (`página: ${page}. mostrar: ${limit}`)
// }); //http://localhost:3333/users?page=2&limit=10

const { Router } = require("express");

const UsersControllers = require("../controllers/user.controllers"); //por ser uma class, precisso de espaço em memória para ele

const usersRoutes = Router();

// function myMiddleware (request, response, next) { next vai dizer para onde o Middleware deve seguir
//     console.log("você passou pelo Middleware")
    
//     if (!request.body.isAdmin){
//         return response.json({message: "user unauthorized"})
//     }

//     next();
// }

const usersControllers = new UsersControllers();

usersRoutes.post ('/', usersControllers.create);

usersRoutes.put ('/:id', usersControllers.update);

module.exports = usersRoutes; //expotando o arquico para quem quiser utilizar