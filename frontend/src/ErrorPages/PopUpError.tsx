import React from 'react'
import { Alert } from 'antd'

interface PopUpErrorProps {
  message: string
}

const PopUpError: React.FC<PopUpErrorProps> = ({ message }) => {
  return (
    <Alert
      message='Error'
      description={message}
      type='error'
      showIcon
      closable
    />
  )
}

export default PopUpError
