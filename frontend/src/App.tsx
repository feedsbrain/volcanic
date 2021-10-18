// eslint-disable-next-line no-use-before-define
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'

import Login from './components/login/Login'
import Users from './components/users/Users'
import useToken from './hooks/useToken'

const App = () => {
  const { token, setToken } = useToken()

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/users">
            <Users />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
