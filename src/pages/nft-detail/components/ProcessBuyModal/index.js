import React, { useEffect, useState, useCallback } from 'react'
import { genFixedPriceContract } from '../../../../blockchain/instance'
import { convertPriceToBigDecimals } from '../../../../blockchain/ether'
import { useSelector, useDispatch } from 'react-redux'
import { updateNFTDetail } from '../../../../store/actions/collectible'

//image
import CheckedIcon from '../../../../assest/icon/checked-outline-icon.svg'
//components
import { Modal, message } from 'antd'

//css
import './style.scss'

const FIXED_PRICE_CONTRACT = process.env.REACT_APP_SMART_CONTRACT_FIXED_PRICE
const WETH_CONTRACT = process.env.REACT_APP_SMART_CONTRACT_WETH

const ProcessBuyModal = ({ isOpen, onCloseModal, sellData, isDone }) => {
    const dispatch = useDispatch()

    //state step
    const [isTransferingCollectible, setIsTransferingCollectible] = useState(false)
    const [isWaitingForSign, setIsWaitingForSign] = useState(true)

    // store redux
    const { myProfile } = useSelector(state => state.user)

    const handleTransfer = async values => {
        try {
            const fixedPriceContract = await genFixedPriceContract(FIXED_PRICE_CONTRACT)
            const price = convertPriceToBigDecimals(values?.metadata?.price, 18)

            const contract = await fixedPriceContract.buy(
                values?.collection?.address,
                values?.item_id,
                WETH_CONTRACT,
                price
            )
            setIsWaitingForSign(false)
            setIsTransferingCollectible(true)

            const result = await contract.wait(1)
            const resdata = {
                transactionHash: result?.transactionHash
            }

            return [resdata, null]
        } catch (error) {
            return [null, error]
        }
    }

    const transferCollectible = useCallback(
        async sellData => {
            const [resData, error] = await handleTransfer(sellData)

            if (error) {
                if (error?.code === 4001) {
                    message.error('You declined the action in your wallet.')
                    return onCloseModal()
                } else {
                    message.error(`Failed to buy: ${error}`)
                    onCloseModal()
                }
            }

            if (resData) {
                const sellCollectibleData = {
                    coin_buy: 'WETH',
                    coin_buy_address: String(WETH_CONTRACT),
                    decimal: 18,
                    item_id: String(sellData?.id),
                    price: sellData?.metadata?.price
                }
                dispatch(updateNFTDetail(sellCollectibleData))
                message.success('Buy successfully')
                onCloseModal()
            }
        },
        [onCloseModal, myProfile?.data?.address]
    )

    useEffect(() => {
        const updateNft = async () => {
            if (sellData) {
                await transferCollectible(sellData)
                return onCloseModal()
            }
        }
        updateNft()
    }, [transferCollectible, sellData])

    return (
        <Modal className="sale-flow_custom" footer={null} closable={false} keyboard={false} visible={isOpen}>
            <div className="create-nft-flow_header">
                <span className="create-nft-flow_title">Follow Steps</span>
            </div>
            <div className="create-nft-steps">
                <div className="create-nft-step">
                    <div className="create-nft-loading">
                        {isWaitingForSign ? (
                            <div className="create-nft-step_loading" />
                        ) : (
                            <img className="create-nft-step_icon" src={CheckedIcon} alt="checked-outline-icon" />
                        )}
                    </div>

                    <div className={`create-nft-step_content`}>
                        <span className="create-nft-step_content__title">Create Signing</span>
                        <span className="create-nft-step_content__desc" style={{ marginBottom: '10px' }}>
                            Signing to confirm buy
                        </span>
                    </div>
                </div>

                <div className="create-nft-step">
                    <div className="create-nft-loading">
                        {!isWaitingForSign
                            ? isTransferingCollectible && <div className="create-nft-step_loading" />
                            : null}
                    </div>
                    <div className={`create-nft-step_content`}>
                        <span className="create-nft-step_content__title">Buy Item</span>
                        <span className="create-nft-step_content__desc">Transfering collectible to your wallet</span>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ProcessBuyModal
