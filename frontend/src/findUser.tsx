// findUser.tsx
import { useQuery, gql } from '@apollo/client';
import React, { useState, useEffect } from 'react';


export function FindUser(id: string) {
  const findOneUserId = id;
  const FIND_USER_BY_MAIL = gql`
    query($findOneUserId: String!) {
      findOneUser(id: $findOneUserId) {
        avatarUrl
        createdAt
        id
        level
        languages
        mail
        status
        username
      }
    }
  `;
  
  const { loading, error, data } = useQuery(FIND_USER_BY_MAIL, {
    variables: { findOneUserId: findOneUserId },
  });
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const user = data.findOneUser;
  return (
    <div>
      <p>Username: {user.username}</p>
      <p>EMAIL: {user.mail}</p>
    </div>
  );
}

export default FindUser;
