import { model, ExtendedModel } from 'mobx-keystone';
import { BuildingNames } from '../buildings/buildingNames';
import { ResourceNames } from '../resources/resourceNames';
import { BaseUpgrade } from './baseUpgrade';
import { UpgradeNames } from './upgradeNames';

@model(UpgradeNames.HEAT_RECLAMATORS)
export class HeatReclamators extends ExtendedModel(BaseUpgrade, {}) {
  name = UpgradeNames.HEAT_RECLAMATORS;
  displayName = 'heat reclamators';
  description = 'increase fuel efficiency of dynamos';
  transientUnlockCheck = () => true;
  modifiers = [
    {
      type: 'input_base' as const,
      target: BuildingNames.DYNAMO,
      resource: ResourceNames.BIOMASS,
      baseChange: -0.25,
    },
  ];
  cost = [
    { resource: ResourceNames.ALLOY, quantity: 5 },
    { resource: ResourceNames.LUMBER, quantity: 25 },
  ];
}
