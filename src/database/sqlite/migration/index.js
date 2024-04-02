const sqliteConnection = require ('../../sqlite');
const createUsers = require ('./createusers');

async function migrationsRun (){
    const schemas = [createUsers].join(''); 
    //schemas são as tabelas e o [] = vetores, as migrations
    //estamos pegando as migration e juntando (join) com "nada" - para dar espaço entre elas
    sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.error(error));
}

module.exports = migrationsRun;