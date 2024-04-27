import { ImagesAccess } from "../dataLayer/imagesAccess.mjs"
import { TodoAccess } from '../dataLayer/todoAccess.mjs'
const imagesAccess = new ImagesAccess()
const todoAccess = new TodoAccess()
export async function createImage(userId, todoId, event) {
    const newItem = await imagesAccess.createImage(todoId, event)
    const uploadUrl = await imagesAccess.getUploadUrl(todoId)
    //update to
    await todoAccess.updateUrlImageTodo(userId, todoId, newItem.uploadUrl)
    return { newItem, uploadUrl }
}