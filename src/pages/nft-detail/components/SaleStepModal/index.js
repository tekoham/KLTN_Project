import React, { useEffect, useState, useCallback } from 'react'
import { genFixedPriceContract, genCollectionContract } from '../../../../blockchain/instance'
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

const SaleStepModal = ({ isOpen, onClose, saleData }) => {
    const dispatch = useDispatch()

    //state step
    const [isPuttingOnSale, setIsPuttingOnSale] = useState(false)
    const [isWaitingForSign, setIsWaitingForSign] = useState(true)

    // store redux
    const { myProfile } = useSelector(state => state.user)
    const { data } = useSelector(state => state.collectible)

    const handlePutOnSale = async values => {
        try {
            const fixedPriceContract = await genFixedPriceContract(FIXED_PRICE_CONTRACT)
            const collectionContract = await genCollectionContract(values?.collection?.address)
            const isApproved = await collectionContract.getApproved(values?.item_id)
            if (isApproved !== FIXED_PRICE_CONTRACT) {
                const approve = await collectionContract.approve(FIXED_PRICE_CONTRACT, values?.item_id)
                await approve.wait(1)
            }

            const price = convertPriceToBigDecimals(values?.price, 18)

            const contract = await fixedPriceContract.sell(values?.collection?.address, values?.item_id, price)
            setIsWaitingForSign(false)
            setIsPuttingOnSale(true)

            const result = await contract.wait(1)
            const resdata = {
                transactionHash: result?.transactionHash
            }

            return [resdata, null]
        } catch (error) {
            return [null, error]
        }
    }

    const putOnSaleNft = useCallback(
        async saleData => {
            const newData = { ...data, ...saleData }
            const [resData, error] = await handlePutOnSale(newData)

            if (error) {
                if (error?.code === 4001) {
                    message.error('You declined the action in your wallet.')
                    return onClose()
                } else {
                    message.error(`Failed to put on sale: ${error}`)
                    onClose()
                }
            }

            if (resData) {
                const putOnSaleData = {
                    coin_buy: 'WETH',
                    coin_buy_address: String(WETH_CONTRACT),
                    decimal: 18,
                    item_id: String(newData?.id),
                    price: newData?.price
                }
                dispatch(updateNFTDetail(putOnSaleData))
                message.success('Put your NFT on market successfully')
                onClose()
            }
        },
        [onClose, myProfile?.data?.address]
    )

    useEffect(() => {
        const updateNft = async () => {
            if (saleData) {
                await putOnSaleNft(saleData)
                return onClose()
            }
        }
        updateNft()
    }, [putOnSaleNft, saleData])

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
                            Signing to confirm put on the CAS NFT market
                        </span>
                    </div>
                </div>

                <div className="create-nft-step">
                    <div className="create-nft-loading">
                        {!isWaitingForSign ? isPuttingOnSale && <div className="create-nft-step_loading" /> : null}
                    </div>
                    <div className={`create-nft-step_content`}>
                        <span className="create-nft-step_content__title">Listing For Sale</span>
                        <span className="create-nft-step_content__desc">Listing collectible for sale</span>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default SaleStepModal
