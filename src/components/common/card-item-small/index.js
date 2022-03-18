import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Card, Avatar } from 'antd'
import CustomTooltip from '../tooltip'
import CustomButton from '../button'
import WhiteHeartIcon from '../../../assest/icon/white_heart_icon.svg'
import PinkHeartIcon from '../../../assest/icon/pink_heart_icon.svg'
import { getDiffUnixTime } from '../../../utils/convertDate'
import moment from 'moment'
import './styles.scss'

const CardItemSmall = ({ data }) => {
  const { type } = data || {}
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

  return (
    <div className='card-item-small-container'>
      <Card
        cover={
          <Link to='/collectible/1'>
            <img alt='NFT-image' src={data?.image} />
          </Link>
        }
        bordered={false}
        className='card-item-small-custom'
      >
        <div className='card-item-small-content'>
          <div className='like-display'>
            <img src={PinkHeartIcon} alt='heart-icon' className='heart-icon' />
            <span className='like-number'>{data?.likes}</span>
          </div>
          {data?.type == 'auction' ? renderTimeLeft() : ''}
          <CustomTooltip placement='topLeft' title={data?.name}>
            <div className='item-name'>{data?.name}</div>
          </CustomTooltip>
          <div className='price-display d-flex'>
            {data?.type == 'auction' ? (
              <div className='d-flex justify-content-space-between'>
                <div className='start-bid'>
                  <div className='fixed-price'>Start Bid</div>
                  <div className='price'>59.00 ETH</div>
                </div>
                <div className='highest-price'>
                  <div className='fixed-price'>Highest Bid</div>
                  <div className='price'>20.00 ETH</div>
                </div>
              </div>
            ) : (
              <div>
                <div className='fixed-price'>Fixed price</div>
                <div className='price'>50.00 ETH</div>
              </div>
            )}
          </div>
          <div className='creator'>
            <Avatar
              size={{ xs: 12, sm: 16, md: 22, lg: 30, xl: 30, xxl: 30 }}
              src='/avatar.jpg'
            />
            Created by <div className='creator-name'>@Changgggg</div>
          </div>
          <div className='details-btn-container'>
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

export default CardItemSmall
