import React, { useState } from 'react'
import { Tabs, Pagination } from 'antd'
import { ListCustom } from '../../components/common'
import { useWindowSize } from '../../utils/useWindowSize'
import DefaultLayout from '../../components/layout/default-layout'
import './styles.scss'

const STEP = 20
const MOBILE_STEP = 5

const Marketplace = (props) => {
  const { TabPane } = Tabs
  const [isMobile] = useWindowSize(576)
  const [startOffset, setStartOffset] = useState(0)
  const [endOffset, setEndOffset] = useState(isMobile ? MOBILE_STEP : STEP)

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
  const randomImage = () => {
    return (
      `https://source.unsplash.com/random/500x500?sig=${
        Math.floor(Math.random() * 100) + 1
      }` || ''
    )
  }
  const type = ['fixed_price', 'auction']
  const listData = new Array(24).fill(undefined).map((ele, index) => {
    return {
      id: index,
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

  const dummyData = [
    {
      name: 'All NFTs',
      data: listData,
    },
    {
      name: 'Art',
      data: listData,
    },
    {
      name: 'Photo',
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
      {' '}
      <div className='marketplace-container'>
        <div className='marketplace-header-container d-flex'>
          <div className='title'>Welcome to our marketplace</div>
          <div className='subtitle'>
            Browse through and choose your favorite NFT
          </div>
        </div>
        <div className='marketplace-content-container'>
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
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Marketplace
