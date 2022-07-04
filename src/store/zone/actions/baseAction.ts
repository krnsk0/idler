import { modelAction, ExtendedModel, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { ZoneEntity } from '../zoneEntity';
import { ResourceNames } from '../resources/resourceNames';
import { ActionNames } from './actionNames';
import { getResources } from '../resources/resources';

export abstract class BaseAction extends ExtendedModel(ZoneEntity, {}) {
  abstract actionName: ActionNames;
  abstract displayName: string;
  abstract description: string;

  /**
   * Attempts to run production

   */
  @modelAction
  tick(delta: number): void {}
}
