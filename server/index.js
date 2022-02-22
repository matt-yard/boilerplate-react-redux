const app = require('./app')
const PORT = process.env.PORT || 8080

const init = async () => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
}

init()
