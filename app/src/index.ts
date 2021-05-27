import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import createDbConnection from './db'

import router from './routes'

dotenv.config()

const connectToDatabase = async () => {
  try {
    await createDbConnection()
  } catch (e) {
    console.error(e)
  }
}

const initExpress = () => {
  const app = express()

  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use('/todos', router)

  app.listen(8000, () => {
    console.log('Server started at port 8000')
  })
}

const initApp = async () => {
  await connectToDatabase()
  initExpress()
}

initApp()
