import { model, ExtendedModel } from 'mobx-keystone';
import { BaseTech } from './baseTech';
import { TechNames } from './techNames';

@model(TechNames.BIOMASS_COMPRESSION)
export class BiomassCompression extends ExtendedModel(BaseTech, {}) {
  name = TechNames.BIOMASS_COMPRESSION;
  displayName = 'harvest biomass';
  description = 'collect arboraceous flora';
  unlockWhen = () => true;
}
