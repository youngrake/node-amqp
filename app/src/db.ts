import { createConnection } from 'typeorm'

import Todo from './entities/Todo'

const createDbConnection = () =>
  createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Todo],
    synchronize: true
  })

export default createDbConnection
