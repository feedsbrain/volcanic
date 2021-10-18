import Knex from 'knex'
import { Model } from 'objection'

const knexfile = require('../../knexfile')

// Initialize knex.
const init = () => {
  const knex = Knex(knexfile[process.env.NODE_ENV || 'development'])
  Model.knex(knex)
}

export default {
  init
}
