import { model, ExtendedModel } from 'mobx-keystone';
import { ActionNames } from '../zone/actions/actionNames';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.CRYONICS)
export class Cryonics extends ExtendedModel(BaseTech, {}) {
  name = TechNames.CRYONICS;
  displayName = 'repair cryosuite';
  description =
    'in the wreckage, thousands sleep in suspended animation. ship says it can wake them';
  powerCost = 20;
  transientUnlockCheck = () => true;
  techUnlocked = [TechNames.AGROFORESTRY, TechNames.STORAGE];
  actionsUnlocked = [ActionNames.THAW];
  jobsUnlocked = [];
  buildingsUnlocked = [];
}
