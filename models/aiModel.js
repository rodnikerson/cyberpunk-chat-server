import supabase from '../config/supabase.js'
import openai from '../config/openai.js'
import 'dotenv/config.js'

export async function generateEmbeddings(input) {
  const embedding = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input,
  })

  const { data, usage } = embedding
  const query_embedding = data[0].embedding

  const { data: chunks, error } = await supabase.rpc(process.env.DB_FUNCTION, {
    query_embedding,
    match_threshold: 0.25,
    match_count: 5,
  })

  if (error) throw error

  return chunks
}

function formattedContext(chunks) {
  return chunks.map((chunk) => chunk.content).join(' --- ')
}

export async function generateCompletions(chunks, messages) {
  const newContent = formattedContext(chunks)
  const prompt = `${process.env.PROMPT_ENVELOP}\nContext Sections:\n${newContent}`
  messages.unshift({ role: 'system', content: prompt })

  const completion = await openai.chat.completions.create({
    messages,
    model: 'gpt-4o-mini',
  })

  return completion.choices[0].message.content
}
