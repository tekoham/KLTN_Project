import React, { useCallback, useState } from 'react'

//components
import { Upload, message } from 'antd'
import CustomButton from '../button'
import classNames from 'classnames'

//style
import './style.scss'

//image
import CancelIcon from '../../../asset/icon/cancel-icon.svg'

const FILE_MAX_SIZE = 100000000
const SUPPORTED_FILE_TYPE = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/webp',
  'image/gif',
]

const PREVIEW_SUPPORTED_FILE_TYPE = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/webp',
  'image/gif',
]

function beforeUpload(file) {
  if (!SUPPORTED_FILE_TYPE.includes(file.type)) {
    message.error(`File format not supported`)
    return Upload.LIST_IGNORE
  }

  if (file.size > FILE_MAX_SIZE) {
    message.error(`File size cannot exceeds 100 MB`)
    return Upload.LIST_IGNORE
  }

  return true
}

const CustomDragger = ({
  className,
  onChange,
  setUploadFile,
  setPreviewFile,
  ...restProps
}) => {
  const [image, setImage] = useState(null)

  const handleChange = useCallback((info) => {
    const blob = new Blob([info.file.originFileObj], {
      type: info.file.type,
    })
    const url = URL.createObjectURL(blob)
    setImage(url)
    if (onChange) {
      onChange(url)
    }

    setUploadFile(info.file.originFileObj), [onChange, setUploadFile]
  })

  const clearImage = useCallback(() => {
    setImage(null)
    onChange(null)
  }, [onChange])

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok')
    }, 0)
  }

  const uploadDraggerClass = classNames({
    'upload-dragger-custom': true,
    active: !!image,
    [className]: !!className,
  })

  return (
    <div>
      <Upload.Dragger
        // accept=".png,.jpg,.jpeg,.webp,.gif"
        showUploadList={false}
        disabled={!!image}
        onChange={handleChange}
        className={uploadDraggerClass}
        customRequest={dummyRequest}
        beforeUpload={beforeUpload}
        {...restProps}
      >
        {image ? (
          <div className='upload-dragger-custom_wrap'>
            <img
              alt='dragger'
              className='upload-dragger-custom_image'
              src={image}
            />
            <div
              className='upload-dragger-custom_cancelIcon'
              onClick={clearImage}
            >
              <img src={CancelIcon} alt='cancel-icon' name='cancel-icon' />
            </div>
          </div>
        ) : (
          <>
            <p className='upload-dragger-custom_title'>
              PNG, JPG, JPEG, GIF or WEBP Max 100mb.
            </p>
            <CustomButton className='upload-dragger-custom_btn'>
              Choose File
            </CustomButton>
          </>
        )}
      </Upload.Dragger>
    </div>
  )
}

export default CustomDragger
