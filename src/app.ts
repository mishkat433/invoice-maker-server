import express from 'express'
const app = express();
import cors from "cors";

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Server is running')
})

export default app