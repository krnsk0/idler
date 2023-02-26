import { ExtendedModel, Model, model, tProp, types } from 'mobx-keystone';
import { BuildingNames } from '../buildings/buildingNames';
import { ZoneEntity } from '../zoneEntity';

const TIME_TO_UNLOCK_AFTER_FIRST_DYNAMO_CONSTRUCTION = 10000;

@model('Perimeter')
export class Perimeter extends ExtendedModel(ZoneEntity, {
  /**
   * Perimeter unlocks 10s after first dynamo is constructed
   */
  firstDynamoConstructionTime: tProp(types.maybe(types.number), undefined),
}) {
  transientUnlockCheck = () => {
    return (
      this.firstDynamoConstructionTime !== undefined &&
      Date.now() >
        this.firstDynamoConstructionTime +
          TIME_TO_UNLOCK_AFTER_FIRST_DYNAMO_CONSTRUCTION
    );
  };
  observableUnlockCheck = () => this.firstDynamoConstructionTime !== undefined;

  /**
   * Used in mechanism to unlock the perimeter for the first time
   */
  setFirstDynamoConstructionTime(): void {
    if (this.firstDynamoConstructionTime === undefined) {
      this.firstDynamoConstructionTime = Date.now();
    }
  }
}
