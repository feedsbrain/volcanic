// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react'
// eslint-disable-next-line no-use-before-define
import { Table, Button, Space, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import useToken from '../../hooks/useToken'
import UserModal from './UserModal'

const Users = () => {
  const { token, isAdmin } = useToken()
  const [users, setUsers] = useState([])
  const [userModalVisible, setUserModalVisible] = useState(false)

  const fetchUsers = async () => {
    return fetch('http://localhost:3001/api/users', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((data) => data.json())
  }

  const refetchUsers = async () => {
    const newData = await fetchUsers()
    setUsers(newData)
  }

  const addUser = async (userData: {
    name: string
    email: string
    password: string
    role: string
  }) => {
    return fetch('http://localhost:3001/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    }).then((data) => data.json())
  }

  const deleteuser = (record: { id: string; name: string }) => {
    console.log(`Deleting ID: ${record.id}`)
    Modal.confirm({
      title: 'Delete User',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete user: ${record.name} ?`,
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        return fetch(`http://localhost:3001/api/users/${record.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(async () => {
          await refetchUsers()
        })
      }
    })
  }

  useEffect(() => {
    if (token) {
      refetchUsers()
    }
  }, [token])

  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'E-Mail',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role'
    }
  ]

  const createUser = (e: any) => {
    e.preventDefault()
    setUserModalVisible(true)
  }

  const onCancel = () => {
    setUserModalVisible(false)
  }

  const onSubmit = async (value: any) => {
    console.log(value)
    const userData = {
      ...value,
      role: value.admin ? 'admin' : 'user'
    }
    await addUser(userData).then(async () => {
      const newData = await fetchUsers()
      setUsers(newData)
    })
    setUserModalVisible(false)
  }

  if (isAdmin()) {
    columns.push({
      title: 'Action',
      key: 'action',
      // eslint-disable-next-line react/display-name
      render: (text: any, record: any) => {
        if (record.name === 'admin') {
          return <Space />
        }

        return (
          <Space size="middle">
            <a
              onClick={(e) => {
                e.preventDefault()
                deleteuser(record)
              }}
            >
              Delete
            </a>
          </Space>
        )
      }
    })
  }

  return (
    <>
      <Button onClick={createUser} style={{ marginBottom: '20px' }}>
        Create User
      </Button>
      <Table dataSource={users} columns={columns} />
      <UserModal
        visible={userModalVisible}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </>
  )
}

export default Users
