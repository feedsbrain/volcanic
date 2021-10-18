// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import './Login.css'

type LoginProps = {
  setToken: Function
}

const loginUser = async (credentials: { email: string; password: string }) => {
  return fetch('http://localhost:3001/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then((data) => data.json())
}

const Login = ({ setToken }: LoginProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const res = await loginUser({
      email,
      password
    })
    setToken(res)
  }

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>E-mail</p>
          <input type="text" onChange={(e: any) => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e: any) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Login
