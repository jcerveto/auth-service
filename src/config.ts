export const PORT = 3000

export const PROD = process.env.PROD === 'true' || false


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

