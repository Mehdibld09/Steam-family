import { useState, useEffect } from 'react';
import { BaseLocationHook } from 'wouter';

export const useHashLocation: BaseLocationHook = () => {
  const [loc, setLoc] = useState(() => window.location.hash.replace('#', '') || '/');

  useEffect(() => {
    const handler = () => {
      const hash = window.location.hash.replace('#', '') || '/';
      setLoc(hash);
    };

    window.addEventListener('hashchange', handler);
    if (!window.location.hash && loc !== '/') {
      window.location.hash = loc;
    }

    return () => window.removeEventListener('hashchange', handler);
  }, [loc]);

  const navigate = (to: string) => {
    window.location.hash = to;
  };

  return [loc, navigate];
};