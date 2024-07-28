import express from 'express'
import { generateAnswerController } from '../controllers/aiController.js'

const router = express.Router()

router.post('/generate-answer', generateAnswerController)

export default router
