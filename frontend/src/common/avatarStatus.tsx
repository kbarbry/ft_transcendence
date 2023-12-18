import { useQuery } from '@apollo/client'
import React from 'react'
import {
  EStatus,
  FindLastUserPresenceByUserIdQuery,
  FindLastUserPresenceByUserIdQueryVariables,
  FindOneUserStatusQuery,
  FindOneUserStatusQueryVariables
} from '../gql/graphql'
import { queryFindOneUserPresence, queryFindOneUserStatus } from './graphql'
import { Avatar } from 'antd'
import DefaultProfilePicture from '/DefaultProfilePicture.svg'

export enum ESize {
  small = 1,
  medium = 2,
  large = 3
}

interface avatarStatusProps {
  userId: string
  avatarUrl: string | undefined | null
  size: ESize
}

const AvatarStatus: React.FC<avatarStatusProps> = ({
  userId,
  avatarUrl,
  size
}) => {
  const {
    data: dataStatus,
    loading: loadingStatus,
    error: errorStatus
  } = useQuery<FindOneUserStatusQuery, FindOneUserStatusQueryVariables>(
    queryFindOneUserStatus,
    {
      variables: { findOneUserId: userId },
      fetchPolicy: 'network-only'
    }
  )

  const {
    data: dataPresence,
    loading: loadingPresence,
    error: errorPresence
  } = useQuery<
    FindLastUserPresenceByUserIdQuery,
    FindLastUserPresenceByUserIdQueryVariables
  >(queryFindOneUserPresence, {
    variables: { findLastUserPresenceByUserIdId: userId },
    fetchPolicy: 'network-only'
  })
  console.log(dataPresence, dataStatus)

  if (loadingStatus || loadingPresence) return <></>

  if (errorStatus) return <></>

  const status = dataStatus?.findOneUser.status
  const presence = dataPresence?.findLastUserPresenceByUserId

  let userStatus: EStatus = status ? status : EStatus.Invisble
  if (!presence || errorPresence) userStatus = EStatus.Invisble
  if (presence?.disconnectedAt) userStatus = EStatus.Invisble

  const statusCircleStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: `${size * 12}px`,
    height: `${size * 12}px`,
    borderRadius: '50%',
    border: `${size * 1}px solid white`,
    backgroundColor:
      userStatus === EStatus.Online
        ? 'green'
        : userStatus === EStatus.DoNotDisturb
        ? 'red'
        : userStatus === EStatus.Idle
        ? 'orange'
        : 'gray'
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Avatar size={36 * size} src={avatarUrl || DefaultProfilePicture} />
      <div style={statusCircleStyle} />
    </div>
  )
}

export default AvatarStatus
