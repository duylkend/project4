import { ImagesAccess } from "../dataLayer/imagesAccess.mjs"
const imagesAccess = new ImagesAccess()
export async function createImage(todoId, event) {
    const newItem = await imagesAccess.createImage(todoId, event)
    const uploadUrl = await imagesAccess.getUploadUrl(todoId)
    return { newItem, uploadUrl }
}