import React from 'react'
import { useAppSelector } from '../store/hooks'
import UpdateProfil from './UpdateProfilForm'
import { Space } from 'antd'

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
      <div>AvatarUrl: {user?.avatarUrl}</div>
      <div>Id: {user?.id}</div>
      <div>Mail: {user?.mail}</div>
      <div>Username: {user?.username}</div>
      <div>Status: {user?.status}</div>
      <div>Language: {user?.languages}</div>
      <br></br>
      <div>
        <h2>Player Informations</h2>
      </div>
      <div>Level: {user?.level}</div>
      <br></br>
      <br></br>
      <br></br>
      <UpdateProfil />
    </Space>
  )
}
