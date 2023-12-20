import React, { useState, useEffect } from 'react'
import { Alert } from 'antd'

interface PopUpErrorProps {
  message: string
}

const PopUpError: React.FC<PopUpErrorProps> = ({ message }) => {
  const [isAlertVisible, setIsAlertVisible] = useState(true)

  useEffect(() => {
    // Réinitialiser l'état lorsque le message change
    setIsAlertVisible(true)
  }, [message])

  return (
    <>
      {isAlertVisible && (
        <Alert message='Error' description={message} type='error' />
      )}
    </>
  )
}

export default PopUpError
