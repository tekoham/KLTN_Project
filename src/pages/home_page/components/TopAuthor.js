import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Row, Col } from 'antd'
import { CustomTooltip } from '../../../components/common'
import verifiedIcon from '../../../assest/icon/verified-icon.svg'
import { stringRandom } from '../../../utils/randomData'

const TopAuthor = () => {
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
              <Link to='/user/1'>
                <Avatar
                  size={{ xs: 40, sm: 50, md: 60, lg: 70, xl: 70, xxl: 70 }}
                  shape='square'
                  src='avatar.jpg'
                />
              </Link>

              <div className='author-info'>
                <CustomTooltip placement='topLeft' title={author?.name}>
                  <Link to='/user/1'>
                    <div className='author-name'>{author?.name}</div>
                  </Link>
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
