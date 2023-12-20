import { Result, Button } from 'antd'
import React from 'react'
import { useLocation } from 'wouter'

export const NotFound: React.FC = () => {
  const [, setLocation] = useLocation()

  const handleOnAddFriendClick = () => {
    setLocation('/')
  }

  return (
    <div>
      <Result
        status='404'
        title='404'
        subTitle='Sorry, the page you visited does not exist.'
      />
      <Button
        type='text'
        block
        style={{
          height: '50px',
          border: '1px solid #333',
          borderRadius: '3px',
          transition: 'background-color 0.3s'
        }}
        onClick={() => handleOnAddFriendClick()}
      >
        Go Home
      </Button>
    </div>
  );
};

export default NotFound;
