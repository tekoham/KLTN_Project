import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'antd'
import CustomButton from '../button'
import CustomTooltip from '../tooltip'
import WhiteHeartIcon from '../../../assest/icon/white_heart_icon.svg'
import PinkHeartIcon from '../../../assest/icon/pink_heart_icon.svg'
import { getDiffUnixTime } from '../../../utils/convertDate'
import moment from 'moment'
import './styles.scss'

const CardItem = ({ data }) => {
  const { auctions } = data || {}
  const [counter, setCounter] = useState(null)
  const [isStartTimeAfterCurrent, setIsStartTimeAfterCurrent] = useState(false)
  const [currentTime, setCurrentTime] = useState(moment().unix())

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
      data?.type == 'auction' &&
      data?.expireDate &&
      data?.expireDate - currentTime > 0
    ) {
      if (Number(data?.startDate) > currentTime) {
        setIsStartTimeAfterCurrent(true)
        setCounter(Number(data?.startDate))
        return
      }
      setIsStartTimeAfterCurrent(false)
      setCounter(Number(data?.expireDate))
    } else {
      setCounter(null)
    }
  }, [currentTime, isStartTimeAfterCurrent])

  useEffect(() => {
    setCurrentTime(moment().unix())
  }, [isStartTimeAfterCurrent])

  const renderTimeLeft = useCallback(() => {
    if (counter) {
      if (isStartTimeAfterCurrent) {
        return (
          <div className='auction-time-container'>
            <div className='time-counter'>
              {getDiffUnixTime(counter, currentTime)[0]}:
              {getDiffUnixTime(counter, currentTime)[1]}:
              {getDiffUnixTime(counter, currentTime)[2]}:
              {getDiffUnixTime(counter, currentTime)[3]}
            </div>
          </div>
        )
      }
      return (
        <div className='auction-time-container'>
          <div className='time-counter'>
            {getDiffUnixTime(counter, currentTime)[0]}:
            {getDiffUnixTime(counter, currentTime)[1]}:
            {getDiffUnixTime(counter, currentTime)[2]}:
            {getDiffUnixTime(counter, currentTime)[3]}
          </div>
        </div>
      )
    }
  }, [isStartTimeAfterCurrent, counter, currentTime])

  return (
    <div className='card-item-container'>
      <Card
        cover={
          <Link to='/'>
            <img alt='NFT-image' src={data?.image} />
          </Link>
        }
        bordered={false}
        className='card-item-custom'
      >
        <div>
          <div className='price-display d-flex align-items-center'>
            <div className='like-display'>
              <img
                src={PinkHeartIcon}
                alt='heart-icon'
                className='heart-icon'
              />
              <span className='like-number'>{data?.likes}</span>
            </div>
            {data?.type == 'auction' ? (
              <div className='d-flex justify-content-space-between price'>
                <div className='start-bid'>
                  <div className='fixed-price'>Start Bid</div>
                  <div className='price'>59.00 ETH</div>
                </div>
                <div className='highest-price'>
                  <div className='fixed-price'>Highest Bid</div>
                  <div className='price'>20.00 ETH</div>
                </div>
                {renderTimeLeft()}
              </div>
            ) : (
              <div>
                <div className='fixed-price'>Fixed price</div>
                <div className='price'>50.00 ETH</div>
              </div>
            )}
          </div>
          <div className='card-item-information d-flex justify-content-center align-items-center'>
            <Link to='/'>
              <img className='avatar' src='avatar.jpg' alt='Creator' />
            </Link>
            <div className='information'>
              <CustomTooltip placement='topLeft' title={data?.name}>
                <div className='item-title'>{data?.name}</div>
              </CustomTooltip>
              <div className='creator'>
                Created by <div className='creator-name'>@KienDaoTrung</div>
              </div>
            </div>
            <CustomButton
              className='details-btn'
              color='pink-hover-blue'
              shape='small-radius'
            >
              Details
            </CustomButton>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default CardItem
