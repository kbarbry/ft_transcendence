import React from 'react'
import { useAppSelector } from '../store/hooks'
import UpdateProfil from './UpdateProfilForm'
import { Space } from 'antd'
import Settings from '../auth/2fa/settings'

export const ProfilPage: React.FC = () => {
  const user = useAppSelector((state) => state.userInformations.user)
  return (
    <Space direction='vertical'>
      <h1>User Informations</h1>
      <a href={user?.avatarUrl ?? undefined} target='_blank'>
        <img
          src={user?.avatarUrl || undefined}
          className='avatar'
          alt='Avatar'
          style={{ width: '100px', height: '100px' }}
        />
      </a>
      <p>AvatarUrl: {user?.avatarUrl}</p>
      <p>Id: {user?.id}</p>
      <p>Mail: {user?.mail}</p>
      <p>Username: {user?.username}</p>
      <p>Status: {user?.status}</p>
      <p>Language: {user?.languages}</p>
      <h2>Player Informations</h2>
      <p>Level: {user?.level.toFixed(1)}</p>
      <UpdateProfil />
      <Settings />
    </Space>
  )
}
