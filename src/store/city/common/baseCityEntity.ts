import {
  Model,
  tProp,
  types,
  modelAction,
  decoratedModel,
} from 'mobx-keystone';
import { computed } from 'mobx';
import { City, getCity } from '../city';
import { ResourceNames } from '../resources/resourceNames';
import { Resources } from '../resources/resources';

class _BaseCityEntity extends Model({}) {
  /**
   * The city associated with the entity
   */
  get city(): City {
    return getCity(this);
  }

  /**
   * The city associated with the entity
   */
  get cityResources(): Resources {
    return getCity(this).resources;
  }
}

/**
 * Needed because decorators do not work in abstract classses
 * See https://mobx-keystone.js.org/class-models#usage-without-decorators
 */
export const BaseCityEntity = decoratedModel(undefined, _BaseCityEntity, {
  city: computed,
  cityResources: computed,
});

type BaseCityEntity = _BaseCityEntity;
