import { BuildingNames } from './buildings/buildingNames';
import { ResourceNames } from './resources/resourceNames';
/**
 * Sometimes models need to have modifier "traits" without inheriting everything
 * else inherited by other models that have modifier "traits". Because we don't
 * have a good mixins approach in mobx-keystone, enforcing the types here is
 * the best we can do.
 */

export interface ProductionModifier {
  building: BuildingNames;
  resource: ResourceNames;
  percentageModifier: number;
}

export interface ProductionModifierDisplay {
  buildingDisplayName: string;
  resourceDisplayName: string;
  percentageModifier: number;
  modifierSourceDisplayName: string;
}
