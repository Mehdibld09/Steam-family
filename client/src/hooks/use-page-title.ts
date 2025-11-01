import { useEffect } from 'react';
import { useLocation } from 'wouter';

const DEFAULT_TITLE = 'Steam Family';

const getTitleFromPath = (path: string) => {
  switch (path) {
    case '/':
      return DEFAULT_TITLE;
    case '/login':
      return `Login - ${DEFAULT_TITLE}`;
    case '/register':
      return `Register - ${DEFAULT_TITLE}`;
    case '/privacy':
      return `Privacy Policy - ${DEFAULT_TITLE}`;
    case '/terms':
      return `Terms of Service - ${DEFAULT_TITLE}`;
    case '/admin':
      return `Admin - ${DEFAULT_TITLE}`;
    default:
      if (path.startsWith('/tool/')) {
        // The specific tool name will be set by the ToolDetail component
        return DEFAULT_TITLE;
      }
      return `Page Not Found - ${DEFAULT_TITLE}`;
  }
};

export const usePageTitle = (specificTitle?: string) => {
  const [location] = useLocation();
  
  useEffect(() => {
    document.title = specificTitle || getTitleFromPath(location);
  }, [location, specificTitle]);
};