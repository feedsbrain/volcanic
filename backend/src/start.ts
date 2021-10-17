import app from './server'
import config from './config'

const start = async (): Promise<void> => {
  app.listen(config.port, () => {
    console.debug(`Listening on port: http://localhost:${config.port}`)
  })
}

start().catch((err) => {
  console.error('Server failed to start', err)
})
