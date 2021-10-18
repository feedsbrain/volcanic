// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import { Form, Input, Button, Row, Col, Card, Alert } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import './Login.css'
import { API_URL } from '../../config'

type LoginProps = {
  setToken: Function
}

const Login = ({ setToken }: LoginProps) => {
  const [error, setError] = useState<string | undefined>(undefined)

  const onFinish = async (values: any) => {
    console.log('Success:', values)

    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })

    if (res.status === 200) {
      setError(undefined)
      setToken(await res.json())
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="login-wrapper">
      <Row>
        <Col span={6} offset={9}>
          <Card bordered={false} style={{ paddingTop: 40 }}>
            <Alert
              message={error}
              type="error"
              style={{
                marginBottom: '20px',
                textAlign: 'center',
                display: error ? 'block' : 'none'
              }}
            />
            <Form
              name="login"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="E-Mail"
                name="email"
                rules={[
                  { required: true, message: 'Please input your e-mail!' },
                  { type: 'email', message: 'The input is not valid E-mail!' }
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="E-Mail"
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Login
