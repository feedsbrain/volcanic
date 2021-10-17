import Knex from 'knex'
import { Model } from 'objection'

import config from '../config'

// Initialize knex.
const knex = Knex(config.db)
Model.knex(knex)
