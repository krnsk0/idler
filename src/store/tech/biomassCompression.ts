import { model, ExtendedModel } from 'mobx-keystone';
import { ActionNames } from '../zone/actions/actionNames';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.BIOMASS_COMPRESSION)
export class BiomassCompression extends ExtendedModel(BaseTech, {}) {
  name = TechNames.BIOMASS_COMPRESSION;
  displayName = 'biomass compression';
  description =
    'subject to heat and pressure, biomass becomes an arboraceous material suitable for construction';
  powerCost = 10;
  transientUnlockCheck = () => true;
  techUnlocked: TechNames[] = [
    TechNames.FARMING,
    TechNames.SHELTER,
    TechNames.EXCAVATION,
  ];
  actionsUnlocked = [ActionNames.COMPRESS];
  actionsRelocked = [];
  jobsUnlocked = [];
  buildingsUnlocked = [];
}
