import React, { useState } from 'react'
import { Tabs, Pagination } from 'antd'
import { useHistory } from 'react-router-dom'
import { ListCustom, CustomButton } from '../../components/common'
import { useWindowSize } from '../../utils/useWindowSize'
import DefaultLayout from '../../components/layout/default-layout'
import { stringRandom, randomImage, type } from '../../utils/randomData'
import noItem from '../../assest/image/no-item.png'
import './styles.scss'

const STEP = 20
const MOBILE_STEP = 5

const Marketplace = (props) => {
  const { TabPane } = Tabs
  const [isMobile] = useWindowSize(576)
  const [startOffset, setStartOffset] = useState(0)
  const [endOffset, setEndOffset] = useState(isMobile ? MOBILE_STEP : STEP)

  const listData = new Array(24).fill(undefined).map((ele, index) => {
    return {
      id: index,
      name: stringRandom(true),
      startDate: Date.now(),
      expireDate: Math.floor(Math.random() * Date.now()) + 400,
      type: type[Math.floor(Math.random() * type.length)],
      price: Math.random().toFixed(3),
      likes: Math.floor(Math.random() * 100) + 1,
      image: randomImage(),
      creator: 'Changgggg',
    }
  })

  const dummyData = [
    {
      name: 'All NFTs',
      data: listData,
    },
    {
      name: 'Arts',
      data: listData,
    },
    {
      name: 'Photos',
      data: listData,
    },
    {
      name: 'Sports',
      data: [],
    },
    {
      name: 'Games',
      data: listData,
    },
    {
      name: 'GIFs',
      data: listData,
    },
  ]

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

  return (
    <DefaultLayout>
      <div className='marketplace-container'>
        <div className='marketplace-header-container d-flex'>
          <div className='title'>Welcome to our marketplace</div>
          <div className='subtitle'>
            Browse through and choose your favorite NFT
          </div>
        </div>
        <div className='marketplace-content-container'>
          {listData?.length > 0 ? (
            <Tabs
              type='card'
              tabBarExtraContent={{
                left: <div className='content-title'>Marketplace</div>,
              }}
            >
              {dummyData?.map((ele, index) => {
                return (
                  <TabPane tab={`${ele?.name}`} key={index + 1}>
                    <ListCustom
                      data={ele?.data.slice(startOffset, endOffset)}
                      span={{ xxl: 6, xl: 6, lg: 8, md: 12, sm: 24, xs: 24 }}
                      key={index}
                    />
                    <Pagination
                      className='marketplace-pagination'
                      defaultCurrent={1}
                      total={ele?.data.length}
                      pageSize={isMobile ? MOBILE_STEP : STEP}
                      onChange={onChangePage}
                    />
                  </TabPane>
                )
              })}
            </Tabs>
          ) : (
            <div>
              <div className='no-item-title'>Marketplace</div>
              <NoItem />
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  )
}

//Display if marketplace has no NFT
const NoItem = () => {
  const history = useHistory()

  return (
    <div className='no-item-container d-flex align-items-center'>
      <img src={noItem} alt='' />
      <div>No items found</div>
      <div>Oops sorry! Look like our marketplace is currently empty</div>
      <CustomButton
        color='pink-hover-blue'
        className='btn-browse'
        onClick={() =>
          history.push({
            pathname: '/',
          })
        }
      >
        Go back to Homepage
      </CustomButton>
    </div>
  )
}

export default Marketplace
