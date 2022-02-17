import React from 'react'
import { CustomCarousel, CardItem } from '../../../components/common'

const LiveAuction = (props) => {
  const { dummyData } = props || {}
  return (
    <div className='live-auction'>
      <div className='title'>Live Auction</div>
      <CustomCarousel itemNumber={3} itemPadding='-25px'>
        {dummyData?.map((item, index) => (
          <CardItem data={item} key={index}></CardItem>
        ))}
      </CustomCarousel>
    </div>
  )
}

export default LiveAuction
