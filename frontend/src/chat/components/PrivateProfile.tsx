import React from 'react'
import { User } from '../../gql/graphql'
import DefaultProfilePicture from '/DefaultProfilePicture.svg'

interface PrivateProfileProps {
  member: User
}

const PrivateProfile: React.FC<PrivateProfileProps> = ({ member }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
      <img
        src={member?.avatarUrl ? member.avatarUrl : DefaultProfilePicture}
        alt={`Profile for ${member.username}`}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          marginRight: '10px'
        }}
      />
      <span>{member.username}</span>
    </div>
  )
}

export default PrivateProfile
