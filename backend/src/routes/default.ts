import express from 'express'

import { version } from '../../package.json'
import { Routes } from '../lib/types'
import { ok } from '../services/healthCheck'

const router = express.Router()

const defaultResponses = (
  req: express.Request,
  res: express.Response
): void => {
  res.json(ok())
}

router.get('/', defaultResponses)

router.get('/version', (req, res) => {
  res.json(version)
})

const routes: Routes = { path: '/', router }

export default routes
