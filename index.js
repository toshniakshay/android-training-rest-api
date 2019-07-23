const users = require('./routes/users')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

app.use('/users', users)
const PORT = process.env.PORT | 3002
app.listen(PORT, () => {
    console.log(`Listening on port number ${PORT}`)
}
)