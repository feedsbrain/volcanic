import express from 'express'
import User from '../../db/models/User'
import { Routes } from '../../lib/types'

const router = express.Router()

router.get('/', async (req, res) => {
  const users = await User.query()
  res.json(users)
})

const routes: Routes = { path: '/api/users', router }

export default routes
