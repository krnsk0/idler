import { model, ExtendedModel } from 'mobx-keystone';
import { BuildingNames } from '../buildings/buildingNames';
import { ResourceNames } from '../resources/resourceNames';
import { BaseUpgrade } from './baseUpgrade';
import { UpgradeNames } from './upgradeNames';

@model(UpgradeNames.COMPOSTING_DRUMS)
export class CompostingDrums extends ExtendedModel(BaseUpgrade, {}) {
  name = UpgradeNames.COMPOSTING_DRUMS;
  displayName = 'composting drums';
  description =
    'equip farms with containers useful for decomposing organic waste matter to fertilizer';
  transientUnlockCheck = () => true;
  productionModifiers = [
    {
      building: BuildingNames.FARM,
      resource: ResourceNames.BIOMASS,
      percentageModifier: 0.1,
    },
  ];
  cost = [
    { resource: ResourceNames.LUMBER, quantity: 15 },
    { resource: ResourceNames.ROCK, quantity: 15 },
  ];
}