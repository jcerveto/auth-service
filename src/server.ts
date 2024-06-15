import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'

import { UserRepository } from './controllers/userRepository'
import { corsOptions, SECRET_JWT_KEY } from './config'


export const app = express()
app.use(express.json())

app.use(cors(corsOptions))


app.get('/ping', (_, res) => {
    console.log('ping request received')
    res.send('pong')
})


app.get('/', (_, res) => {
    res.send('Hello World!')
})


app.post('/login', async (req, res) => {
    try {
        console.log('login request received')
        const { username, password } = req.body

        const user = await UserRepository.login(username, password)
        const token = jwt.sign({
                email: 'a@a.a',
                username: user.username
            },
            SECRET_JWT_KEY,
            { 
                expiresIn: '1h' 
            }
        )


        res.send({
            token: token,
            name: user.username
        })
    } catch (error) {
        console.error(error)
    res.status(500).send('Internal Server Error')
    }

})

app.post('/signup', (_req, _res) => {})
app.post('/logout', (_req, _res) => {})
app.post('verify', (_req, _res) => {})
app.post('/reset', (_req, _res) => {})
app.post('private', (_req, _res) => {})
