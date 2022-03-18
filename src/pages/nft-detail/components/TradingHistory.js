import React from 'react'
import { randomImage, stringRandom, type } from '../../../utils/randomData'
import { getCustomDiffTime } from '../../../utils/convertDate'
import verifiedIcon from '../../../assest/icon/verified-icon.svg'

const TradingHistory = () => {
  const verified = [true, false]
  const action = [0, 1, 2]
  const listData = new Array(12).fill(undefined).map((ele, index) => {
    return {
      id: index,
      avatar: randomImage(),
      verified: verified[Math.floor(Math.random() * verified.length)],
      action: action[Math.floor(Math.random() * action.length)],
      name: 'Changgggggg',
      actionHappenedAt: Math.floor(Math.random() * Date.now()) - 100,
      price: Math.random().toFixed(3),
    }
  })
  return (
    <div className='bids-history-container'>
      <div className='title'>Trading History</div>
      <div className='bids-history-content'>
        {listData?.map((element, index) => {
          return <ListActivity key={index} data={element} />
        })}
      </div>
    </div>
  )
}

const getAction = (action) => {
  switch (action) {
    case 0:
      return 'List For Sale For '
    case 1:
      return 'Bought This NFT For '
    case 2:
      return 'Bid Placed For '
    default:
      return
  }
}

const ListActivity = (props) => {
  const { data } = props || {}
  return (
    <div className='list-activity d-flex justify-content-space-between align-items-center'>
      <div className='user-container d-flex align-items-center'>
        <div className='avatar-container'>
          <img className='avatar' src={data?.avatar} alt='user avatar'></img>
          {data?.verified ? (
            <img
              className='verified-icon'
              src={verifiedIcon}
              alt='verified icon'
            ></img>
          ) : (
            ''
          )}
        </div>
        <div className='user-info'>
          <div className='action'>
            {getAction(data?.action)}{' '}
            <span className='price'>{data?.price} ETH</span>
          </div>
          <div className='name'>
            By <span>{data?.name}</span>
          </div>
        </div>
      </div>

      <div className='time-display'>
        {getCustomDiffTime(data?.actionHappenedAt)}
      </div>
    </div>
  )
}

export default TradingHistory
