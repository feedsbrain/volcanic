import express from 'express'
import User from '../../db/models/User'
import { hashPassword } from '../../lib/password'
import { Routes } from '../../lib/types'

import { authenticationMiddleware } from '../authorization'
const { v4: uuidv4 } = require('uuid')

const router = express.Router()

router.get('/:id', authenticationMiddleware(), async (req, res) => {
  const user = await User.query().findById(req.params.id)

  if (!user) {
    res.status(404).json({ message: 'User not found' })
  }
  
  res.json(user)
})

router.get('/', authenticationMiddleware(), async (req, res) => {
  const users = await User.query()
  res.json(users)
})

router.post('/', authenticationMiddleware(), async (req, res) => {
  console.log(req.body)
  // ideally we should have validation here
  const isAdmin = req.body.context.scope.includes('admin')
  const payload = {
    ...req.body,
    id: uuidv4(),
    password: await hashPassword(req.body.password),
    role: isAdmin ? req.body.role : 'user'
  }

  delete payload.context

  const newUser = await User.query().insert(payload)
  res.json(newUser)
})

router.delete('/:id', authenticationMiddleware(['admin']), async (req, res) => {
  // validate user
  const user = await User.query().findById(req.params.id)

  if (!user || user.name === 'admin') {
    res.status(404).json({ message: 'User not found' })
  }

  await User.query().deleteById(req.params.id)
  res.json({ message: 'User deleted' })
})

const routes: Routes = { path: '/api/users', router }

export default routes
