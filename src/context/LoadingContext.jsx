import React, { createContext, useContext, useState, useEffect } from 'react';

const LoadingContext = createContext({
  isLoading: false,
  setLoading: () => {},
  registerResource: () => {},
  resourceLoaded: () => {},
});

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [resources, setResources] = useState({});
  const [totalResources, setTotalResources] = useState(0);

  // Register a new resource that needs to be loaded
  const registerResource = (id) => {
    setResources(prev => ({ ...prev, [id]: false }));
    setTotalResources(prev => prev + 1);
    return id;
  };

  // Mark a resource as loaded
  const resourceLoaded = (id) => {
    if (resources[id] === false) {
      setResources(prev => ({ ...prev, [id]: true }));
    }
  };

  // Check if all resources are loaded
  useEffect(() => {
    if (totalResources === 0) return;
    
    const allLoaded = Object.values(resources).every(loaded => loaded);
    
    if (allLoaded && totalResources > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(totalResources > 0);
    }
  }, [resources, totalResources]);

  return (
    <LoadingContext.Provider value={{ 
      isLoading, 
      setLoading: setIsLoading, 
      registerResource, 
      resourceLoaded 
    }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext); 