import React, { useEffect } from 'react'
import { useLocation } from 'wouter'

export const ForbiddenAccess: React.FC = () => {
  const [, setLocation] = useLocation()

  useEffect(() => {
    setLocation('/', { replace: true })
  }, [])

  return <p>403 Forbidden Access!</p>
}
