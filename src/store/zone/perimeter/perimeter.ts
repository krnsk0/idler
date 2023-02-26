import { ExtendedModel, Model, model, tProp, types } from 'mobx-keystone';
import { BuildingNames } from '../buildings/buildingNames';
import { ZoneEntity } from '../zoneEntity';

@model('Perimeter')
export class Perimeter extends ExtendedModel(ZoneEntity, {
  _firstDynamoConstructionTime: tProp(types.maybe(types.number), undefined),
}) {
  transientUnlockCheck = () =>
    this.zoneBuildings[BuildingNames.DYNAMO].quantity > 0;
  observableUnlockCheck = () => true;
}
