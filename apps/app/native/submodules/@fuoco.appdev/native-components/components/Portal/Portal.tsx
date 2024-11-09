import React, { useContext, useEffect } from 'react';
import { PortalContext } from './PortalProvider';

export interface PortalProps {
  children: React.ReactNode;
  name: string;
}

export default function Portal({ children, name }: PortalProps) {
  const { addComponent, removeComponent } = useContext(PortalContext);
  useEffect(() => {
    addComponent({ name, component: children });
    return () => {
      removeComponent(name);
    };
  }, [children, name]);

  return null;
}
