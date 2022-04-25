import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { message, Modal } from 'antd'
import nftService from '../../../../service/nftService'
import uploadImageService from '../../../../service/uploadImageService'
import { genCollectionContract } from '../../../../blockchain/instance'
import { convertBigNumberValueToNumber } from '../../../../blockchain/ether'

import './style.scss'

const FlowStepNotForSale = ({ visible, onClose, data, uploadFile, setNftId }) => {
    let nftIdCreated = null
    //store
    const { myProfile } = useSelector(state => state.user) || {}

    //state
    const [isCreatingNFT] = useState(true)

    //func
    const handleDeployCollectible = async values => {
        try {
            const collectionContract = await genCollectionContract(values?.collectionAddress)
            const contract = await collectionContract.mint(
                values?.to,
                values?.name,
                values?.description,
                values?.category,
                values?.tokenURI
            )

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

    const createNFTNotForSale = async () => {
        //Upload image to ipfs
        const [imageLink, errorUpload] = await uploadImageService.uploadImageIPFS({
            imgFile: uploadFile
        })

        if (errorUpload) {
            message.error(`Failed to upload collectible avatar: ${errorUpload}`)
            onClose()
        }
        const addData = {
            to: myProfile?.data?.address,
            tokenURI: imageLink
        }

        const newData = { ...data, ...addData }

        // deploy collection to blockchain
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

            const collectibleData = {
                category: String(newData?.category),
                collection_id: String(newData?.collectionId),
                description: newData?.description,
                item_id: nftIdCreated.toString(),
                metadata: {},
                name: newData?.name,
                owner: resData?.owner
            }

            // create nft and get id of nft
            const [createNFTData, errCreateNFT] = await nftService.createNft(collectibleData)
            if (errCreateNFT) {
                onClose()
                return message.error('Creating collectible failed', errCreateNFT)
            } else {
                setNftId(nftIdCreated)
                message.success('Collectible has been created successfully')
                onClose()
            }
        }
    }
    useEffect(() => {
        createNFTNotForSale()
    }, [])
    return (
        <Modal className="flow-step-not-for-sale" footer={null} centered visible={visible}>
            <div className="not-for-sale_header">
                <span className="not-for-sale_title">Follow Step</span>
            </div>
            <div className="create-nft-steps">
                <div className="create-nft-step">
                    {isCreatingNFT && <div className="create-nft-step_loading" />}
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

export default FlowStepNotForSale
