import React, { useCallback, useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import { useSelector } from 'react-redux'
import { AutoComplete, Card, Tooltip } from 'antd'
// import { roundNumber, setTokenType } from 'utils/func'
import { debounce } from 'lodash'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
// import nftService from 'service/nftService'
// import * as message from 'utils/custom-message'

import noItem from '../../../../../assest/image/no-item.png'
// import SearchItemImage from './SearchItemImage'

const { Option } = AutoComplete

const SearchHeaderBar = () => {
  const { t } = useTranslation()
  const globalLoading = useSelector((state) => state?.globalLoading)

  const [keyword, setKeyword] = useState(null)
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)

  const handleChangeSearch = (value) => {
    setKeyword(value?.trim())
  }

  const handleSearch = useCallback(async (keyword) => {
    setLoading(true)
    // const [data, err] = await nftService.getNftsSearch({ keyword })
    // if (data) {
    //   setResult(data)
    // }
    // if (err) {
    //   message.error('Some thing went wrong!')
    // }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (keyword) {
      handleSearch(keyword)
    }
  }, [keyword, handleSearch])

  return (
    <AutoComplete
      onChange={debounce(handleChangeSearch, 300)}
      placeholder='Search for items'
      dropdownClassName='dropdown-search-header'
      dropdownMatchSelectWidth={false}
    >
      {loading && !globalLoading?.loading ? (
        <Option style={{ padding: 24 }}>
          <div className='d-flex justify-content-center align-items-center'>
            <ReactLoading
              className='btn-load d-flex justify-content-center align-items-center'
              type='spinningBubbles'
              color='#002979'
            />
          </div>
        </Option>
      ) : (
        <Option className='title text-center'>
          <img src={noItem} alt='' />
          <p style={{ marginTop: 22 }}>No Items Found</p>
        </Option>
      )}
    </AutoComplete>
  )
}

export default SearchHeaderBar
