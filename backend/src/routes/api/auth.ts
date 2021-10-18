import jwt from 'jsonwebtoken'
import express from 'express'

import User from '../../db/models/User'
import { verifyPassword } from '../../lib/password'
import { Routes, TokenPayload } from '../../lib/types'

import { JWT_PRIVATE_KEY } from '../../config'

const router = express.Router()

router.post('/login', async (req, res) => {
  // ideally we use class validator to validate the request body
  const { email, password } = req.body
  if (!email || !password || !email.length || !password.length) {
    return res.status(400).json({
      error: 'Please provide email and password'
    })
  }

  const user = await User.query().findOne({ email })
  if (!user) {
    return res.status(401).json({ result: 'unautorized' })
  }

  const verified = await verifyPassword(password, user.password)

  if (!verified) {
    return res.status(401).json({ result: 'unautorized' })
  }

  const payload: TokenPayload = {
    sub: user.id,
    name: user.name,
    email: user.email,
    scope: [user.role]
  }

  const token = jwt.sign(payload, JWT_PRIVATE_KEY, {
    algorithm: 'RS256',
    expiresIn: '1d'
  })
  return res.json({ token })
})

const routes: Routes = { path: '/api/auth', router }

export default routes
