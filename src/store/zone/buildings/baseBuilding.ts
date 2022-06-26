import {
  idProp,
  modelAction,
  decoratedModel,
  ExtendedModel,
} from 'mobx-keystone';
import { ZoneEntity } from '../zoneEntity';
import { makeProducer } from '../mixins/makeProducer';
import { makePurchaseable } from '../mixins/makePurchaseable';
import { composeMixins } from '../mixins/compose';
import { makeStorageProvider } from '../mixins/makeStorageProvider';

abstract class _BaseBuilding extends ExtendedModel(
  composeMixins(
    makeStorageProvider,
    makeProducer,
    makePurchaseable,
  )(ZoneEntity),
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
