import React, { useCallback, useState } from 'react'
import classNames from 'classnames'

//components
import { Tooltip } from 'antd'

//image
import AddFilledIcon from '../../../../assest/icon/add-filled-icon.svg'

//style
import './style.scss'

const CreateCollectionSelected = ({
  onCreateColletion,
  onChange,
  value,
  listOfCollections,
}) => {
  const [selectedCollection, setSellectedCollection] = useState(value)

  const handleSelectCollection = useCallback(
    (selected) => {
      setSellectedCollection(selected)
      if (onChange) {
        onChange(selected)
      }
    },
    [onChange, setSellectedCollection]
  )

  return (
    <div className='create-nft-collections'>
      <div className='create-nft-collections_item' onClick={onCreateColletion}>
        <img
          className='create-nft-collections_item__icon'
          src={AddFilledIcon}
        />
        <span className='create-nft-collections_item__title'>Create</span>
      </div>

      {listOfCollections?.map((item, index) => (
        <div
          onClick={() => {
            handleSelectCollection(item?.id)
          }}
          key={index}
          className={classNames({
            'create-nft-collections_item': true,
            active: selectedCollection === item?.id,
          })}
        >
          <img
            alt='collection'
            className='create-nft-collections_item__icon'
            name='logo-icon'
            src={item?.imageUrl}
          />

          <Tooltip title={item?.name}>
            <span className='create-nft-collections_item__title'>
              {item?.name}
            </span>
          </Tooltip>
        </div>
      ))}
    </div>
  )
}

export default CreateCollectionSelected
