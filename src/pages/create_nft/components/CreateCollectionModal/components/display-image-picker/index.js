import React, { useState, useRef } from 'react'

//components
import { CustomButton } from '../../../../../../components/common'
import { Avatar, message } from 'antd'

//utils
import { useWindowSize } from '../../../../../../utils/useWindowSize'

//css
import './style.scss'
const FILE_MAX_SIZE = 100000000

const DisplayImagePicker = ({ onChange }) => {
  const [isMobile] = useWindowSize(768)

  const [displayImage, setDisplayImage] = useState(null)

  const uploadFileBtn = useRef(null)

  const onClickUpload = () => uploadFileBtn.current.click()

  const validateFile = (extension) => {
    const acceptableFormats = ['jpg', 'png', 'jpeg', 'gif']
    if (acceptableFormats.includes(extension)) {
      return true
    }
    return false
  }

  const getAvatarPlaceHolder = () => {
    if (displayImage) return URL.createObjectURL(displayImage)
    return null
  }

  const onChangeAvatar = (e) => {
    const file = e.target.files[0]
    if (!file && !displayImage) return onChange(null)

    if (file?.size > FILE_MAX_SIZE) {
      uploadFileBtn.current.value = ''
      return message.error(`File size cannot exceeds 100 MB`)
    }
    if (file && validateFile(file.type.split('/')[1])) {
      onChange(file)
      return setDisplayImage(file)
    }
    if (!displayImage) {
      onChange(null)
      message.error('File format not supported')
    }
  }
  return (
    <div className='select-avatar'>
      <Avatar
        size={isMobile ? 90 : 145}
        icon={<img alt='avatar' src={getAvatarPlaceHolder()} />}
      />
      <div className='content'>
        <span className='select-avatar_title'>Display image</span>
        <span className='recommend'>
          We recommend an image of at least 400x400. Supported file format: png,
          jpeg, jpg, gif.
        </span>
        <CustomButton
          color='charcoal-blue'
          size='small'
          onClick={onClickUpload}
        >
          <span>Choose File</span>
        </CustomButton>

        <input
          type='file'
          id='actual-btn'
          ref={uploadFileBtn}
          onChange={onChangeAvatar}
          hidden
        />
      </div>
    </div>
  )
}

export default DisplayImagePicker
