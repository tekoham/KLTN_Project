import React from 'react'
import { Row, Col } from 'antd'
import { loremIpsumGenerator } from '../../../utils/textGenerator'

const Advertisement = () => {
  const data = [
    { order: '01', name: 'High Quality With Unique Art' },
    { order: '02', name: 'Creator Reliability And Trust' },
    { order: '03', name: 'Built For Speed, Performance' },
    { order: '04', name: 'Secondary Market' },
    { order: '05', name: 'Show Your Support' },
    { order: '06', name: 'Reduce The Environmental' },
  ]
  return (
    <div className='advertisement-container'>
      <Row justify='space-between' gutter={[32, 32]}>
        {data?.map((ele, index) => {
          return (
            <Col
              key={index}
              xxl={8}
              xl={8}
              lg={8}
              md={12}
              sm={24}
              xs={24}
              className='advertisement d-flex'
            >
              <div className='order'>{ele?.order}</div>
              <div className='advertisement-content'>
                <div className='advertisement-title'>{ele?.name}</div>
                <div className='advertisement-description'>
                  {loremIpsumGenerator(105)}.
                </div>
              </div>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default Advertisement
