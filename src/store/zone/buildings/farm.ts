import { model, ExtendedModel } from 'mobx-keystone';
import { override } from 'mobx';
import { ResourceNames } from '../resources/resourceNames';
import { BaseBuilding } from './baseBuilding';
import { BuildingNames } from './buildingNames';
import { ProductionMultipliers } from '../producerConsumer';
import { TechNames } from '../../tech/techNames';
import { getTech } from '../../tech/tech';

@model(BuildingNames.FARM)
export class Farm extends ExtendedModel(BaseBuilding, {}) {
  name = BuildingNames.FARM;
  displayName = 'hydroponic farm';
  description = 'cultivates edible xenoflora, producing biomass as byproduct';
  splashText = 'a triumph of xenobotany';
  baseCost = [
    {
      resource: ResourceNames.BIOMASS,
      quantity: 4,
    },
    {
      resource: ResourceNames.LUMBER,
      quantity: 2,
    },
  ];
  costExponent = 1.35;
  inputs = [];
  outputs = [
    {
      resource: ResourceNames.NUTRIENTS,
      quantityPerSecond: 0.05,
    },
    {
      resource: ResourceNames.BIOMASS,
      quantityPerSecond: 0.06,
    },
  ];
  storage = [];
  transientUnlockCheck = () => true;
  canSomeBeTurnedOff = false;
  powerOutputPerSecond = 0;

  @override
  get productionModifiers(): ProductionMultipliers {
    let biomassMultiplier = 1;
    if (getTech(this)[TechNames.BIOMASS_RECLAMATION].researched) {
      biomassMultiplier *= 2;
    }
    return {
      [ResourceNames.BIOMASS]: biomassMultiplier,
    };
  }
}
