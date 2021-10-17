import 'dotenv/config'

import development from './development'
import production from './production'
import staging from './staging'

export interface Config {
  port: number
  db: {
    client: 'pg'
    connection: {
      host: string
      port: number
      user: string
      password: string
      database: string
    }
  }
}

export const NODE_ENV = process.env.NODE_ENV || 'development'

const getConfig = (): Config => {
  switch (NODE_ENV) {
    case 'production': {
      return production
    }
    case 'staging': {
      return staging
    }
    case 'development': {
      return development
    }
    default: {
      return development
    }
  }
}

export default getConfig()
