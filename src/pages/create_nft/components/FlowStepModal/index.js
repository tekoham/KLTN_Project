import React, { useCallback, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

//components
import { Modal, message } from 'antd'

//services
import nftService from '../../../../service/nftService'
import uploadImageService from '../../../../service/uploadImageService'
import { genCollectionContract } from '../../../../blockchain/instance'
import { convertBigNumberValueToNumber, convertPriceToBigDecimals } from '../../../../blockchain/ether'

//image
import CheckedIcon from '../../../../assest/icon/checked-outline-icon.svg'
//css
import './style.scss'

const FlowStepModal = ({ visible, onClose, data, uploadFile, setNftId, ...restProps }) => {
    //state
    const [isUploadingImage, setIsUploadingImage] = useState(true)
    const [isCreatingNFT, setIsCreatingNFT] = useState(false)
    const [isWaitingForSign, setIsWaitingForSign] = useState(false)

    //store
    const { myProfile } = useSelector(state => state.user) || {}

    let nftIdCreated = null

    const handleDeployCollectible = async values => {
        try {
            const collectionContract = await genCollectionContract(values?.collectionAddress)
            const price = convertPriceToBigDecimals(values?.price, 18)

            const contract = await collectionContract.mintAndListForSale(
                values?.to,
                values?.name,
                values?.description,
                values?.category,
                values?.tokenURI,
                price
            )
            setIsWaitingForSign(false)

            const result = await contract.wait(1)
            const resdata = {
                tokenId: convertBigNumberValueToNumber(result?.logs[0]?.topics[3], 0),
                owner: values?.to,
                transactionHash: result?.transactionHash
            }

            return [resdata, null]
        } catch (error) {
            return [null, error]
        }
    }

    const createNFT = useCallback(async () => {
        if (data) {
            //Upload image to ipfs
            const [imageLink, errorUpload] = await uploadImageService.uploadImageIPFS({
                imgFile: uploadFile
            })

            if (errorUpload) {
                message.error(`Failed to upload collectible avatar: ${errorUpload}`)
                onClose()
            }
            setIsUploadingImage(false)
            setIsWaitingForSign(true)
            const addData = {
                to: myProfile?.data?.address,
                tokenURI: imageLink
            }

            const newData = { ...data, ...addData }

            // deploy collectible to blockchain
            const [resData, error] = await handleDeployCollectible(newData)

            if (error) {
                if (error?.code === 4001) {
                    message.error('You declined the action in your wallet.')
                    return onClose()
                } else {
                    message.error(`Failed to create collectible: ${error}`)
                    onClose()
                }
            }

            // save collection to database
            if (resData) {
                nftIdCreated = resData?.tokenId
                const ownerId = localStorage.getItem('userId')

                const collectibleData = {
                    category: String(newData?.category),
                    collection_id: String(newData?.collectionId),
                    description: newData?.description,
                    item_id: nftIdCreated.toString(),
                    metadata: {
                        imageURL: imageLink,
                        price: newData?.price,
                        onSaleStatus: 1
                    },
                    name: newData?.name,
                    owner_id: ownerId
                }

                setIsCreatingNFT(true)

                // create nft and get id of nft
                const [createNFTData, errCreateNFT] = await nftService.createNft(collectibleData)
                if (errCreateNFT) {
                    onClose()
                    return message.error('Creating collectible failed', errCreateNFT)
                } else {
                    setNftId(createNFTData?.id)
                    message.success('Collectible has been created successfully')
                    onClose()
                }
            }
        }
    }, [onClose, myProfile?.data?.address, uploadFile])

    useEffect(() => {
        createNFT()
    }, [])

    if (!myProfile?.data?.address) {
        return null
    }

    return (
        <Modal className="create-nft-flow_custom" footer={null} centered visible={visible}>
            <div className="create-nft-flow_header">
                <span className="create-nft-flow_title">Follow Steps</span>
            </div>
            <div className="create-nft-steps">
                <div className="create-nft-step">
                    <div className="create-nft-loading">
                        {isUploadingImage ? (
                            <div className="create-nft-step_loading" />
                        ) : (
                            <img className="create-nft-step_icon" src={CheckedIcon} alt="checked-outline-icon" />
                        )}
                    </div>

                    <div className={`create-nft-step_content`}>
                        <span className="create-nft-step_content__title">Uploading Avatar</span>
                        <span className="create-nft-step_content__desc" style={{ marginBottom: '10px' }}>
                            Please wait while we upload your collectible avatar to IPFS
                        </span>
                    </div>
                </div>

                <div className="create-nft-step">
                    <div className="create-nft-loading">
                        {!isUploadingImage ? (
                            isWaitingForSign ? (
                                <div className="create-nft-step_loading" />
                            ) : (
                                <img className="create-nft-step_icon" src={CheckedIcon} alt="checked-outline-icon" />
                            )
                        ) : (
                            ''
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
                        {isCreatingNFT && <div className="create-nft-step_loading" />}
                    </div>

                    <div className={`create-nft-step_content`}>
                        <span className="create-nft-step_content__title">Create collectible</span>
                        <span className="create-nft-step_content__desc" style={{ marginBottom: '10px' }}>
                            Creating new collectible
                        </span>
                    </div>
                </div>
            </div>
            <p className="warning">
                Please wait for creating NFT. This will take a while. Please don't reload the current page.
            </p>
        </Modal>
    )
}

export default FlowStepModal
