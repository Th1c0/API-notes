
exports.up = knex => knex.schema.createTable('tags', table => { //criar tabela
    table.increments('id');
    table.text('name').notNullable();

    table.integer('note_id').references('id').inTable('notes').onDelete("CASCADE"); //vinculos com notas e ao deletar a nota, deleta as tags
    table.integer('user_id').references('id').inTable('users');


});

exports.down = knex => knex.schema.dropTable('tags'); //deletar tabela
