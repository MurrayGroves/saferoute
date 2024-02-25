export type UnwrapForwardRefExoticComponent<T> =
  T extends React.ForwardRefExoticComponent<infer P> ? P : never;

export type LatLong = [number, number];
