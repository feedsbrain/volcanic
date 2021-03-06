const { v4: uuidv4 } = require('uuid')
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
          id: uuidv4(),
          name: 'admin',
          email: 'admin@voltest.com',
          password: await hashPassword('admin!123'),
          role: 'admin'
        },
        {
          id: uuidv4(),
          name: 'user',
          email: 'user@voltest.com',
          password: await hashPassword('user!123'),
          role: 'user'
        }
      ])
    })
}
