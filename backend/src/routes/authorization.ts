import * as express from 'express'
import * as jwt from 'jsonwebtoken'

import { JWT_PUBLIC_KEY } from '../config'
import { TokenPayload } from '../lib/types'

export const authenticationMiddleware = (requiredRoles: string[] = []) => {
  const checking = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const authorization = req.get('authorization')

    if (!authorization) {
      return res.sendStatus(401)
    }

    const b = authorization.match(/Bearer (.+)/)

    if (!b) {
      return res.sendStatus(401)
    }

    const bearerToken = b[1]

    if (bearerToken) {
      let decoded: any

      try {
        // expiry checking should be done here, but we will just ignore it for now
        decoded = jwt.verify(bearerToken, JWT_PUBLIC_KEY, { complete: true })
      } catch (err) {
        // token is invalid
        return res.sendStatus(401)
      }

      if (!decoded) {
        return res.sendStatus(401)
      }

      const context = decoded.payload as TokenPayload

      if (requiredRoles.length > 0) {
        const roles = context.scope

        let isAllowedRoles = false
        requiredRoles.forEach((role) => {
          isAllowedRoles = isAllowedRoles || roles.includes(role)
        })

        if (!roles.length || !isAllowedRoles) {
          return res.sendStatus(401)
        }
      }

      req.body.context = context
    }

    return next()
  }

  return checking
}
