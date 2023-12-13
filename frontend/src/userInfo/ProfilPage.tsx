import React from 'react'
import { useAppSelector } from '../store/hooks'
import { Link } from 'wouter'

export const ProfilPage: React.FC = () => {
  let user = useAppSelector((state) => state.userInformations.user)
  return (
    <>
      <div>
        <h1>User Informations</h1>
      </div>
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
        <Link href='/updateInfo'>
          <button> Update 🔏 </button>
        </Link>
      </div>
      <div>
        <h2>Player Informations</h2>
      </div>
      <div>Level: {user?.level}</div>
    </>
  )
}
