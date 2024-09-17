import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { createGoalCompletion } from '../function/create-goals-completion'

export const createCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/completions',
    {
      schema: {
        body: z.object({
          goalId: z.string(),
          createdAt: z.string().nullable(),
        }),
      },
    },
    async request => {
      const { goalId, createdAt } = request.body

      await createGoalCompletion({
        goalId,
        createdAt: createdAt ? new Date(createdAt) : null,
      })
    }
  )
}
