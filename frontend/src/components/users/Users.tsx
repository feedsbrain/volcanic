// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react'
// eslint-disable-next-line no-use-before-define
import { Table, Button, Space, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import useToken from '../../hooks/useToken'

const Users = () => {
  const { token, isAdmin } = useToken()
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    return fetch('http://localhost:3001/api/users', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
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
          const newData = await fetchUsers()
          setUsers(newData)
        })
      }
    })
  }

  useEffect(() => {
    if (token) {
      fetchUsers().then((data) => setUsers(data))
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
      <Button onClick={() => {}} style={{ marginBottom: '20px' }}>
        Create User
      </Button>
      <Table dataSource={users} columns={columns} />;
    </>
  )
}

export default Users
