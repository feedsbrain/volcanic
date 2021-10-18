import { Config } from './index'

const config: Config = {
  port: parseInt(process.env.PORT || '80')
}

export default config
