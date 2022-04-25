/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from 'react'

//hooks
import { useSelector, useDispatch } from 'react-redux'

//blockchain
import { genCollectionFactoryContract } from '../../../../blockchain/instance'

//components
import { Modal, Form, message } from 'antd'
import {
  CustomButton,
  InputCustom,
  CustomInputTextarea,
  Label,
} from '../../../../components/common'

//services
import collectionService from '../../../../service/collectionService'
import uploadImageService from '../../../../service/uploadImageService'

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

  const [isFormError, setIsFormError] = useState(false)
  const { myProfile } = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const handleDeployCollection = async (values) => {
    try {
      const collectionFactoryContract = await genCollectionFactoryContract()
      console.log(collectionFactoryContract)
      const contract = await collectionFactoryContract.createCollection(
        values?.displayName,
        values?.collection_symbol
      )

      dispatch(deployPending())

      const result = await contract.wait(1)
      const data = {
        collectionAddress: result?.events[0]?.address,
        transactionHash: result?.transactionHash,
      }

      return [data, null]
    } catch (error) {
      return [null, error]
    }
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

        //Upload image to ipfs
        const [imageLink, errorUpload] =
          await uploadImageService.uploadImageIPFS({
            imgFile: values?.displayImage,
          })

        if (errorUpload) {
          message.error(`Failed to upload collection avatar: ${errorUpload}`)
        }

        const collectionData = {
          address: data?.collectionAddress,
          metadata: {
            description: values?.description,
            tokenSymbol: values?.collection_symbol,
            creator: myProfile?.data?.address,
            hashTransaction: data?.transactionHash,
            avatar: imageLink,
          },
          name: values?.displayName.trim(),
        }

        const [response, err] = await collectionService.postCollection(
          collectionData
        )

        if (err) {
          message.error(`Fail to create collection: ${err}`)
          return onCollectionFollowStepModalClose()
        }
        if (response) {
          message.success('Collection has been created successfully')
          dispatch(createSuccess())
          onCollectionFollowStepModalClose()
          dispatch(createCollectionSuccess())
        }
      }
    } catch (err) {
      setIsFormError(true)
      return
    }
  }

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
