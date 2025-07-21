/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import ChatsController from '../app/controllers/chats_controller.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})



router.get('/getconversations',[ChatsController,'getConversations'])

router.get('/getconversation/:id',[ChatsController,'getBySession'])

router.post('/questions', [ChatsController,'sendQuestion'])

router.delete('/deleteconversation/:id',[ChatsController,'deleteConversation'])

router.delete('/deletemessage/:id',[ChatsController,'deleteMessage'])