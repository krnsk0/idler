import { ExtendedModel, tProp, types } from 'mobx-keystone';
import { ZoneEntity } from './zoneEntity';

export abstract class Countable extends ExtendedModel(ZoneEntity, {
  /**
   * How many does the player own?
   */
  quantity: tProp(types.number, 0),
}) {}
