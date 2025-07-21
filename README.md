Proyek ini adalah REST API sederhana yang dibangun menggunakan AdonisJS versi 5 dan PostgreSQL.
Fungsinya untuk:
  1.Mengirimkan pertanyaan ke API eksternal chatbot
  2.Menyimpan pertanyaan dan jawaban ke dalam database
  3.Mengambil, menampilkan, dan menghapus riwayat percakapan

Endpoint : 
  1. POST /questions (untuk mengirim pertanyaan )
     Contoh  : {
                  "question": "Halo, siapa kamu?",
                  "session_id": "optional-uuid"
               }
  2. GET /getconversations (untuk mendapatkan semua percakapan )
  3. GET /getconversation/:id ( untuk mendapatkan percakapan berdasarakan session id )
  4. DELETE /deleteconversation/:id (untuk menghapus percakapan berdasarkan session id)

Teknologi yang Digunakan : 
1.AdonisJS 5
2.PostgreSQL
3.Axios (Untuk API ekster


Struktur Database (Migrasi)
  Table conversations
    id — Primary Key
    session_id — VARCHAR
    message_id — Foreign Key (ke messages)
    last_message — Text

  Table messages
    id — Primary Key
    sender_type — VARCHAR 
    message — Text


API External yang digunakan : https://api.majadigidev.jatimprov.go.id/api/external/chatbot/send-message



