import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import DefaultLayout from '../../components/layout/default-layout'
import { useSelector, useDispatch } from 'react-redux'
import { Avatar, Form, Modal } from 'antd'
import { CustomButton, InputCustom } from '../../components/common'
import { isUserAuthenticated } from '../../utils/auth'
import { useHistory } from 'react-router-dom'
import { useWindowSize } from '../../utils/useWindowSize'
import { message } from 'antd'
import { useAuth } from '../../hooks/useAuth'
import loadingIcon from '../../assest/icon/loading-icon.svg'
import AvatarPlaceholder from '../../assest/image/avatar-placeholder.png'
import './styles.scss'

const FILE_MAX_SIZE = 100000000

const EditProfile = () => {
  const uploadFileBtn = useRef()
  const { profile } = useSelector((state) => state.user)
  const [avatar, setAvatar] = useState('')
  const [isError, setIsError] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isMobile] = useWindowSize(768)

  const [, handleSignWallet] = useAuth()

  const history = useHistory()
  const dispatch = useDispatch()

  const { data, updateProfileSuccess, error, previewAvatar } = useSelector(
    (state) => state.user
  )
  const { name, bio, avatarUrl, id } = useSelector(
    (state) => state.user.profile
  )

  const [form] = Form.useForm()
  const initialFormValues = useMemo(() => {
    return { name, bio }
  }, [bio, name])

  const onClickUpload = () => uploadFileBtn.current.click()

  const validateAvatar = (extension) => {
    const acceptableFormats = ['jpg', 'png', 'jpeg', 'gif']
    if (acceptableFormats.includes(extension)) {
      return true
    }
    return false
  }

  const onChangeAvatar = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file?.size > FILE_MAX_SIZE) {
      uploadFileBtn.current.value = ''
      return message.error(`File size cannot exceeds 100 MB`)
    }
    if (validateAvatar(file.type.split('/')[1])) {
      return setAvatar(file)
    }
    message.error(getText('fileNotSupported'))
  }

  const getAvatarPlaceHolder = () => {
    if (avatar) return URL.createObjectURL(avatar)
    if (previewAvatar) return previewAvatar
    if (avatarUrl) return `${process.env.REACT_APP_API_ENDPOINT}/${avatarUrl}`
    return AvatarPlaceholder
  }

  const removeError = () => {
    setIsError(false)
  }

  const onFinishFailed = () => {
    setIsError(true)
  }

  const handleUploadAvatar = async () => {
    return
    // const userId = localStorage.getItem('userId')
    // const uploadParams = {
    //   userId,
    //   imgFile: avatar,
    // }
    // return dispatch(updateUserAvatar(uploadParams, id))
  }

  const handleUpdateUserProfile = (values) => {
    for (let obj in values) {
      if (values[obj] === '') {
        values[obj] = null
      }
    }
    return

    // return dispatch(editUserProfile(values))
  }

  const onFinish = async (values) => {
    // dispatch(setUpdateProfileState(null))
    setIsOpenModal(true)
    removeError()
    if (!isUserAuthenticated()) {
      const res = await handleSignWallet()
      if (res === false) return setIsOpenModal(false)
    }

    if (avatar) {
      await handleUploadAvatar()
    }
    if (updateProfileSuccess !== false) {
      return handleUpdateUserProfile({ ...values, name: values?.name?.trim() })
    }
  }

  useEffect(() => {
    // dispatch(setUpdateProfileState(null))
    setIsOpenModal(false)
    if (updateProfileSuccess === true) {
      history.push(`/user/${data?.account}`)
      message.success('profileUpdated')
    } else if (updateProfileSuccess === false) {
      message.error(error ? error.message : 'updateProfileFailed')
    }
  }, [data.account, dispatch, error, history, updateProfileSuccess])

  useEffect(() => {
    form.setFieldsValue(initialFormValues)
  }, [form, initialFormValues, data?.account])

  return (
    <DefaultLayout isActiveFooter={!isMobile}>
      <div className='update-profile-container'>
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onFieldsChange={() => removeError()}
          initialValues={initialFormValues}
          className='update-profile-form'
        >
          <div className='select-profile-avatar'>
            <Avatar
              size={isMobile ? 90 : 160}
              icon={<img alt='avatar' src={getAvatarPlaceHolder()} />}
            />
            <div>
              <div>
                <div>We recommend an image</div>
                <div>of at least 400x400. Gifs work too.</div>
              </div>
              <CustomButton
                color='pink-hover-blue'
                size='small'
                shape='small-radius'
                onClick={onClickUpload}
              >
                Choose File
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
          <div>
            <div className='title'>Edit profile</div>
            <div className='description'>
              You can set preferred display name, create your branded profile
              URL and manage other personal settings.
            </div>
          </div>
          <div className='input-group'>
            <div>
              <div className='label'>Display name</div>
              <Form.Item
                name='name'
                rules={[
                  {
                    max: 32,
                    message: 'Display name cannot exceed 32 characters',
                  },
                ]}
              >
                <InputCustom placeholder='Enter your display name' />
              </Form.Item>
            </div>
            <div>
              <div className='label'>Bio</div>
              <Form.Item
                name='bio'
                rules={[
                  { max: 1000, message: 'Bio cannot exceed 1000 characters' },
                ]}
              >
                <InputCustom placeholder='Tell about yourself in a few words' />
              </Form.Item>
            </div>
          </div>
          <div className='verification-group'>
            {!profile?.verification && (
              <>
                <div className='label'>Verification</div>
                <div className='sub'>
                  Proceed with verification process to get more visibility and
                  gain trust on CAS NFT Marketplace. Please allow up to several
                  weeks for the process.
                </div>
                <Link
                  href={`https://docs.google.com/forms/d/e/1FAIpQLSfCw1zKTa-ST4-GkX_HlzbMQB8aMst6XIizmltqT8jXigtyDg/viewform?usp=sf_link`}
                  target='_blank'
                  rel='noreferrer'
                >
                  <CustomButton
                    color='charcoal-blue'
                    size='small'
                    shape='small-radius'
                  >
                    Get verified
                  </CustomButton>
                </Link>
              </>
            )}
          </div>
          <CustomButton
            color='pink-hover-blue'
            fullwidth={true}
            type='submit'
            htmlType='submit'
            disabled={isError}
          >
            Update Profile
          </CustomButton>
          {isError && (
            <div className='err-underline'>
              Please fix all error before updating profile
            </div>
          )}
        </Form>
        <Modal
          visible={isOpenModal}
          footer={null}
          closable={false}
          keyboard={false}
          className='modal-custom'
        >
          <img src={loadingIcon} alt='Loading icon' className='loading-icon' />
          <div>Updating Profile</div>
        </Modal>
      </div>
    </DefaultLayout>
  )
}

export default EditProfile
