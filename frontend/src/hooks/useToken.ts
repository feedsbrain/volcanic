import { useState } from 'react'
import jwt from 'jsonwebtoken'

export default () => {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('u') || '{}'
    const userToken = JSON.parse(tokenString)
    return userToken?.token
  }

  const [token, setToken] = useState(getToken())

  const saveToken = (userToken: { token: string }) => {
    sessionStorage.setItem('u', JSON.stringify(userToken))
    setToken(userToken.token)
  }

  // simple admin checking for ui
  // api will actually validate the token
  const isAdmin = () => {
    if (token) {
      const decoded: any = jwt.decode(token)
      return decoded?.scope.includes('admin')
    }
    return false
  }

  return {
    isAdmin,
    setToken: saveToken,
    token
  }
}
