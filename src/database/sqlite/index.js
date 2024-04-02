const sqlite3 = require("sqlite3");//drive que vai estabelecer conecção
const sqlite = require("sqlite"); //responsável por conectar
const path = require("path"); //pacote do node que é para abrir arquivo no windows

async function sqliteConnection(){ //assincrona pq se tiver um banco, ele pega deste, se não, ele cria
    const database = await sqlite.open({ //abrir uma conecção
        filename: path.resolve(__dirname, "..", "database.db"), //propriedade onde o arquivo ficará salvo
        //path vai resolver, pegando de forma automática(dirname) no projeto, '..'= voltar uma pasta,
        driver: sqlite3.Database
    });
    return database;
}

module.exports = sqliteConnection;

//SGDB - sistema gerenciador de banco dados