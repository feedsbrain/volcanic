const bcrypt = require('bcrypt')

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt()
  return await bcrypt.hash(password, salt)
}

exports.seed = (knex) => {
  return knex('users')
    .del()
    .then(async () => {
      return knex('users').insert([
        {
          id: 'admin',
          name: 'admin',
          email: 'admin@voltest.com',
          password: await hashPassword('admin'),
          role: 'admin'
        }
      ])
    })
}
