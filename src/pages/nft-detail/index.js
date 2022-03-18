import React, { useState, useEffect, useCallback } from 'react'
import DefaultLayout from '../../components/layout/default-layout'
import { CustomButton } from '../../components/common'
import { randomImage, stringRandom, type } from '../../utils/randomData'
import { getDiffUnixTime } from '../../utils/convertDate'
import moment from 'moment'
import { TradingHistory, Author } from './components'
import WhiteHeartIcon from '../../assest/icon/white_heart_icon.svg'
import PinkHeartIcon from '../../assest/icon/pink_heart_icon.svg'

import './styles.scss'

const TRUNCATE_LETTER = 240
const NFTDetail = (props) => {
  const [counter, setCounter] = useState(null)
  const [isStartTimeAfterCurrent, setIsStartTimeAfterCurrent] = useState(false)
  const [currentTime, setCurrentTime] = useState(moment().unix())
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)

  useEffect(() => {
    if (counter) {
      const timer = setInterval(() => {
        if (counter - currentTime > 0) {
          setCounter(counter - 1)
        }
        if (counter - currentTime === 0) {
          if (!isStartTimeAfterCurrent) {
            setCounter(0)
          } else {
            setCounter(0)
            setIsStartTimeAfterCurrent(false)
          }
        }
      }, 1000)

      return () => {
        clearInterval(timer)
      }
    }
  }, [counter, isStartTimeAfterCurrent, currentTime])

  useEffect(() => {
    if (
      listData?.type == 'auction' &&
      listData?.expireDate &&
      listData?.expireDate - currentTime > 0
    ) {
      if (Number(listData?.startDate) > currentTime) {
        setIsStartTimeAfterCurrent(true)
        setCounter(Number(listData?.startDate))
        return
      }
      setIsStartTimeAfterCurrent(false)
      setCounter(Number(listData?.expireDate))
    } else {
      setCounter(null)
    }
  }, [currentTime, isStartTimeAfterCurrent])

  useEffect(() => {
    setCurrentTime(moment().unix())
  }, [isStartTimeAfterCurrent])

  const renderTimeLeft = useCallback(() => {
    if (isStartTimeAfterCurrent) {
      return (
        <div className='time-counter'>
          {getDiffUnixTime(counter, currentTime)[0]}:
          {getDiffUnixTime(counter, currentTime)[1]}:
          {getDiffUnixTime(counter, currentTime)[2]}:
          {getDiffUnixTime(counter, currentTime)[3]}
        </div>
      )
    }
    return (
      <div className='time-counter'>
        {getDiffUnixTime(counter, currentTime)[0]}:
        {getDiffUnixTime(counter, currentTime)[1]}:
        {getDiffUnixTime(counter, currentTime)[2]}:
        {getDiffUnixTime(counter, currentTime)[3]}
      </div>
    )
  }, [isStartTimeAfterCurrent, counter, currentTime])

  const category = ['Art', 'Photo', 'Sport', 'Game', 'GIFs']
  const status = [0, 1, 2]
  const verified = [true, false]
  const listData = {
    id: 1,
    name: stringRandom(true),
    description:
      'My crush is beautiful. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    startDate: Date.now(),
    expireDate: Math.floor(Math.random() * Date.now()) + 400,
    type: type[Math.floor(Math.random() * type.length)],
    category: category[Math.floor(Math.random() * category.length)],
    saleStatus: status[Math.floor(Math.random() * status.length)],
    price: Math.random().toFixed(3),
    startBid: Math.random().toFixed(3),
    highestBid: Math.random().toFixed(3),
    likes: Math.floor(Math.random() * 100) + 1,
    image: randomImage(),
    creator: {
      name: 'Changgggg',
      avatar: randomImage(),
      verified: verified[Math.floor(Math.random() * verified.length)],
    },
    owner: {
      name: 'ChangggggDo',
      avatar: randomImage(),
      verified: verified[Math.floor(Math.random() * verified.length)],
    },
    collection: {
      name: 'CAS',
      avatar: randomImage(),
      verified: verified[Math.floor(Math.random() * verified.length)],
    },
  }

  const truncateDescription = (data) => {
    const description = data.substring(0, TRUNCATE_LETTER)
    return `${description}...`
  }

  return (
    <DefaultLayout>
      <div className='collectible-detail-container'>
        <div className='collectible-banner'>
          <div className='title'>Collectible Detail</div>
        </div>
        <div className='collectible-detail-content'>
          <div className='collectible-information-container d-flex'>
            <div className='collectible-image'>
              <img src={listData?.image} alt='collectible image' />
            </div>
            <div className='collectible-information'>
              <div className='collectible-name'>{listData?.name}</div>
              <div className='collectible-attribute d-flex'>
                <div className='collectible-category'>{listData?.category}</div>
                <div className='collectible-like'>
                  <img
                    className='heart-icon'
                    src={PinkHeartIcon}
                    alt='pink heart icon'
                  />
                  {listData?.likes}
                </div>
              </div>
              <div className='collectible-description'>
                {listData?.description?.length != 0 ? (
                  isDescriptionOpen ? (
                    <div>
                      {listData?.description}
                      <div
                        className='show-less'
                        onClick={() => setIsDescriptionOpen(false)}
                      >
                        Show less
                      </div>
                    </div>
                  ) : (
                    <div>
                      {truncateDescription(listData?.description)}
                      <div
                        className='show-more'
                        onClick={() => setIsDescriptionOpen(true)}
                      >
                        Show more
                      </div>
                    </div>
                  )
                ) : (
                  ''
                )}
              </div>
              <Author listData={listData} />
              <div>
                {listData?.saleStatus != 0 ? (
                  <div className='sale-container'>
                    <div className='collectible-price'>
                      {listData?.type == 'auction' ? (
                        <div className='price-container d-flex justify-content-space-between'>
                          <div className='price-content'>
                            <div className='title'>Auctin Ends In</div>
                            <div className='time-left'>{renderTimeLeft()}</div>
                          </div>
                          <div className='price-content'>
                            <div className='title'>Highest Bids</div>
                            <div className='highest-bids'>
                              {listData?.price} ETH
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className='price-container'>
                          <div className='price-content'>
                            <div className='title'>Fixed Price</div>
                            <div className='fixed-price'>
                              {listData?.price} ETH
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <CustomButton
                      className='buy-btn'
                      color='pink-hover-blue'
                      shape='small-radius'
                    >
                      {listData?.type == 'auction' ? 'Place bid' : 'Buy'}
                    </CustomButton>
                  </div>
                ) : (
                  <CustomButton
                    className='not-for-sale-btn'
                    color='pink'
                    shape='small-radius'
                    disabled={true}
                  >
                    Not For Sale
                  </CustomButton>
                )}
              </div>
            </div>
          </div>
          <TradingHistory></TradingHistory>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default NFTDetail
