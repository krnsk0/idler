import { ResourceNames } from './resources/resourceNames';
/**
 * Sometimes models need to have modifier "traits" without inheriting everything
 * else inherited by other models that have modifier "traits". Because we don't
 * have a good mixins approach in mobx-keystone, enforcing the types here is
 * the best we can do.
 */

export interface PurchaseCost {
  resource: ResourceNames;
  quantity: number;
}

export interface PurchaseCostDisplay {
  resourceDisplayName: string;
  isSatisfied: boolean;
  availableQuantity: number;
  storageConstrained: boolean;
  quantity: number;
}
