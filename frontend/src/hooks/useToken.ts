import { useState } from 'react'

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

  return {
    setToken: saveToken,
    token
  }
}
