import React, { useState, useEffect, useRef, useMemo } from 'react'
import DefaultLayout from '../../components/layout/default-layout'
import { CardActivity, Filter, NoActivity } from './components'
import { Row, Col, Pagination } from 'antd'
import { stringRandom, randomImage } from '../../utils/randomData'
import { useWindowSize } from '../../utils/useWindowSize'
import './styles.scss'

const STEP = 12
const MOBILE_STEP = 4

const Activity = () => {
  const [isMobile] = useWindowSize(576)
  const FilterCustomRef = useRef()
  const [startOffset, setStartOffset] = useState(0)
  const [endOffset, setEndOffset] = useState(isMobile ? MOBILE_STEP : STEP)
  const [type, setType] = useState(-1)
  const status = [0, 1, 2]
  const listData = useMemo(
    () =>
      new Array(23).fill(undefined).map((ele, index) => {
        return {
          id: index,
          name: stringRandom(true),
          actionHappenedAt: Date.now() - Math.random() * 86400,
          status: status[Math.floor(Math.random() * status.length)],
          price: Math.random().toFixed(3),
          image: randomImage(),
          userName: 'KienDaoTrung',
        }
      }),
    [isMobile]
  )
  const [listDemo, setListDemo] = useState(listData)

  const onChangePage = (value) => {
    window.scrollTo({ behavior: 'smooth', top: 220 })
    if (isMobile) {
      setStartOffset(value * MOBILE_STEP - MOBILE_STEP)
      setEndOffset(value * MOBILE_STEP)
    } else {
      setStartOffset(value * STEP - STEP)
      setEndOffset(value * STEP)
    }
  }

  useEffect(() => {
    FilterCustomRef?.current?.resetListButton()
  }, [])

  const handleSetType = (id) => {
    setType(id)
    window.scrollTo({ behavior: 'smooth', top: 0 })
  }

  useEffect(() => {
    if (type != -1) {
      window.scrollTo({ behavior: 'smooth', top: 220 })
      const _listData = listData?.filter((ele) => ele?.status === type)
      setListDemo(_listData)
    } else {
      setListDemo(listData)
    }
  }, [type])
  return (
    <DefaultLayout>
      <div className='activity-container'>
        <div className='activity-banner'>
          <div className='title'>Recent Activity</div>
          <div className='subtitle'>
            You can find all the activity of our website here,
          </div>
          <div className='subtitle'>
            making our website trustworthy and decentralized.
          </div>
        </div>
        <div className='activity-content'>
          <div className='title'>Activity</div>
          {listDemo?.length > 0 ? (
            <div>
              <Filter
                handleSetActiveFilter={handleSetType}
                type={type}
                ref={FilterCustomRef}
              ></Filter>
              <div className='activity-list'>
                <Row gutter={[32, 32]}>
                  {listDemo
                    ?.slice(startOffset, endOffset)
                    .map((activity, index) => {
                      return (
                        <Col
                          key={index}
                          xs={24}
                          sm={24}
                          md={24}
                          lg={24}
                          xl={12}
                          xxl={8}
                        >
                          <CardActivity
                            key={index}
                            data={activity}
                          ></CardActivity>
                        </Col>
                      )
                    })}
                </Row>
                <Pagination
                  className='activity-pagination'
                  defaultCurrent={1}
                  total={listDemo?.length}
                  pageSize={isMobile ? MOBILE_STEP : STEP}
                  onChange={onChangePage}
                />
              </div>
            </div>
          ) : (
            <NoActivity></NoActivity>
          )}
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Activity
