import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import { createConnection } from 'typeorm'

import router from './routes'

const connectToDatabase = async () => {
  await createConnection()
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
