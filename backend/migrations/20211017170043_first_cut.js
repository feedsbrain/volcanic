exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.uuid('id').primary()
    table.string('name', 255).notNullable()
    table.string('email', 100).unique().notNullable()
    table.string('password', 255).notNullable()
    table.string('role', 50).notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
