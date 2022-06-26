import type { ZoneEntity } from '../zoneEntity';

type mixin = (base: typeof ZoneEntity) => typeof ZoneEntity;

export const composeMixins = (...fns: Array<mixin>) => {
  return (base: typeof ZoneEntity) => {
    return fns.reduce((acc, fn) => {
      return fn(acc);
    }, base);
  };
};
