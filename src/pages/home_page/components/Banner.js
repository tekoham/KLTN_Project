import React from 'react'
import CustomButton from '../../../components/common/button'

const Banner = () => {
  return (
    <div className='banner-container d-flex justify-content-center align-items-center'>
      <div className='banner-content d-flex align-items-center'>
        <div className='banner-title'>
          The World Of Creative & Rare Digital Artwork
        </div>
        <div className='banner-description'>
          Create, buy, sell, and resell NFTs on our marketplace. Browse and
          build your collection of the world's most cutting-edge digital art
        </div>
        <div className='d-flex'>
          <CustomButton color='pink-hover-blue' shape='small-radius'>
            Explore More
          </CustomButton>
          <CustomButton
            className='connect-btn'
            color='light-blue'
            shape='small-radius'
          >
            Connect NFT
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default Banner
