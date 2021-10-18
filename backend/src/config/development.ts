import { Config } from './index'

const config: Config = {
  port: parseInt(process.env.PORT || '3000')
}

export default config
