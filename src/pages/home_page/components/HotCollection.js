import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Avatar, Row, Col } from 'antd'
import { CustomTooltip } from '../../../components/common'

const HotCollection = (props) => {
  const { stringRandom, randomImage } = props || {}
  const dummyData = new Array(4).fill(undefined).map((ele, index) => {
    return {
      name: stringRandom(true),
      totalNFTs: 590,
      avatar: randomImage(),
      cover: randomImage(),
    }
  })
  return (
    <div className='hot-collection'>
      <div className='title'>Hot Collections</div>
      <Row gutter={[32, 16]}>
        {dummyData.map((collection, index) => {
          return (
            <Col span={6} key={index}>
              <Card
                cover={
                  <Link to='/'>
                    <img alt='collection cover image' src={collection?.cover} />
                  </Link>
                }
                key={index}
              >
                <img
                  className='collection-avatar'
                  src={collection?.avatar}
                  alt='collection avatar'
                />
                <CustomTooltip placement='topLeft' title={collection?.name}>
                  <div className='collection-name'>{collection?.name}</div>
                </CustomTooltip>
                <div className='number-of-arts'>
                  Number of Art: {collection?.totalNFTs}
                </div>
              </Card>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default HotCollection
