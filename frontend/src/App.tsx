// eslint-disable-next-line no-use-before-define
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Layout, Menu } from 'antd'

import './App.css'

import Login from './components/login/Login'
import Users from './components/users/Users'
import useToken from './hooks/useToken'

const { Header, Content, Footer } = Layout

const App = () => {
  const { token, setToken } = useToken()

  if (!token) {
    return <Login setToken={setToken} />
  }

  const logout = () => {
    setToken({ token: '' })
  }

  return (
    <div className="wrapper">
      <Layout className="layout">
        <Header>
          <div className="logo">
            <h2>VolTest</h2>
          </div>
          <Menu theme="dark" mode="horizontal" selectedKeys={['users']}>
            <Menu.Item key="users">Users</Menu.Item>
            <Menu.Item key="logout" onClick={logout}>
              Logout
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <BrowserRouter>
              <Switch>
                <Route path="/">
                  <Users />
                </Route>
              </Switch>
            </BrowserRouter>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </div>
  )
}

export default App
