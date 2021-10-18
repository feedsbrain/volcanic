import BaseModel from './BaseModel'

export default class User extends BaseModel {
  static tableName = 'users'

  name!: string
  email!: string

  // not ideal to put this here but this is only for testing
  password!: string
  role!: string

  static jsonSchema = {
    ...super.jsonSchema,
    type: 'object',
    required: super.jsonSchema.required.concat([
      'name',
      'email',
      'password',
      'role'
    ]),

    properties: {
      ...super.jsonSchema.properties,
      name: { type: 'string', minLength: 1, maxLength: 255 },
      email: { type: 'string', minLength: 1, maxLength: 255 }
    }
  }

  $formatJson = (json: any) => {
    json = super.$formatJson(json)
    delete json.password
    return json
  }
}
