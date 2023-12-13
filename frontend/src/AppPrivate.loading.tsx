import React, { useState, useEffect } from 'react'
import { Progress } from 'antd'

interface AppPrivateLoadingProps {
  userInfos: boolean
  storeInfos: boolean
  subscriptions: boolean
}

const AppPrivateLoading: React.FC<AppPrivateLoadingProps> = ({
  userInfos,
  storeInfos,
  subscriptions
}) => {
  const [currentProgress, setCurrentProgress] = useState(0)

  useEffect(() => {
    const trueCount = [userInfos, storeInfos, subscriptions].filter(
      (value) => value
    ).length
    const targetProgress = (trueCount / 3) * 100

    const transitionDuration = 980
    const steps = 50

    const increment = (targetProgress - currentProgress) / steps

    const interval = setInterval(() => {
      setCurrentProgress((prevProgress) => {
        const newProgress = prevProgress + increment
        return newProgress >= targetProgress ? targetProgress : newProgress
      })
    }, transitionDuration / steps)

    return () => clearInterval(interval)
  }, [userInfos, storeInfos, subscriptions])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        color: '#fff',
        fontFamily: 'Ant Design, sans-serif',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
      }}
    >
      <Progress
        type='circle'
        percent={currentProgress}
        format={(percent) => (percent ? percent.toFixed(1) + '%' : '0%')}
        strokeColor={{
          '0%': '#108ee9',
          '100%': '#87d068'
        }}
        style={{ transition: 'all 1s ease-in-out' }}
      />
      <h2 style={{ color: '#fff', marginTop: '10px' }}>
        Charging data of your transcendent experience...
      </h2>
    </div>
  )
}

export default AppPrivateLoading
