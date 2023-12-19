import { notification } from 'antd'
import { ReactNode } from 'react'

const ErrorNotification = (title: string, description: string, icon?: ReactNode) => {
  notification.error({
    message: title,
    description: description,
    placement: 'topRight',
    icon: icon
  })
}

export default ErrorNotification
