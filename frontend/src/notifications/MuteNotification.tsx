import { notification } from 'antd'
import { ReactNode } from 'react'

const Notification = (title: string, description: string, icon?: ReactNode) => {
  notification.warning({
    message: title,
    description: description,
    placement: 'topRight',
    icon: icon
  })
}

export default Notification
