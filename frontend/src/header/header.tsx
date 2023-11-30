import React from 'react'
import { Link } from 'wouter'
import App_private from '../App_private'

export const Header: React.FC = () => {
  return (
    <>
      <Link href='/home'>
        <a>Home</a>
      </Link>
      <App_private child={HeaderPrivate} />
    </>
  )
}

export const HeaderPrivate: React.FC = () => {
  return (
    <>
      <Link href='/chat'>
        <a>Chat Discussion</a>
      </Link>
      <Link href='/testUser'>
        <a>Test getUser</a>
      </Link>
    </>
  )
}
