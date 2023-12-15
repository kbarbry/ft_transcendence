import React, { useState } from 'react'
import { User } from '../../gql/graphql'
import DefaultProfilePicture from '/DefaultProfilePicture.svg'

interface PrivateProfileProps {
  member: User
}

const PrivateProfile: React.FC<PrivateProfileProps> = ({ member }) => {
  const [showProfileOverlay, setShowProfileOverlay] = useState(false)

  const handleViewProfile = () => {
    setShowProfileOverlay(true)
  }

  const handleCloseOverlay = () => {
    setShowProfileOverlay(false)
  }

  const overlayMouseDownHandler = () => {
    handleCloseOverlay()
  }

  const contentDivClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

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

      <button onClick={handleViewProfile}>View Profile</button>

      {showProfileOverlay && (
        <div
          onMouseDown={overlayMouseDownHandler}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div
            onMouseDown={contentDivClickHandler}
            style={{
              background: '#fff',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center'
            }}
          >
            <img
              src={member.avatarUrl || DefaultProfilePicture}
              alt={`Profile for ${member.username}`}
              style={{ width: '80px', height: '80px', borderRadius: '50%' }}
            />
            <p>{member.username}</p>
            <button onClick={handleCloseOverlay}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PrivateProfile
