import React, { useEffect, useState } from 'react';

export interface PortalProviderProps {
  children: React.ReactNode;
}
interface Element {
  name: string;
  component: React.ReactNode;
}

export const PortalContext = React.createContext({
  addComponent: (element: Element) => {},
  removeComponent: (name: string) => {},
});

export default function PortalProvider({ children }: PortalProviderProps) {
  const [components, setComponents] = useState<Record<string, React.ReactNode>>(
    {}
  );
  const addComponent = ({ name, component }: Element) => {
    setComponents((prevComponents) => ({
      ...prevComponents,
      [name]: component,
    }));
  };
  const removeComponent = (name: string) => {
    setComponents((prevComponents) => {
      const newComponents = { ...prevComponents };
      delete newComponents[name];
      return newComponents;
    });
  };
  return (
    <PortalContext.Provider value={{ addComponent, removeComponent }}>
      {children}
      {Object.entries(components).map(([name, Component]) => Component)}
    </PortalContext.Provider>
  );
}
