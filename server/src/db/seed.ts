import { client, db } from '.'
import { goalCompletions, goals } from './schema'
import dayjs from 'dayjs'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const result = await db
    .insert(goals)
    .values([
      {
        title: 'Read 10 pages of a book',
        desiredWeeklyFrequency: 1,
      },
      {
        title: 'Go for a 30 minute walk',
        desiredWeeklyFrequency: 3,
      },
      {
        title: 'Drink 8 glasses of water',
        desiredWeeklyFrequency: 7,
      },
      {
        title: 'Practice a new skill for 30 minutes',
        desiredWeeklyFrequency: 2,
      },
      {
        title: 'Meditate for 10 minutes',
        desiredWeeklyFrequency: 5,
      },
    ])
    .returning()

  const startWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    {
      goalId: result[0].id,
      createdAt: startWeek.toDate(),
    },
    {
      goalId: result[1].id,
      createdAt: startWeek.add(1, 'day').toDate(),
    },
    {
      goalId: result[2].id,
    },
    {
      goalId: result[3].id,
    },
  ])
}

seed().finally(() => {
  client.end()
})
