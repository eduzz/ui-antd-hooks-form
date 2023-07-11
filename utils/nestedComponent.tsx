export default function nestedComponent<P, N>(component: P, nested: N): P & N {
  Object.keys(nested as any).forEach(key => {
    (component as any)[key] = (nested as any)[key];
  });

  return component as any;
}
