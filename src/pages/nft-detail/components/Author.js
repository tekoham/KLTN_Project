import React from 'react'
import { CustomTooltip } from '../../../components/common'
import VerifiedIcon from '../../../assest/icon/verified-icon.svg'

const Author = (props) => {
  const { listData } = props || {}
  return (
    <div className='collectible-author-info d-flex'>
      <div className='collectible-creator d-flex align-items-center'>
        <div className='avatar-container'>
          <img
            className='avatar'
            src={listData?.creator?.avatar}
            alt='owner avatar'
          ></img>
          {listData?.creator?.verified ? (
            <img
              className='verified-icon'
              src={VerifiedIcon}
              alt='verified icon'
            ></img>
          ) : (
            ''
          )}
        </div>
        <div className='info'>
          <CustomTooltip placement='topLeft' title={listData?.creator?.name}>
            <div className='name'>{listData?.creator?.name}</div>
          </CustomTooltip>
          <div className='role'>Item Creator</div>
        </div>
      </div>
      <div className='collectible-owner d-flex align-items-center'>
        <div className='avatar-container'>
          <img
            className='avatar'
            src={listData?.owner?.avatar}
            alt='owner avatar'
          ></img>
          {listData?.owner?.verified ? (
            <img
              className='verified-icon'
              src={VerifiedIcon}
              alt='verified icon'
            ></img>
          ) : (
            ''
          )}
        </div>
        <div className='info'>
          <CustomTooltip placement='topLeft' title={listData?.owner?.name}>
            <div className='name'>{listData?.owner?.name}</div>
          </CustomTooltip>
          <div className='role'>Item Owner</div>
        </div>
      </div>
      <div className='collectible-collection d-flex align-items-center'>
        <div className='avatar-container'>
          <img
            className='avatar'
            src={listData?.collection?.avatar}
            alt='owner avatar'
          ></img>
          {listData?.collection?.verified ? (
            <img
              className='verified-icon'
              src={VerifiedIcon}
              alt='verified icon'
            ></img>
          ) : (
            ''
          )}
        </div>
        <div className='info'>
          <CustomTooltip placement='topLeft' title={listData?.collection?.name}>
            <div className='name'>{listData?.collection?.name}</div>
          </CustomTooltip>
          <div className='role'>Item Collection</div>
        </div>
      </div>
    </div>
  )
}

export default Author
