import * as uuid from 'uuid'

import { TodoAccess } from '../dataLayer/todoAccess.mjs'

const todoAccess = new TodoAccess()

export async function createTodo(createTodoRequest, userId) {
  const itemId = uuid.v4()

  return await todoAccess.createTodo({
    todoId: itemId,
    userId: userId,
    attachmentUrl: null,
    dueDate: null,
    createdAt: new Date().toISOString(),
    name: createTodoRequest.name,
    done: false
  })
}

export async function deleteTodo(todoId, userId) {
  return await todoAccess.deleteTodo(todoId, userId);
}

export async function existTodo(todoId, userId) {
  return await todoAccess.todoExists(todoId, userId);
}


export async function getTodos(userId) {
  return await todoAccess.getTodos(userId);
}

export async function updateTodo(updateTodoRequest) {
  return await todoAccess.updateTodo(updateTodoRequest);
}
