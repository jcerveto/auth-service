import { app } from "./server"
import { PORT } from "./config"

app.listen(PORT, () => {
    console.log('Server is running on port 3000')
})

