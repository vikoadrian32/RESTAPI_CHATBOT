import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Conversation from './conversation.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare senderType : string

  @column()
  declare message : string 

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(()=>Conversation)
  declare conversations: HasMany<typeof Conversation>
}