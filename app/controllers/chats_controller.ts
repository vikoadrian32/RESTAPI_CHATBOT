import type { HttpContext } from '@adonisjs/core/http'
import Message from '#models/message'
import Conversation from '#models/conversation'
import axios from 'axios'
import {v4 as uuidv4} from 'uuid'
import HttpExceptionHandler from '../exceptions/handler.js'
import { request } from 'http'
export default class ChatbotController {

  async sendQuestion({request,response}:HttpContext){
      try {
        // mengambil pertanyaan dan session id  dari request
        const {question,session_id} = request.only(['question','session_id'])
        const sessionID = session_id||uuidv4()

        if(!question || !session_id){
          response.status(400).json({
            status : false,
            message : "Question and Session Is empty"
          })
        }
        
        // Menyimpan Pertanyaan dan Sender_type user
        const userQuestion = await Message.create({
          senderType:"user",
          message : question
        })

        
        const externalAPIResponse = await axios.post('https://api.majadigidev.jatimprov.go.id/api/external/chatbot/send-message',{
          question : question,
          session_id : sessionID
        })

        const replyMessages = externalAPIResponse.data.data.message
        const botReply = replyMessages.length > 0 ? replyMessages[0].text : 'No response'
        // Menyimpan Jawaban dan Sender_type bot
        const botMessage = await Message.create({
          senderType: "bot",
          message: botReply
        })

        const conversation = await Conversation.create({
          sessionId: sessionID,
          messageId: userQuestion.id,
          lastMessage: botReply
        })

        return response.ok({
          status: true,
          message: "Chat successfully sent",
          data: {
            user_question: userQuestion.message,
            bot_answer: botMessage.message
          }
        })

      } catch (error) {
        console.log(error)
        return response.status(500).json({
          status: false,
          message: "Internal Server Error"
        })
      }
  }

  async getConversations({request,response}:HttpContext){
    const allConversations = await Message.query().preload('conversations',(query) =>{
      query.select('session_id','last_message','message_id')
    }).select('id','message')

    
    const result = allConversations.flatMap((msg) => 
    msg.conversations.map((conv) => ({
      user_chat: msg.message,
      session_id: conv.sessionId,
      bot_response: conv.lastMessage
    }))
    )

    return response.ok({
    status: 'success',
    data: result
    })
  }

  async getBySession({response,params}:HttpContext){
    try {
      const conversations = await Conversation
      .query()
      .where('session_id', params.id)
      .preload('message', (query) => {
        query.select('id', 'message')
      })
      .select('id', 'session_id', 'last_message', 'message_id')

      const result = conversations.map((conv) => ({
        user_chat: conv.message?.message,
        session_id: conv.sessionId,
        bot_response: conv.lastMessage
      })) 

      return response.ok({
        status:'success',
        data : result
      })
    } catch (error) {
      console.log(error)
    }
  }

  async deleteConversation({response,params}:HttpContext){
      try {
        const deleted = await Conversation.query().where('session_id', params.id).delete()

        if (deleted === 0) {
          return response.notFound({ message: 'Conversation not found' })
        }
        return response.ok({ message: 'Conversation deleted successfully' })

      } catch (error) {
        console.error(error)
        return response.status(500).json({ message: 'Internal Server Error' })
      }
  }

  async deleteMessage({ params, response }: HttpContext) {
  try {
    const message = await Message.find(params.id)
    if (!message) {
      return response.notFound({ message: 'Message not found' })
    }

    await message.delete()

    return response.ok({ message: 'Message deleted successfully' })

  } catch (error) {
    console.log(error)
    return response.status(500).json({ message: 'Internal Server Error' })
  }
}




}

