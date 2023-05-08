import {
  model,
  Model,
  modelAction,
  prop,
  Ref,
  rootRef,
  tProp,
  types,
} from 'mobx-keystone';
import { Zone } from './zone/zone';
import { computed } from 'mobx';

export enum ColorThemes {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

const zoneRef = rootRef<Zone>('zone_ref', {});

@model('PersistedGame')
export class PersistedGui extends Model({
  colorTheme: tProp(types.enum(ColorThemes), ColorThemes.LIGHT).withSetter(),
}) {}
