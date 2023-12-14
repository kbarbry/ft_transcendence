import React, { useState, useEffect } from 'react';
import { Alert } from 'antd';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

interface PopUpErrorProps {
  message: string;
}

const PopUpError: React.FC<PopUpErrorProps> = ({ message }) => {
  const [isAlertVisible, setIsAlertVisible] = useState(true);

  useEffect(() => {
    // Réinitialiser l'état lorsque le message change
    setIsAlertVisible(true);
  }, [message]);

  const handleClose = () => {
    setIsAlertVisible(false);
  };

  return (
    <>
      {isAlertVisible && (
        <Alert
          message='Error'
          description={message}
          type='error'
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={handleClose}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
        />
      )}
    </>
  );
};

export default PopUpError;
