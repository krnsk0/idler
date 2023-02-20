import { model, ExtendedModel } from 'mobx-keystone';
import { BuildingNames } from '../buildings/buildingNames';
import { ResourceNames } from '../resources/resourceNames';
import { BaseUpgrade } from './baseUpgrade';
import { UpgradeNames } from './upgradeNames';

@model(UpgradeNames.TUYERES)
export class Tuyeres extends ExtendedModel(BaseUpgrade, {}) {
  name = UpgradeNames.TUYERES;
  displayName = 'tuyeres';
  description =
    'injecting combustible gas into the furnace helps us raise temperatures';
  transientUnlockCheck = () => true;
  modifiers = [
    {
      modifierType: 'input' as const,
      target: BuildingNames.FURNACE,
      resource: ResourceNames.BIOMASS,
      modifier: {
        percentChange: -0.2,
      },
    },
  ];
  cost = [
    { resource: ResourceNames.ALLOY, quantity: 10 },
    { resource: ResourceNames.ROCK, quantity: 25 },
  ];
}
