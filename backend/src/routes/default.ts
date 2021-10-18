import express from 'express'
import { Routes } from '../lib/types'

const router = express.Router()

router.get('/', (req: express.Request, res: express.Response): void => {
  res.json({
    status: 'OK'
  })
})

const routes: Routes = { path: '/', router }

export default routes
