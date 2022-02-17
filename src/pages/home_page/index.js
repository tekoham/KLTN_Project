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
import './styles.scss'

export default function Home() {
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
  const dummyData = new Array(6).fill(undefined).map((ele, index) => {
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
