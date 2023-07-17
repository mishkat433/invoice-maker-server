import express, { Application, Request } from 'express'
const app: Application = express();
import cors from "cors";

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res) => {
    res.send('Server is running')
})

export default app