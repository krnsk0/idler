import { model, ExtendedModel } from 'mobx-keystone';
import { getGame } from '../game';
import { ResourceNames } from '../zone/resources/resourceNames';
import { BaseTech } from './baseTech';
import { getTech } from './tech';
import { TechNames } from './techNames';

@model(TechNames.CRYONICS)
export class Cryonics extends ExtendedModel(BaseTech, {}) {
  name = TechNames.CRYONICS;
  displayName = 'repair cryosuite';
  description =
    'in the wreckage, thousands sleep in suspended animation. ship says it can wake them';
  unlockWhen = () => {
    return (
      getTech(this)[TechNames.SHELTER].researched &&
      getTech(this)[TechNames.FARMING].researched &&
      getGame(this).initialZone.resources[ResourceNames.COLONISTS].currentCap >
        0
    );
  };
  powerCost = 20;
}
