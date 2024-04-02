require("express-async-errors")

const migrationsRun = require('./database/sqlite/migration')

const AppError = require("./utils/appError")
const express = require('express'); //importação do express

const routes = require('./routes') //Como padrão ele irá carregar primeiro o index.js
migrationsRun();

const app = express(); //incializando o express para utilizar ele, por isso o ()

app.use(express.json()); //No Insomnia eu coloquei em padrão JSON, então preciso utilizar JSON aqui

app.use(routes);

app.use((error, request, response, next) => { //Ele vai checar erro, fazer uma requisição, dar uma resposta e precise avançar para algum lugar, porém é um erro e não irá avançar (isso é padrão)
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status:"error",
            message: error.message
        })
    }

    console.error(error);

        return response.status(500).json({
            status: "error",
            message: "Internal server error"
        })
})

const PORT = 3333; //endereço da porta a qual a API irá ficar esperando requisições
app.listen(PORT, () => console.log(`server is running on Port ${PORT}`))
//escute na PORT, quando a aplicação iniciar execute a msg

