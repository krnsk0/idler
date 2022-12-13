import { model, ExtendedModel } from 'mobx-keystone';
import { getGame } from '../game';
import { ActionNames } from '../zone/actions/actionNames';
import { ResourceNames } from '../zone/resources/resourceNames';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.COMBUSTION_GENERATION)
export class CombustionGeneration extends ExtendedModel(BaseTech, {}) {
  name = TechNames.COMBUSTION_GENERATION;
  displayName = 'combustion generation';
  description =
    'dismantle ship’s generator and study its design, allowing the construction of additional generators';
  powerCost = 25;
  transientUnlockCheck = () =>
    getGame(this).initialZone.resources[ResourceNames.ALLOY].currentCap > 5;
  techUnlocked = [];
  actionsUnlocked = [];
  actionsRelocked = [ActionNames.GENERATE];
  jobsUnlocked = [];
  buildingsUnlocked = [];
}
