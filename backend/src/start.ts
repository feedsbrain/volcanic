import app from './server'
import config from './config'
import db from './db'

const start = async (): Promise<void> => {
  db.init()
  app.listen(config.port, () => {
    console.debug(`Listening on port: http://localhost:${config.port}`)
  })
}

start().catch((err) => {
  console.error('Server failed to start', err)
})
