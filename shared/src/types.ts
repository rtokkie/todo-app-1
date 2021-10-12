export type FirstParam<Fn extends (...args: unknown[]) => unknown> =
  Parameters<Fn>['length'] extends 0 ? void : Parameters<Fn>[0]
