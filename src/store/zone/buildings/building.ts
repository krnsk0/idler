import {
  idProp,
  modelAction,
  decoratedModel,
  ExtendedModel,
} from 'mobx-keystone';
import { ZoneEntity } from '../zoneEntity';
import { makeProducer } from '../mixins/makeProducer';
import { makePurchaseable } from '../mixins/makePurchaseable';

abstract class _Building extends ExtendedModel(
  makeProducer(makePurchaseable(ZoneEntity)),
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
export const Building = decoratedModel(undefined, _Building, {});

type Building = _Building;
