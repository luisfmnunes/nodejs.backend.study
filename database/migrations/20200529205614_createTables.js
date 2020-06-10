
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments('user_id').unsigned().primary();
        table.text('username', 20).notNullable().unique()
        table.text('email', 255).notNullable().unique()
        table.text('password').notNullable()
        table.boolean('banned').defaultTo(false)
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
        table.timestamp('last_login').defaultTo(null)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
};
