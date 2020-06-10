
exports.up = async function(knex,Promise) {
    await knex.raw('create extension if not exists "uuid-ossp"')
    return knex.schema.createTable('rooms', table => {
        table.uuid('room_id',).primary().defaultTo(knex.raw('uuid_generate_v4()')),
        table.integer('user_id').unsigned().notNullable(),
        table.text('ip').notNullable().unique(),
        table.text('name', 70).notNullable(),
        table.integer('players').notNullable(),
        table.integer('max_players').notNullable(),
        table.boolean('private').defaultTo(false),
        table.text('password', 20).defaultTo(null),
        table.boolean('started').defaultTo(false),

        table.foreign('user_id').references('user_id').inTable('users')
    })  
};

exports.down = async function(knex) {
    await knex.schema.dropTable('rooms')
    return knex.raw('drop extension if exists "uuid-ossp"')
    
};
