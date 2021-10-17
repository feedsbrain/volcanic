import express from 'express'
import cors from 'cors'

import { Routes } from './lib/types'
import routeNamespaces from './routes'

const app = express()

app.use(cors())
app.use(express.json({ limit: '1mb' }))

routeNamespaces.forEach((routes: Routes) => {
  app.use(routes.path, routes.router)
})

export default app
