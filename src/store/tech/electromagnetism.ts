import { model, ExtendedModel } from 'mobx-keystone';
import { getGame } from '../selectors';
import { BuildingNames } from '../zone/buildings/buildingNames';
import { ResourceNames } from '../zone/resources/resourceNames';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.ELECTROMAGNETISM)
export class Electromagnetism extends ExtendedModel(BaseTech, {}) {
  name = TechNames.ELECTROMAGNETISM;
  displayName = 'electromagnetism';
  description = 'allow the construction of additional generators';
  powerCost = 25;
  transientUnlockCheck = () =>
    getGame(this).initialZone.resources[ResourceNames.ALLOY].quantity >= 5;
  techUnlocked = [];
  actionsUnlocked = [];
  actionsRelocked = [];
  jobsUnlocked = [];
  buildingsUnlocked = [BuildingNames.DYNAMO];
}
