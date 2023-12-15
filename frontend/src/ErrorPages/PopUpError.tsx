import React, { useState, useEffect } from 'react'
import { Alert } from 'antd'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

interface PopUpErrorProps {
  message: string
}

const PopUpError: React.FC<PopUpErrorProps> = ({ message }) => {
  const [isAlertVisible, setIsAlertVisible] = useState(true)

  useEffect(() => {
    // Réinitialiser l'état lorsque le message change
    setIsAlertVisible(true)
  }, [message])
a
  const handleClose = () => {
    setIsAlertVisible(false)
  }

  return (
    <>
      {isAlertVisible && (
        <Alert message='Error' description={message} type='error' />
      )}
    </>
  )
}

export default PopUpError
