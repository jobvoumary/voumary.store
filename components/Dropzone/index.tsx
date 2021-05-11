import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { useState } from 'react'
import Input from '../Input'
import styles from '../../styles/imageUpload.module.scss'

const ImageDropZone = (props) => {
  const [uploadedFiles, setUploadedFiles] = useState(props.initialFiles || [])

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

  if (props.files) {
    props.files(uploadedFiles)
  }

  const Layout = ({ input, previews, submitButton, dropzoneProps, files, extra: { maxFiles } }) => {
    return (
      <div {...dropzoneProps}>
        <div className={styles.imagePreviewContainer}>
          {props.initialFiles && props.initialFiles.map(file => {
            return (
              <div className={styles.imagePreview}>
                <img src={file} />
                <span>Pronto</span>
              </div>
            )
          })}
          {previews}
          {input}
        </div>
      </div>
    )
  }

  const Preview = ({ meta }) => {
    const { status, previewUrl } = meta
    const statusMap = {
      "error": "Erro. Tente novamente",
      "done": "Ok",
      "uploading": "Carregando..."
    }
    return (
      <div className={styles.imagePreview}>
        <img src={previewUrl} />
        <span>{statusMap[status] || status}</span>
      </div>
    )
  }

  return (
    <>
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        PreviewComponent={Preview}
        LayoutComponent={Layout}
        inputContent="Clique para adicionar imagens"
        inputWithFilesContent={<span className={styles.inputComponent}>+</span>}
        styles={{
          dropzone: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            overflow: 'hidden'
          },
          inputLabelWithFiles: {
            margin: 10,
            width: 100,
            height: 100,
            background: '#fff',
            borderRadius: '5px'
          }
        }}
      />
      <Input name="image" label="Imagens" value={JSON.stringify(uploadedFiles)} type="hidden" />
    </>
  )
}

export { ImageDropZone }
