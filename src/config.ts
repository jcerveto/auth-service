export const PORT = 3000

export const PROD = process.env.PROD === 'true' || false

export const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY || 'do-not-put-here-your-secret-key'

// Only the domains listed in the whiteList will be allowed to make requests to the server
// If empty, all domains are allowed
const whiteList: any[] = [
]


const availableMethods: string[] = [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
]

export const corsOptions = {
    origin: whiteList,
    methods: availableMethods,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization'],
}

