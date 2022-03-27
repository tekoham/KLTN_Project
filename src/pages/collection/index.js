import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import DefaultLayout from '../../components/layout/default-layout'
import { ListCustom } from '../../components/common'
import CopyIcon from '../../assest/icon/copy-link.svg'
import noItem from '../../assest/image/no-item.png'
import { Pagination, message } from 'antd'
import { useWindowSize } from '../../utils/useWindowSize'
import { CustomTooltip, CustomButton } from '../../components/common'
import { stringRandom, type, randomImage } from '../../utils/randomData'
import copy from 'copy-to-clipboard'
import './styles.scss'

const STEP = 12
const MOBILE_STEP = 4

const Collection = () => {
  const [isMobile] = useWindowSize(576)
  const [isBioOpen, setIsBioOpen] = useState(false)
  const [startOffset, setStartOffset] = useState(0)
  const [endOffset, setEndOffset] = useState(isMobile ? MOBILE_STEP : STEP)

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
      <div className='collection'>
        <div className='collection-banner d-flex'>
          <div className='title'>Author Collection</div>
          <div className='edit-collection-btn-container'>
            <Link to='/'>
              <CustomButton color='pink-hover-blue' shape='small-radius'>
                Edit Collection
              </CustomButton>
            </Link>
          </div>
        </div>
        <div className='collection-content-container d-flex'>
          <div className='collection-information'>
            <div className='collection-avatar'>
              <img className='avatar' src='/avatar.jpg' alt='avatar' />
            </div>
            <CustomTooltip placement='topLeft' title='Changgggggggggg'>
              <div className='collection-name'>Changgggggggggg</div>
            </CustomTooltip>
            <div className='collection-description'>
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
              className='collection-address'
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
            <div className='total-item-number d-flex'>
              <span className='header'>Total nfts</span>
              <span className='number'>{listData?.length}</span>
            </div>
          </div>

          {listData?.length > 0 ? (
            <div className='collection-content'>
              <ListCustom
                data={listData?.slice(startOffset, endOffset)}
                span={{ xxl: 6, xl: 8, lg: 12, md: 12, sm: 24, xs: 24 }}
              />
              <Pagination
                className='collection-pagination'
                defaultCurrent={1}
                total={listData?.length}
                pageSize={isMobile ? MOBILE_STEP : STEP}
                onChange={onChangePage}
              />
            </div>
          ) : (
            <NoItem />
          )}
        </div>
      </div>
    </DefaultLayout>
  )
}

//Display if collection has no NFT
const NoItem = () => {
  const history = useHistory()

  return (
    <div className='no-item-container d-flex align-items-center'>
      <img src={noItem} alt='' />
      <div>No items found</div>
      <div>
        This collection hasn't had any item yet! Try to browse something for you
        on our marketplace
      </div>
      <CustomButton
        color='pink-hover-blue'
        className='btn-browse'
        onClick={() =>
          history.push({
            pathname: '/marketplace',
          })
        }
      >
        Browse Marketplace
      </CustomButton>
    </div>
  )
}

export default Collection
