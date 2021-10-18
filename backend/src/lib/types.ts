import { Router } from 'express'

export interface Routes {
  path: string
  router: Router
}

export interface TokenPayload {
  sub: string
  name: string
  email: string
  scope: string[]
  iat?: number
  exp?: number
}
