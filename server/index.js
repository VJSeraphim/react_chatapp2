const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000

const authRoutes = require('./routes/auth.js')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.get('/', (req, res) => {
    res.send('Hi?')
})

app.listen(PORT, () => {
    console.log(`Server is Running on port NO. ${PORT}`)
})

app.use('/auth', authRoutes)