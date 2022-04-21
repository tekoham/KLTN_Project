import React from 'react'
import DefaultLayout from '../../components/layout/default-layout'
import {
  Banner,
  LiveAuction,
  TrendingArtwork,
  TopAuthor,
  Introduce,
  HotCollection,
  Explore,
} from './components'
import { stringRandom, randomImage, type } from '../../utils/randomData'
import './styles.scss'

export default function Home() {
  const dummyData = new Array(6).fill(undefined).map((ele, index) => {
    return {
      name: stringRandom(true),
      startDate: parseInt(Date.now() / 1000),
      expireDate:
        Math.floor(Math.random() * 86400) + parseInt(Date.now() / 1000),
      type: type[Math.floor(Math.random() * type.length)],
      price: Math.random().toFixed(3),
      likes: Math.floor(Math.random() * 100) + 1,
      image: randomImage(),
      creator: 'KienDaoTrung',
    }
  })

  return (
    <DefaultLayout>
      <div className='homepage-container'>
        <Banner />
        <div className='homepage-top-content'>
          <TrendingArtwork dummyData={dummyData} />
          <LiveAuction dummyData={dummyData} />
          <TopAuthor />
        </div>
        <Introduce />
        <HotCollection stringRandom={stringRandom} randomImage={randomImage} />
        <Explore stringRandom={stringRandom} randomImage={randomImage} />
      </div>
    </DefaultLayout>
  )
}
