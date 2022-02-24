import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DefaultLayout from '../../components/layout/default-layout'
import { ListCustom } from './components'
import VerifyIcon from '../../assest/icon/verified-icon.svg'
import CopyIcon from '../../assest/icon/copy-link.svg'
import { Tabs, Pagination, message } from 'antd'
import { useWindowSize } from '../../utils/useWindowSize'
import { CustomTooltip, CustomButton } from '../../components/common'
import copy from 'copy-to-clipboard'
import './styles.scss'

const STEP = 12
const MOBILE_STEP = 4

const Profile = () => {
  const { TabPane } = Tabs
  const [isMobile] = useWindowSize(576)
  const [startOffset, setStartOffset] = useState(0)
  const [endOffset, setEndOffset] = useState(isMobile ? MOBILE_STEP : STEP)
  const [isBioOpen, setIsBioOpen] = useState(false)

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
      name: 'For sale',
      data: listData,
    },
    {
      name: 'Owned',
      data: listData,
    },
    {
      name: 'Created',
      data: listData,
    },
    {
      name: 'Liked',
      data: listData,
    },
  ]

  const bio =
    'My crush is beautiful. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'

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

  function shortenAddress(address = '', start = 10, chars = 4) {
    return `${address.substring(0, start)}...${address.substring(
      address.length - chars
    )}`
  }

  const truncateBio = (data) => {
    const bio = data.substring(0, 120)
    return `${bio}...`
  }

  // Copy user ETH address to clipboard
  const copyAddressToClipboard = (walletAddress) => {
    copy(walletAddress)
    message.success({
      content: 'Address copied to clipboard',
      className: 'copy-message',
    })
  }

  return (
    <DefaultLayout>
      <div className='profile'>
        <div className='profile-banner d-flex'>
          <div className='title'>Author Profile</div>
          <div className='edit-profile-btn-container'>
            <Link to='/'>
              <CustomButton color='pink-hover-blue' shape='small-radius'>
                Edit Profile
              </CustomButton>
            </Link>
          </div>
        </div>
        <div className='profile-content-container d-flex'>
          <div className='author-information'>
            <div className='author-avatar'>
              <img className='avatar' src='/avatar.jpg' alt='avatar' />
              <img className='verify-icon' src={VerifyIcon} alt='verify icon' />
            </div>
            <CustomTooltip placement='topLeft' title='Changgggggggggg'>
              <div className='author-name'>Changgggggggggg</div>
            </CustomTooltip>
            <div className='author-description'>
              {bio?.length != 0 ? (
                isBioOpen ? (
                  <div>
                    {bio}
                    <div
                      className='show-less'
                      onClick={() => setIsBioOpen(false)}
                    >
                      Show less
                    </div>
                  </div>
                ) : (
                  <div>
                    {truncateBio(bio)}
                    <div
                      className='show-more'
                      onClick={() => setIsBioOpen(true)}
                    >
                      Show more
                    </div>
                  </div>
                )
              ) : (
                ''
              )}
            </div>
            <div
              className='author-address'
              onClick={() =>
                copyAddressToClipboard(
                  '0x7e85d848f32d46593a8ce1fb93aa6827f2e9c101'
                )
              }
            >
              <div className='address'>
                <CustomTooltip
                  placement='topLeft'
                  title='0x7e85d848f32d46593a8ce1fb93aa6827f2e9c101'
                >
                  {shortenAddress('0x7e85d848f32d46593a8ce1fb93aa6827f2e9c101')}
                </CustomTooltip>
              </div>
              <img className='copy-icon' src={CopyIcon} alt='copy-icon' />
            </div>
            <div className='author-count-items-container'>
              {dummyData?.map((ele, index) => {
                return (
                  <div
                    className='attribute-container d-flex justify-content-space-between'
                    key={index}
                  >
                    <div className='attribute-name'>{ele?.name}</div>
                    <div className='number'>{ele?.data.length}</div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='profile-content'>
            <Tabs type='card'>
              {dummyData?.map((ele, index) => {
                return (
                  <TabPane
                    tab={`${ele?.name} (${ele?.data.length})`}
                    key={index + 1}
                  >
                    <ListCustom
                      data={ele?.data.slice(startOffset, endOffset)}
                      key={index}
                    />
                    <Pagination
                      className='profile-pagination'
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
      </div>
    </DefaultLayout>
  )
}

export default Profile
