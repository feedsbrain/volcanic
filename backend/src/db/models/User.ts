import BaseModel from './BaseModel'

export default class User extends BaseModel {
  static tableName = 'users'

  name!: string
  email!: string

  // not ideal to put this here but this is only for testing
  password!: string
  role!: string

  static jsonSchema = {
    type: 'object',
    required: ['name', 'email'],

    properties: {
      id: { type: 'uuid' },
      name: { type: 'string', minLength: 1, maxLength: 255 },
      email: { type: 'string', minLength: 1, maxLength: 255 }
    }
  }
}
