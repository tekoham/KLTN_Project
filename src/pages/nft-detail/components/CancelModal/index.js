import React from 'react'
import './style.scss'
import { CustomButton } from '../../../../components/common'
import { Modal } from 'antd'

const CancelModal = ({ onConfirmCancelSale, onCloseModal, isOpen, isCanceling }) => {
    return (
        <Modal
            visible={isOpen}
            onOk={!isCanceling && onCloseModal}
            onCancel={!isCanceling && onCloseModal}
            footer={null}
            closable={false}
            className={'custom-process-modal'}
        >
            <div className="cancel-sale">
                <p>Cancel sale</p>

                <p className="cancel-fixed-price-text">
                    Canceling your listing will unpublish this sale from CAS NFT and require a transaction to ensure it
                    will never be fulfillable.
                </p>

                <CustomButton
                    disabled={isCanceling}
                    fullwidth={true}
                    color="charcoal-blue"
                    onClick={onCloseModal}
                    className="btn-never"
                >
                    <span> Never</span>
                </CustomButton>
                <CustomButton
                    fullwidth={true}
                    color="pink-hover-blue"
                    onClick={onConfirmCancelSale}
                    loading={isCanceling}
                >
                    <span>Cancel Listing</span>
                </CustomButton>
            </div>
        </Modal>
    )
}

export default CancelModal
