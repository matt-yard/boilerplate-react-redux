const {db, models: {User}} = require('../server/db')

const seed = async () => {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({username: 'matt321', password: '12345'}),
    User.create({username: 'bob1123', password: '12345'})
  ])

  console.log(`seeded ${users.length} users`)
  console.log('seeding successful')

  return {
    users: {
      matt321: users[0],
      bob1123: users[1]
    }
  }
}

const runSeed = async () => {
  console.log('seeding...')
  try {
    await seed()
  } catch(err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

runSeed()
