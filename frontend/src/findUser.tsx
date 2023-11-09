import React from 'react';
import { useQuery, gql } from '@apollo/client';

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
}`
;

function findUser() {
  const findOneUserId = 'sk8WUSairiEYG7m3dtykb';

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
  const username = user.username;

  return (
    <div>
      <h1>User Information</h1>
      <p>Username: {username}</p>
      <p>mail: {user.mail}</p>
      <p>avatarUrl:   {user.avatarUrl}</p>
    </div>
  );
}

export default findUser;
