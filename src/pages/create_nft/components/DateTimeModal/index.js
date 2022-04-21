import React from 'react'

//components
import { Modal, DatePicker } from 'antd'

//utils
import moment from 'moment'

//style
import './styles.scss'

const DateTimePicker = ({ visible, onClose, onChange }) => {
  const handlePicker = (value) => {
    if (value && onChange) {
      onChange(moment(value._d)?.format('YYYY-MM-DD HH:mm:ss'))
    }
  }

  return (
    <Modal
      className='dateTimeModal'
      onCancel={() => {
        onChange(moment()?.format('YYYY-MM-DD hh:mm:ss'))
      }}
      visible={visible}
    >
      {visible && (
        <DatePicker
          className='dateTimeModal'
          showTime
          open={visible}
          onOk={handlePicker}
        />
      )}
    </Modal>
  )
}

export default DateTimePicker
