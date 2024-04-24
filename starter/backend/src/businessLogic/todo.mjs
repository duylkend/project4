import * as uuid from 'uuid'

import { TodoAccess } from '../dataLayer/todoAccess.mjs'

const todoAccess = new TodoAccess()

export async function createTodo(createTodoRequest, userId) {
  const itemId = uuid.v4()

  return await todoAccess.createTodo({
    todoId: itemId,
    userId: userId,
    attachmentUrl: createTodoRequest.attachmentUrl,
    dueDate: createTodoRequest.dueDate,
    createdAt: new Date().toISOString(),
    name: createTodoRequest.name,
    done: createTodoRequest.done
  })
}

export async function deleteTodo(createTodoRequest, userId) {
  return await todoAccess.deleteTodo(createTodoRequest.todoId, userId);
}

export async function existTodo(createTodoRequest, userId) {
  return await todoAccess.todoExists(createTodoRequest.todoId, userId);
}


export async function getTodos(userId) {
  return await todoAccess.getTodos(userId);
}

export async function updateTodo(updateTodoRequest) {
  return await todoAccess.updateTodo(updateTodoRequest);
}
