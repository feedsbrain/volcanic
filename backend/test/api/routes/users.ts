import test from 'ava'
import { v4 as uuidv4 } from 'uuid'
import request from 'supertest'

import db from '../../../src/db'
import app from '../../../src/server'
import User from '../../../src/db/models/User'

import { hashPassword } from '../../../src/lib/password'

test.before((t) => {
  db.init()
})

test.before(async (t) => {
  const user = await User.query().insert({
    id: uuidv4(),
    name: 'Test User',
    email: 'user@testuser.com',
    password: await hashPassword('test'),
    role: 'user'
  })

  t.true(user.id !== null)
})

test.after.always(async (t) => {
  await User.query().delete().where('email', 'user@testuser.com')
})

test.serial('get /users', async (t) => {
  const authRes = await request(app)
    .post('/api/auth/login')
    .send({ email: 'user@testuser.com', password: 'test' })

  const res = await request(app)
    .get('/api/users')
    .set('Authorization', `Bearer ${authRes.body.token}`)

  t.is(res.status, 200)
  t.true(Array.isArray(res.body) && res.body.length > 0)
})

test.serial('get /user/:id', async (t) => {
  const authRes = await request(app)
    .post('/api/auth/login')
    .send({ email: 'user@testuser.com', password: 'test' })

  const usersRes = await request(app)
    .get('/api/users')
    .set('Authorization', `Bearer ${authRes.body.token}`)
  
  // pick one user, not ideal we should store created test user in user context
  const user = usersRes.body[0]
  
  const res = await request(app)
    .get(`/api/users/${user.id}`)
    .set('Authorization', `Bearer ${authRes.body.token}`)

  t.is(res.status, 200)
  t.true(res.body.id === user.id)
})
