import { model, ExtendedModel } from 'mobx-keystone';
import { getGame } from '../game';
import { ActionNames } from '../zone/actions/actionNames';
import { BuildingNames } from '../zone/buildings/buildingNames';
import { ResourceNames } from '../zone/resources/resourceNames';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.ELECTROMAGNETISM)
export class Electromagnetism extends ExtendedModel(BaseTech, {}) {
  name = TechNames.ELECTROMAGNETISM;
  displayName = 'electromagnetism';
  description =
    'dismantle ship’s generator and study its design, allowing the construction of additional generators';
  powerCost = 25;
  transientUnlockCheck = () =>
    getGame(this).initialZone.resources[ResourceNames.ALLOY].currentCap > 5;
  techUnlocked = [];
  actionsUnlocked = [];
  actionsRelocked = [ActionNames.GENERATE];
  jobsUnlocked = [];
  buildingsUnlocked = [BuildingNames.DYNAMO];
}
