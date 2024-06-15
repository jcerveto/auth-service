import express from 'express'
import cors from 'cors'

import { PORT, corsOptions } from './config'


const app = express()
app.use(express.json())

app.use(cors(corsOptions))


app.get('/ping', (_, res) => {
    console.log('ping request received')
    res.send('pong')
})


app.get('/', (_, res) => {
    res.send('Hello World!')
})


app.post('/login', (_req, _res) => {})
app.post('/signup', (_req, _res) => {})
app.post('/logout', (_req, _res) => {})
app.post('verify', (_req, _res) => {})
app.post('/reset', (_req, _res) => {})
app.post('private', (_req, _res) => {})



app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}!`)
})
