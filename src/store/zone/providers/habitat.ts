import { model, ExtendedModel, modelAction } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { BaseProvider } from './baseProvider';
import { ProviderNames } from './providerNames';

@model(ProviderNames.Habitat)
export class Habitat extends ExtendedModel(BaseProvider, {}) {
  displayName = 'Habitat';
  baseCost = [
    {
      resource: ResourceNames.Nutrients,
      quantity: 5,
    },
  ];
  costExponent = 1.2;
}
