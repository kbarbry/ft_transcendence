import { notification } from 'antd'
import { ReactNode } from 'react'

const SuccessNotification = (title: string, description: string, icon?: ReactNode) => {
  notification.success({
    message: title,
    description: description,
    placement: 'topRight',
    icon: icon
  })
}

export default SuccessNotification
