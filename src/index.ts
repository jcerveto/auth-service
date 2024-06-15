import express from 'express'

const app = express()
app.use(express.json())

const PORT = 3000

app.get('/ping', (_, res) => {
    console.log('ping request received')
    res.send('pong')
})

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}!`)
})
