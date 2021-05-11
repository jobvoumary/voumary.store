import imgur from 'imgur'

async function saveImageOnCloudAndGetURL(path){
    try{
        const CLIENT_ID = process.env.IMGUR_CLIENT_ID
        const USER_EMAIL = process.env.IMGUR_USER_EMAIL
        const USER_PASSWORD = process.env.IMGUR_USER_PASSWORD
        imgur.setCredentials(USER_EMAIL, USER_PASSWORD, CLIENT_ID)
        const response = await imgur.uploadFile(path)
        return response.link
    }
    catch(e){
        return null
    }
        
}
export { saveImageOnCloudAndGetURL }