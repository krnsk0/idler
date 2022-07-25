import { ExtendedModel, modelAction, tProp, types } from 'mobx-keystone';
import { ResourceNames } from './resources/resourceNames';
import { computed } from 'mobx';
import { ProducerConsumer } from './producerConsumer';

interface Storage {
  resource: ResourceNames;
  quantity: number;
}

interface StorageProviderDisplay {
  resourceDisplayName: string;
  quantity: number;
}

export abstract class StorageProvider extends ExtendedModel(
  ProducerConsumer,
  {},
) {
  abstract storage: Storage[];

  /**
   * Given the name of a resource, tells the caller how much of that resource
   * this building can store
   */
  getStorageAmountByKey(resourceName: ResourceNames): number {
    const entry = this.storage.find((entry) => entry.resource === resourceName);
    return entry ? entry.quantity : 0;
  }

  /**
   * Storage with displayable names
   */
  @computed
  get displayStorage(): StorageProviderDisplay[] {
    return this.storage.map(({ resource, quantity }) => {
      return {
        resourceDisplayName: this.zoneResources[resource].displayName,
        quantity,
      };
    });
  }
}
