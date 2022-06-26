import {
  idProp,
  modelAction,
  decoratedModel,
  ExtendedModel,
} from 'mobx-keystone';
import { BaseZoneEntity } from '../baseZoneEntity';
import { makeProducer } from '../mixins/makeProducer';
import { makePurchaseable } from '../mixins/makePurchaseable';

abstract class _BaseBuilding extends ExtendedModel(
  makeProducer(makePurchaseable(BaseZoneEntity)),
  {
    id: idProp,
  },
) {
  abstract displayName: string;
}

/**
 * Needed because decorators do not work in abstract classses
 * See https://mobx-keystone.js.org/class-models#usage-without-decorators
 */
export const BaseBuilding = decoratedModel(undefined, _BaseBuilding, {});

type BaseBuilding = _BaseBuilding;
