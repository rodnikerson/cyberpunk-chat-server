import { generateEmbeddings, generateCompletions } from '../models/aiModel.js'

export async function generateAnswerController(req, res) {
  try {
    const { messages } = req.body

    const input = messages[messages.length - 1].content

    const chunks = await generateEmbeddings(input)
    const dialogue = await generateCompletions(chunks, messages)
    res.json(dialogue)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
