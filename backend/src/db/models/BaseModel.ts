import { Model } from 'objection'

export default class BaseModel extends Model {
  id!: string
  createdAt!: Date
  updatedAt!: Date

  static idColumn = 'id'

  static jsonSchema = {
    type: 'object',
    required: ['id'],

    properties: {
      id: { type: 'uuid' }
    }
  }
}
