import OpenAI from 'openai'
import 'dotenv/config.js'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export default openai
