import React from 'react'
import createImage from '../../../assest/image/create-img.png'
import walletImage from '../../../assest/image/wallet.png'
import createCollection from '../../../assest/image/create-collection.png'
import addNFTs from '../../../assest/image/add-nft.png'
import listForSale from '../../../assest/image/list-for-sale.png'
import { Row, Col } from 'antd'

const Introduce = () => {
  return (
    <div className='introduce'>
      <div className='title'>Create And Sell Your NFTs</div>
      <div className='introduce-content d-flex align-items-center'>
        <img src={createImage} alt='create image' className='create-image' />
        <Row className='content-container' gutter={[32, 32]}>
          <Col className='content' span={12}>
            <img src={walletImage} alt='wallet image' />
            <div className='content-title'>Set Up Your Wallet</div>
            <div className='description'>
              Connect wallet by clicking the wallet icon in the top right
              corner. We provide support for the most popular wallet: Metamask.
            </div>
          </Col>
          <Col className='content' span={12}>
            <img src={createCollection} alt='create collection image' />
            <div className='content-title'>Create Your Collection</div>
            <div className='description'>
              Create your own collection of nfts with a description, profile &
              banner images, and enjoy your NFT digital art.
            </div>
          </Col>
          <Col className='content' span={12}>
            <img src={addNFTs} alt='add nfts image' />
            <div className='content-title'>Create Your NFTs</div>
            <div className='description'>
              Upload your work (image, video, audio, or 3D art), add a title and
              description, and customize your NFTs
            </div>
          </Col>
          <Col className='content' span={12}>
            <img src={listForSale} alt='list for sale image' />
            <div className='content-title'>List Them For Sale</div>
            <div className='description'>
              Choose between auctions, fixed-price listings, and declining-price
              listings. You choose how you want to sell your NFTs
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Introduce
