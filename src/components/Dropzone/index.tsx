import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { useState } from 'react'

const ImageDropZone = (props) => {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const getUploadParams = ({ file, meta }) => {
    const body = new FormData()
    body.append('files', file)
    return { url: '/api/upload', body }
  }

  const handleChangeStatus = (fileWithMeta, status) => {
    if (status === 'done') {
      const { xhr } = fileWithMeta
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.response)
        setUploadedFiles([...uploadedFiles, response.url])
      }
    }
  }
  if(props.files){
    props.files(uploadedFiles)
  }
  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
    />
  )
}

export { ImageDropZone }
