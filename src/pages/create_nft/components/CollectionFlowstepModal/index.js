import React from 'react'

import { useSelector } from 'react-redux'

//components
import { Modal } from 'antd'
import checkedOutlineIcon from '../../../../assest/icon/checked-outline-icon.svg'
//css
import './style.scss'

const CollectionFollowStepModal = ({ visible, onClose, ...restProps }) => {
  const {
    isConfirmDeploy,
    isDeployPending,
    isDeploySuccess,
    createPending,
    createSuccess,
  } = useSelector((state) => state.collection)

  return (
    <Modal
      onCancel={onClose}
      className='create-nft-flow_custom'
      footer={null}
      centered
      visible={visible}
      {...restProps}
    >
      <div className='create-nft-flow_header'>
        <span className='create-nft-flow_title'>Follow Step</span>
      </div>
      <div className='create-nft-steps'>
        <div className='create-nft-step'>
          {isConfirmDeploy ? (
            <img
              className='create-nft-step_icon'
              src={checkedOutlineIcon}
              alt='checked-confirm-icon'
            />
          ) : (
            <div className='create-nft-step_loading' />
          )}

          <div className='create-nft-step_content'>
            <span className='create-nft-step_content__title'>
              Waiting to confirm
            </span>
            <span className='create-nft-step_content__desc'>
              Please confirm with your wallet address
            </span>
          </div>
        </div>
        <div className='create-nft-step'>
          {isConfirmDeploy ? (
            isDeployPending ? (
              <div className='create-nft-step_loading' />
            ) : isDeploySuccess ? (
              <img
                className='create-nft-step_icon'
                src={checkedOutlineIcon}
                alt='checked-deploy-icon'
              />
            ) : null
          ) : null}

          <div
            className={`create-nft-step_content ${
              isConfirmDeploy ? '' : 'waiting-status'
            }`}
          >
            <span className='create-nft-step_content__title'>
              Deploy contract
            </span>
            <span className='create-nft-step_content__desc'>
              Deploy code for the new collection smart contract
            </span>
          </div>
        </div>

        <div className='create-nft-step'>
          {isDeploySuccess ? (
            createPending ? (
              <div className='create-nft-step_loading' />
            ) : createSuccess ? (
              <img
                className='create-nft-step_icon'
                src={checkedOutlineIcon}
                alt='checked-create-icon'
              />
            ) : null
          ) : null}

          <div
            className={`create-nft-step_content ${
              isDeploySuccess ? '' : 'waiting-status'
            }`}
          >
            <span className='create-nft-step_content__title'>
              Create collection
            </span>
            <span className='create-nft-step_content__desc'>
              Creating new collection
            </span>
          </div>
        </div>
      </div>
      <p className='warning'>
        Please wait for creating collection. This will take a while. Please
        don't reload the current page.
      </p>
    </Modal>
  )
}

export default CollectionFollowStepModal
