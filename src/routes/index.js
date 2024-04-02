//Rotas da aplicação

const { Router } = require("express");

const usersRoutes = require("./users.routes")
const notesRoutes = require("./notes.routes");

const routes = Router();
routes.use("/users", usersRoutes); //Sempre que alguém acessar /users -> userRoutes
routes.use("/notes", notesRoutes);

module.exports = routes;