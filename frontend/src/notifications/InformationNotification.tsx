import { notification } from 'antd'
import { ReactNode } from 'react'

const InfoNotification = (title: string, description: string, icon?: ReactNode) => {
  notification.info({
    message: title,
    description: description,
    placement: 'topRight',
    icon: icon
  })
}

export default InfoNotification
