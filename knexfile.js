const patch = require('path');

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
    filename: patch.resolve(__dirname, 'src', 'database', 'database.db')
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_key = ON", cb)
      //conn=conection/cb=callback - após criar, execute a função de comando de CASCATA (desabilitado por natureza)
    },
    migrations: {
      directory: patch.resolve(__dirname, 'src', 'database', 'knex', 'migration')
    },
    useNullAsDefault: true
  }
};
