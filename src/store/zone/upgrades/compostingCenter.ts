import { model, ExtendedModel } from 'mobx-keystone';
import { BuildingNames } from '../buildings/buildingNames';
import { ResourceNames } from '../resources/resourceNames';
import { BaseUpgrade } from './baseUpgrade';
import { UpgradeNames } from './upgradeNames';

@model(UpgradeNames.COMPOSTING_CENTER)
export class CompostingCenter extends ExtendedModel(BaseUpgrade, {}) {
  name = UpgradeNames.COMPOSTING_CENTER;
  displayName = 'composting drums';
  description = 'equip farms with tools to convert waste matter to fertilizer';
  transientUnlockCheck = () => true;
  productionModifiers = [
    {
      buildingName: BuildingNames.FARM,
      resourceName: ResourceNames.BIOMASS,
      percentageModifier: 0.5,
    },
  ];
}
