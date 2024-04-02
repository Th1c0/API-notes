exports.up = knex => knex.schema.createTable('links', table => { //criar tabela
    table.increments('id');
    table.text('url').notNullable();

    table.integer('note_id').references('id').inTable('notes').onDelete("CASCADE");

    table.timestamp('create_at').default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable('links'); //deletar tabela

