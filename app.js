import express from 'express'
import cors from 'cors'
import routes from './routes/aiRoutes.js'
import 'dotenv/config.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', routes)

export default app
