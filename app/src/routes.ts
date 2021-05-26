import Todo from './entities/Todo'
import { Router } from 'express'

const router = Router()

router.get('/', async (_, res) => {
  const todos = await Todo.find()

  res.send(todos)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const todo = await Todo.findOne(id)

  res.send(todo)
})

router.post('/', async (req, res) => {
  const newTodo = Todo.create(req.body)
  const todo = await Todo.save(newTodo)
  res.send(todo)
})

router.put('/:id', async (req, res) => {
  const { id } = req.params

  const todo = await Todo.findOne(id)

  if (!todo) {
    return res.status(404).send({ error: 'Todo not found' })
  }

  Object.assign(todo, req.body)

  await todo?.save()

  res.send(todo)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const todo = await Todo.findOne(id)
    await todo!.remove()

    res.send({ message: 'Todo has been deleted' })
  } catch (error) {
    res.status(404).send({ error: 'Todo not found' })
  }
})

export default router
