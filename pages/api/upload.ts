import nextConnect from 'next-connect';
import multer from 'multer';
import crypto from 'crypto';
import { saveImageOnCloudAndGetURL } from '../../services/imgur';
import fs from 'fs';

const uploadLocal = multer({});

const uploadStorage = async (req, res, next)=>{
    const { files } = req 
    const uploadedFiles = await Promise.all(
        files.map(
            file => saveImageOnCloudAndGetURL(file.buffer.toString('base64'))
        )
    )
    // await Promise.all(
    //   files.map(
    //     file => fs.promises.unlink(file.path)
    //   )
    // )
    req.uploadedFiles = uploadedFiles

    return next()
}
const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(uploadLocal.array('files'));
apiRoute.use(uploadStorage)
apiRoute.post((req, res) => {
  res.status(200).json({ data: 'success', url: req.uploadedFiles[0] });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};