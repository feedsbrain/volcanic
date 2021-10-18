import express from 'express'
import User from '../../db/models/User'
import { Routes } from '../../lib/types'

import { authenticationMiddleware } from '../authorization'

const router = express.Router()

router.get('/', authenticationMiddleware(), async (req, res) => {
  const users = await User.query()
  res.json(users)
})

router.delete('/:id', authenticationMiddleware(['admin']), async (req, res) => {
  await User.query().deleteById(req.params.id)
  res.json({ message: 'User deleted' })
})

const routes: Routes = { path: '/api/users', router }

export default routes