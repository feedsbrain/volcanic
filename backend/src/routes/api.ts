import express from 'express'

import { Routes } from '../lib/types'

const router = express.Router()

router.post('/greeting', (req, res) => {
  res.json({ message: `Hello, ${req.body.name}` })
})

const routes: Routes = { path: '/api', router }

export default routes
