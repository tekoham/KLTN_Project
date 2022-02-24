import React from 'react'
import { Row, Col } from 'antd'
import { CardItemSmall } from '../../../components/common'
import '../styles.scss'

const ListCustom = (props) => {
  const { data } = props || {}
  return (
    <div className='list-custom'>
      <Row gutter={[{ sm: 16, md: 16, lg: 16, xl: 24, xxl: 36 }, 24]}>
        {data?.map((item) => {
          return (
            <Col key={item.id} xxl={6} xl={8} lg={12} md={12} sm={12} xs={24}>
              <CardItemSmall className='card-item' data={item} />
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default ListCustom
