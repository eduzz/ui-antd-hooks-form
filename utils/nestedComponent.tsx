import type { ComponentType } from 'react';

export default function nestedComponent<P, N>(component: ComponentType<P>, nested: N): ComponentType<P> & N {
  Object.keys(nested as any).forEach(key => {
    (component as any)[key] = (nested as any)[key];
  });

  return component as any;
}
