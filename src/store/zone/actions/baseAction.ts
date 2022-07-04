import { modelAction, ExtendedModel, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { ZoneEntity } from '../zoneEntity';
import { ResourceNames } from '../resources/resourceNames';
import { ActionNames } from './actionNames';
import { getResources } from '../resources/resources';

export abstract class BaseAction extends ExtendedModel(ZoneEntity, {
  progress: tProp(types.number, 0),
  active: tProp(types.boolean, false),
}) {
  abstract name: ActionNames;
  abstract displayName: string;
  abstract description: string;

  /**
   * Ticks the action's progress
   */
  @modelAction
  tick(delta: number): void {}
}
