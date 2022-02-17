import React from 'react'
import { CardItemSmall, CustomCarousel } from '../../../components/common'

const TrendingArtwork = (props) => {
  const { dummyData } = props || {}
  return (
    <div className='trending-artwork'>
      <div className='title'>Trending Artwork</div>
      <CustomCarousel itemNumber={4} itemPadding='-18px'>
        {dummyData?.map((item, index) => (
          <CardItemSmall data={item} key={index}></CardItemSmall>
        ))}
      </CustomCarousel>
    </div>
  )
}

export default TrendingArtwork
