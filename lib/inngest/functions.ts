import { inngest } from './client'
import { supabase } from '../supabase'

export const helloWorld = inngest.createFunction(
  { id: 'hello-world' },
  { event: 'test/hello.world' },
  async ({ event, step }) => {
    await step.sleep('wait-a-moment', '1s')
    return { message: `Hello ${event.data.email}!` }
  },
)

export const llmModel = inngest.createFunction(
  { id: 'llm-model' },
  { event: 'perplexity/llm-model' },
  async ({ event, step }) => {
    try {
      const aiResponse = await step.ai.infer('generate-ai-llm-model-call', {
        model: step.ai.models.gemini({
          model: 'gemini-2.0-flash',
          apiKey: process.env.GEMINI_API_KEY!,
        }),

        body: {
          contents: [
            {
              role: 'model',
              parts: [
                {
                  text: `
                  Based on the user's input sources, summarize and search about the topic.
                  Return the answer in markdown format.
                  The question is: ${event.data.question}
                `,
                },
              ],
            },
            {
              role: 'user',
              parts: [
                {
                  text: JSON.stringify(event.data.sources),
                },
              ],
            },
          ],
        },
      })

      await step.run('save-to-db', async () => {
        try {
          await supabase
            .from('Chats')
            .update({
              ai_response:
                // @ts-expect-error text type
                aiResponse?.candidates?.[0]?.content?.parts?.[0]?.text,
            })
            .eq('id', event.data.record)
            .select()
        } catch (e) {
          console.log(e)
          return { message: `Error: ${e}` }
        }

        return aiResponse
      }) // return aiResponse
    } catch (e) {
      console.log(e)
      return { message: `Error: ${e}` }
    }
  },
)
