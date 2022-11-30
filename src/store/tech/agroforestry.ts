import { model, ExtendedModel } from 'mobx-keystone';
import { getGame } from '../game';
import { JobNames } from '../zone/jobs/jobNames';
import { ResourceNames } from '../zone/resources/resourceNames';
import { BaseTech } from './baseTech';
import { getTech } from './tech';
import { TechEffect, TechEffectNames } from './techEffectTypes';
import { TechNames } from './techNames';

const effects: TechEffect[] = [
  {
    kind: TechEffectNames.JOB_UNLOCK,
    jobName: JobNames.ARBORIST,
  },
];

@model(TechNames.AGROFORESTRY)
export class Agroforestry extends ExtendedModel(BaseTech, {}) {
  name = TechNames.AGROFORESTRY;
  displayName = 'agroforestry';
  description = 'sustainable cultivation of arboriform xenoflora';
  unlockWhen = () => {
    return (
      getTech(this)[TechNames.CRYONICS].researched &&
      getGame(this).initialZone.resources[ResourceNames.COLONISTS].quantity > 0
    );
  };
  powerCost = 20;
  effects = effects;
}
