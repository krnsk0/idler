import { modelAction, decoratedModel, ExtendedModel } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { ZoneEntity } from '../zoneEntity';

interface ResourceStorage {
  resource: ResourceNames;
  storageAmount: number;
}

export function makeStorageProvider(Base: typeof ZoneEntity) {
  abstract class StorageProvider extends ExtendedModel(Base, {}) {
    abstract storage: Array<ResourceStorage>;
  }

  /**
   * Needed because decorators do not work in abstract classses
   * See https://mobx-keystone.js.org/class-models#usage-without-decorators
   */
  return decoratedModel(undefined, StorageProvider, {});
}
