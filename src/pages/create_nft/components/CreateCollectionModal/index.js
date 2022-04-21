/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from 'react'

//hooks
import { useSelector, useDispatch } from 'react-redux'

//components
import { Modal, Form, message } from 'antd'
import {
  CustomButton,
  InputCustom,
  CustomInputTextarea,
  Label,
} from '../../../../components/common'

import { DisplayImagePicker } from './components'

import {
  createSuccess,
  deployPending,
  deploySuccess,
  createPending,
  createCollectionSuccess,
} from '../../../../store/actions/collection'

//css
import './style.scss'

const CreateCollectionModal = ({
  visible,
  onClose,
  onCollectionFollowStepModalClose,
  onCollectionFollowStepModalOpen,
  ...restProps
}) => {
  const [form] = Form.useForm()

  const [isShortUrlErr, setShortUrlErr] = useState(false)
  const [isFormError, setIsFormError] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    // message.success('Collection has been created successfully')
    dispatch(createSuccess())
    onCollectionFollowStepModalClose()
    dispatch(createCollectionSuccess())
  }, [dispatch, onCollectionFollowStepModalClose])

  const handleDeployCollection = async (values) => {
    console.log('deployCollection: ', values)
  }

  const handleCreateCollection = async () => {
    try {
      const values = await form.validateFields()

      //close create collection modal
      onClose()
      // open follow step collection modal
      onCollectionFollowStepModalOpen()

      // deploy collection to blockchain
      const [data, error] = await handleDeployCollection(values)

      if (error) {
        if (error?.code === 4001) {
          message.error('You declined the action in your wallet.')
          return onCollectionFollowStepModalClose()
        }
      }

      // save collection to database
      if (data) {
        dispatch(deploySuccess())
        dispatch(createPending())
        const collectionData = {
          name: values?.displayName.trim(),
          description: values?.description,
          tokenSymbol: values?.collection_symbol,
          hashTransaction: data.transactionHash,
          address: data.collectionAddress,
          type: 0,
        }

        console.log(collectionData)

        // const [response, err] = await collectionService.postCollection(collectionData)

        // if (err) {
        //     message.error(`Fail to create collection: ${err}`)
        //     return onCollectionFollowStepModalClose()
        // }

        // if (response) {
        //     const collectionId = response.id
        //     await uploadImageCollection({ collectionId, imgFile: values.displayImage })
        // }
      }

      // setLoading(false)
    } catch (err) {
      setIsFormError(true)
      return
    }
  }

  //   const uploadImageCollection = async ({ collectionId, imgFile }) => {
  //     const uploadParams = {
  //       userId: localStorage.getItem('userId'),
  //       accessToken: localStorage.getItem('accessToken'),
  //       collectionId,
  //       imgFile,
  //     }

  //     const [response, error] =
  //       await collectionService.getPresignUrlCollectionAvatar(uploadParams)

  //     const [, errorUpload] = await nftService.putNftImage({
  //       imgFile: uploadParams.imgFile,
  //       uploadUrl: response?.upload_url,
  //     })

  //     if (error || errorUpload) {
  //       message.error(
  //         `Failed to upload collection avatar: ${error || errorUpload}`
  //       )
  //     }
  //   }

  const handleCloseModal = () => {
    onClose()
    onCollectionFollowStepModalClose()
  }

  const removeError = useCallback(() => {
    setIsFormError(false)
  }, [])

  return (
    <Modal
      onCancel={onClose}
      className='create-collection_custom'
      footer={null}
      centered
      visible={visible}
      {...restProps}
    >
      <div className='create-collection_header'>
        <span className='create-collection_title'>Create Collection</span>
      </div>
      <Form form={form} onFieldsChange={removeError}>
        <div className='create-collection_block'>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Display image cannot be blank',
              },
            ]}
            name='displayImage'
          >
            <DisplayImagePicker />
          </Form.Item>
        </div>

        <div className='create-collection_block'>
          <Label title='Display Name'>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Display name cannot be blank',
                },
                {
                  max: 32,
                  message: 'Display name cannot exceed 32 characters',
                },
              ]}
              name='displayName'
            >
              <InputCustom placeholder='Enter display name' />
            </Form.Item>
          </Label>
        </div>

        <div className='create-collection_block'>
          <Label title='Collection symbol'>
            <Form.Item
              name='collection_symbol'
              rules={[
                {
                  required: true,
                  message: 'Collection symbol cannot be blank',
                },
                {
                  max: 10,
                  message:
                    'Display collection symbol cannot exceed 10 characters',
                },
              ]}
            >
              <InputCustom placeholder='Enter symbol' />
            </Form.Item>
          </Label>
        </div>

        <div className='create-collection_block'>
          <Label title='Description'>
            <Form.Item
              name='description'
              rules={[
                {
                  max: 1000,
                  message: 'Description cannot exceed 1000 characters',
                },
              ]}
            >
              <CustomInputTextarea
                rows={4}
                placeholder='Enter description (optional)'
              />
            </Form.Item>
          </Label>
        </div>
        <div className='create-collection_btnGroups'>
          <CustomButton
            color='charcoal-blue'
            fullwidth={true}
            disabled={isFormError}
            onClick={handleCreateCollection}
            className='create-collection_btn mr'
          >
            Upload
          </CustomButton>
          <CustomButton
            color='pink-hover-charcoal'
            onClick={handleCloseModal}
            className='create-collection_btn mr'
          >
            Cancel
          </CustomButton>
        </div>
        {isFormError && (
          <p className='create-collection-fix-all-error'>
            Please fix all errors above
          </p>
        )}
      </Form>
    </Modal>
  )
}

export default CreateCollectionModal
