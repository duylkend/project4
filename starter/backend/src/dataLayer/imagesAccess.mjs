import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const dynamoDbClient = DynamoDBDocument.from(new DynamoDB())
const bucketName = process.env.IMAGES_S3_BUCKET
const imagesTable = process.env.IMAGES_TABLE
const urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION)
// upload files
const s3Client = new S3Client()
export class ImagesAccess {
   async createImage(todoId, event) {
    console.log(`Creating image with id ${todoId}`)
    const timestamp = new Date().toISOString()
    const newImage = JSON.parse(event.body)
    const imageId = todoId
    const newItem = {
        todoId,
        timestamp,
        imageId,
        uploadUrl: `https://${bucketName}.s3.amazonaws.com/${imageId}`,
        ...newImage
    }
    console.log('Storing new item: ', newItem)
    await dynamoDbClient.put({
        TableName: imagesTable,
        Item: newItem,
    })
    return newItem
    }


    async getUploadUrl(imageId) {
        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: imageId
        })
        const url = await getSignedUrl(s3Client, command, {
            expiresIn: urlExpiration
        })
        return url
    }

}
