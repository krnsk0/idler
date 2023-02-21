import { ExtendedModel, modelAction, tProp, types } from 'mobx-keystone';
import { ResourceNames } from './resources/resourceNames';
import { computed } from 'mobx';
import { ProducerConsumer } from './producerConsumer';
import { getModifiers } from '../selectors';
import {
  isStorageAllPercentModifier,
  ModifierTargets,
} from './modifiers/modifierTypes';

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
   * Storage including modifiers
   */
  @computed
  get adjustedStorage(): Storage[] {
    return this.storage.map(({ resource, quantity }) => {
      let storageModifier = 1;
      getModifiers(this)
        .appliedModifiersByTarget(this.$modelType as ModifierTargets)
        .forEach((modifier) => {
          if (isStorageAllPercentModifier(modifier)) {
            storageModifier += modifier.allStoragePercentChange;
          }
        });
      return {
        resource,
        quantity: quantity * storageModifier,
      };
    });
  }

  /**
   * Given the name of a resource, tells the caller how much of that resource
   * this building can store
   */
  getStorageAmountByKey(resourceName: ResourceNames): number {
    const entry = this.adjustedStorage.find(
      (entry) => entry.resource === resourceName,
    );
    return entry ? entry.quantity : 0;
  }

  /**
   * Storage with displayable names
   */
  @computed
  get displayStorage(): StorageProviderDisplay[] {
    return this.adjustedStorage.map(({ resource, quantity }) => {
      return {
        resourceDisplayName: this.zoneResources[resource].displayName,
        quantity,
      };
    });
  }
}
