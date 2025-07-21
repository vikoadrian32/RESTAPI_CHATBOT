import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Message from './message.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Conversation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare sessionId : string

  @column()
  declare messageId : number

  @column()
  declare lastMessage : string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(()=>Message)
  declare message: BelongsTo<typeof Message>
}