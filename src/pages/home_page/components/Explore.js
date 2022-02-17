import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd'
import {
  CustomTooltip,
  CustomButton,
  CardItemSmall,
} from '../../../components/common'

const Explore = (props) => {
  const { stringRandom, randomImage } = props || {}
  const type = ['fixed_price', 'auction']
  const dummyData = new Array(12).fill(undefined).map((ele, index) => {
    return {
      name: stringRandom(true),
      startDate: Date.now(),
      expireDate: Math.floor(Math.random() * Date.now()) + 1000,
      type: type[Math.floor(Math.random() * type.length)],
      price: Math.random().toFixed(3),
      likes: Math.floor(Math.random() * 100) + 1,
      image: randomImage(),
      creator: 'Changgggg',
    }
  })
  return (
    <div className='explore'>
      <div className='d-flex justify-content-space-between'>
        <div className='title'>Featured Assets</div>
        <Link to='/'>
          <CustomButton
            className='explore-more-btn'
            color='pink-hover-blue'
            shape='small-radius'
          >
            Explore more
          </CustomButton>
        </Link>
      </div>
      <div className='featured-assets-container'>
        <Row gutter={[{ xs: 32, sm: 32, md: 32, lg: 32, xl: 32, xxl: 36 }, 32]}>
          {dummyData?.map((item, index) => {
            return (
              <Col
                span={{ xs: 24, sm: 12, md: 12, lg: 8, xl: 6, xxl: 6 }}
                key={index}
              >
                <CardItemSmall data={item}></CardItemSmall>
              </Col>
            )
          })}
        </Row>
      </div>
    </div>
  )
}

export default Explore
