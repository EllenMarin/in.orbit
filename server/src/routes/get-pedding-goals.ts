import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekPendingGoals } from '../function/get-week-pending-goals'

export const getPendingGoalsRoute: FastifyPluginAsyncZod = async app => {
  app.get('/pedding-goals', async () => {
    const { pedingGoals } = await getWeekPendingGoals()
    return {
      pedingGoals,
    }
  })
}
