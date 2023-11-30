import React, { useEffect } from 'react';
import { useLocation } from 'wouter';

export const ForbiddenAccess = () => {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    setLocation('/', { replace: true });
  }, []);

  return (
    <p>403 Forbidden Access!</p>
  );
};
