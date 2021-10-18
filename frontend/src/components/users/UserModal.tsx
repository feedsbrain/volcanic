// eslint-disable-next-line no-use-before-define
import React, { FC } from 'react'

import { Modal, Form, Input, Checkbox } from 'antd'
import useToken from '../../hooks/useToken'

interface UserModalProps {
  visible: boolean
  onSubmit: (values: any) => void
  onCancel: () => void
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 }
}

const UserModal: FC<UserModalProps> = (props: UserModalProps) => {
  const { isAdmin } = useToken()
  const [form] = Form.useForm()
  const { visible, onCancel, onSubmit } = props

  const handleSubmit = () => {
    if (!form) return
    form.submit()
  }

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values)
      form.resetFields()
    }
  }

  const modalFooter = { okText: 'OK', onOk: handleSubmit, onCancel }

  const getModalContent = () => {
    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter name' }]}
        >
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-Mail"
          rules={[{ required: true, message: 'Please enter e-mail' }]}
        >
          <Input placeholder="E-Mail" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter password' }]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="admin"
          valuePropName="checked"
          label="Is Admin"
          style={{ display: isAdmin() ? 'flex' : 'none' }}
        >
          <Checkbox />
        </Form.Item>
      </Form>
    )
  }

  return (
    <Modal title="Add User" destroyOnClose visible={visible} {...modalFooter}>
      {getModalContent()}
    </Modal>
  )
}

export default UserModal
