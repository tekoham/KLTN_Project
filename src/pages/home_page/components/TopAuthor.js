import React from 'react'
import { Avatar, Row, Col } from 'antd'
import { CustomTooltip } from '../../../components/common'
import verifiedIcon from '../../../assest/icon/verified-icon.svg'

const TopAuthor = () => {
  const stringRandom = (uppcase = false) => {
    const randomString =
      Math.random().toString(36).substring(2, 15) +
      ' ' +
      Math.random().toString(36).substring(2, 15)
    if (uppcase) {
      return randomString
        .toLowerCase()
        .split(' ')
        .map(function (Word) {
          return Word[0].toUpperCase() + Word.substr(1)
        })
        .join(' ')
    }
    return randomString
  }
  const verified = [true, false]
  const dummyData = new Array(12).fill(undefined).map((ele, index) => {
    return {
      name: stringRandom(true),
      totalSell: 590,
      verified: verified[Math.floor(Math.random() * verified.length)],
    }
  })
  return (
    <div className='top-author'>
      <div className='title'>Top Author</div>
      <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 32]}>
        {dummyData.map((author, index) => {
          return (
            <Col className='author-container' span={6} key={index}>
              <div className='order'>{index + 1}.</div>
              <Avatar
                size={{ xs: 40, sm: 50, md: 60, lg: 70, xl: 70, xxl: 70 }}
                shape='square'
                src='avatar.jpg'
              />
              <div className='author-info'>
                <CustomTooltip placement='topLeft' title={author?.name}>
                  <div className='author-name'>{author?.name}</div>
                </CustomTooltip>

                <div className='total-sell'>{author?.totalSell} ETH</div>
              </div>
              {author?.verified == true ? (
                <div className='verified-icon'>
                  <img src={verifiedIcon} alt='verified icon' />
                </div>
              ) : (
                ''
              )}
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default TopAuthor
