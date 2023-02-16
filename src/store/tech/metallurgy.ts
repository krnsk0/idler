import { model, ExtendedModel } from 'mobx-keystone';
import { getGame } from '../selectors';
import { BuildingNames } from '../zone/buildings/buildingNames';
import { ResourceNames } from '../zone/resources/resourceNames';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.METALLURGY)
export class Metallurgy extends ExtendedModel(BaseTech, {}) {
  name = TechNames.METALLURGY;
  displayName = 'metallurgy';
  description = 'might the ore yield a useful alloy?';
  powerCost = 20;
  transientUnlockCheck = () =>
    getGame(this).initialZone.resources[ResourceNames.ORE].quantity > 4;
  techUnlocked = [TechNames.ELECTROMAGNETISM];
  actionsUnlocked = [];
  actionsRelocked = [];
  jobsUnlocked = [];
  buildingsUnlocked = [BuildingNames.FURNACE];
}
