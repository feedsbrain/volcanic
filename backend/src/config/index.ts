import 'dotenv/config'

import fs from 'fs'
import development from './development'
import production from './production'
import staging from './staging'

export interface Config {
  port: number
}

export const NODE_ENV = process.env.NODE_ENV || 'development'

// not ideal put private key here, for testing only
export const JWT_PRIVATE_KEY = fs.readFileSync('jwtRS256.key')
export const JWT_PUBLIC_KEY = fs.readFileSync('jwtRS256.key.pub')

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
