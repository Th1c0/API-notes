
exports.up = knex => knex.schema.createTable('notes', table => { //criar tabela
    table.increments('id');
    table.text('title');
    table.text('description');
    table.integer('user_id').references('id').inTable('users'); //campo inteiro, fazendo referência a tabela do usuário. Ou seja, precisa de usuário para criar nota
    table.timestamp('create_at').default(knex.fn.now());
    table.timestamp('updated_at').default(knex.fn.now())
});

exports.down = knex => knex.schema.dropTable('notes'); //deletar tabela
