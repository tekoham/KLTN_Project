import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { CustomButton } from '../../../components/common'

const listCategories = [
  {
    id: 0,
    categoriesTitle: 'Art',
    active: false,
  },
  {
    id: 1,
    categoriesTitle: 'Photo',
    active: false,
  },
  {
    id: 2,
    categoriesTitle: 'Sport',
    active: false,
  },
  {
    id: 3,
    categoriesTitle: 'Game',
    active: false,
  },
  {
    id: 4,
    categoriesTitle: 'GIF',
    active: false,
  },
]

//categories button
const Categories = forwardRef((props, ref) => {
  const { handleSetActiveCategories, type } = props

  const [listButton, setListButton] = useState(listCategories)

  useImperativeHandle(ref, () => ({
    resetListButton() {
      handleActiveButton(-1)
    },
  }))

  const handleActiveButton = (id) => {
    let _listButton = [...listButton]
    _listButton?.forEach((btn) => {
      btn?.id !== id || (btn?.id === id && btn?.active)
        ? (btn.active = false)
        : (btn.active = true)
    })
    id !== type ? handleSetActiveCategories(id) : handleSetActiveCategories(-1)
    setListButton(_listButton)
  }

  return (
    <div className='categories-container '>
      <div className='d-flex'>
        {listButton?.map((item, index) => (
          <CustomButton
            key={index}
            color={item?.active ? 'pink' : 'content-blue'}
            onClick={() => handleActiveButton(item?.id)}
            className='button-categories'
          >
            {item?.categoriesTitle}
          </CustomButton>
        ))}
      </div>
    </div>
  )
})

export default Categories
