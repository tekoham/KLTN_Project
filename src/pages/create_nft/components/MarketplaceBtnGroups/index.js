import React, { useState, useCallback } from 'react'
import classNames from 'classnames'

//icon
import PriceTagIcon from '../../../../assest/icon/price-tag-icon.svg'
import TimeRestoreIcon from '../../../../assest/icon/time-restore-icon.svg'

//styles
import './style.scss'

const MarketplaceBtnGroups = ({ onChange, options, value }) => {
  const [choosen, setChoosen] = useState(value)

  const handleChange = useCallback(
    (option) => {
      setChoosen(option)
      if (onChange) {
        onChange(option)
      }
    },
    [setChoosen, onChange]
  )

  return (
    <div className='create-nft-marketPlace_btnGroup'>
      <div
        className={classNames({
          'create-nft-marketPlace_btn mr': true,
          active: !isNaN(value)
            ? value === options.FIXED_PRICE
            : choosen === options.FIXED_PRICE,
        })}
        onClick={() => handleChange(options.FIXED_PRICE)}
      >
        <img
          alt=''
          className='create-nft-marketPlace_btn__icon'
          name='price-tag-icon'
          src={PriceTagIcon}
        />
        <span>Fixed price</span>
      </div>
      <div
        className={classNames({
          'create-nft-marketPlace_btn ml': true,
          active: !isNaN(value)
            ? value === options.AUCTION
            : choosen === options.AUCTION,
        })}
        onClick={() => handleChange(options.AUCTION)}
      >
        <img
          className='create-nft-marketPlace_btn__icon restore-icon'
          name='time-restore-icon'
          src={TimeRestoreIcon}
          alt=''
        />
        <span>Times auction</span>
      </div>
    </div>
  )
}

export default MarketplaceBtnGroups
