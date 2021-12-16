import React from 'react'
import HeaderNav from './header'
import Footer from './footer'
import PropTypes from 'prop-types'

import { useSelector } from 'react-redux'

import ReactLoading from 'react-loading'

import { Modal } from 'antd'

import './style.scss'

const DefaultLayout = ({ isActiveFooter, children }) => {
  const globalLoading = useSelector((state) => state.globalLoading?.loading)
  return (
    <div className='default-layout'>
      <div></div>
      <HeaderNav />
      {children}
      {isActiveFooter && <Footer />}
      {globalLoading && (
        <Modal
          closable={false}
          className='custom-loading-modal'
          centered
          footer={null}
          visible={true}
        >
          <ReactLoading type='spinningBubbles' color='#002979' />
        </Modal>
      )}
    </div>
  )
}

DefaultLayout.propTypes = {
  isActiveFooter: PropTypes.bool,
}
DefaultLayout.defaultProps = {
  isActiveFooter: true,
}

export default DefaultLayout
