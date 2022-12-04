import { model, ExtendedModel } from 'mobx-keystone';
import { ActionNames } from '../zone/actions/actionNames';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.BIOMASS_RECLAMATION)
export class BiomassReclamation extends ExtendedModel(BaseTech, {}) {
  name = TechNames.BIOMASS_RECLAMATION;
  displayName = 'biomass reclamators';
  description =
    "dismantle the biomass collector and study its design, doubling hydroponic farms' biomass production";
  powerCost = 25;
  transientUnlockCheck = () => true;
  unlocksTech = [];
  unlocksActions = [ActionNames.HARVEST];
  unlocksJobs = [];
  unlocksBuildings = [];
}
