import { model, ExtendedModel } from 'mobx-keystone';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.ZONE_UPGRADES)
export class ZoneUpgrades extends ExtendedModel(BaseTech, {}) {
  name = TechNames.ZONE_UPGRADES;
  displayName = 'outpost improvements';
  description =
    'ship proposes a means to make lasting improvements to the settlement';
  powerCost = 200;
  transientUnlockCheck = () => true;
  techUnlocked = [];
  actionsUnlocked = [];
  actionsRelocked = [];
  jobsUnlocked = [];
  buildingsUnlocked = [];
  upgradesUnlocked = [];
}
