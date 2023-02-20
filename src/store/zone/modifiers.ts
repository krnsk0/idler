import { Model, model } from 'mobx-keystone';
import { computed } from 'mobx';
import { BuildingNames } from './buildings/buildingNames';
import { JobNames } from './jobs/jobNames';
import { ResourceNames } from './resources/resourceNames';
import { getBuildings, getJobs, getResources, getUpgrades } from '../selectors';
import { formatNumber } from '../../utils/formatNumber';

export enum ModifierTypes {
  PRODUCTION = 'PRODUCTION',
  STORAGE = 'STORAGE',
  COST = 'COST',
}

export function getDisplayableModifierType(modifierType: ModifierTypes) {
  const mapping: { [key in ModifierTypes]: string } = {
    [ModifierTypes.PRODUCTION]: 'production',
    [ModifierTypes.STORAGE]: 'storage',
    [ModifierTypes.COST]: 'cost',
  };
  return mapping[modifierType];
}

export type ModifierTargets = BuildingNames | JobNames;

export interface BaseModifier {
  baseChange: number;
}

export interface PercentModifier {
  percentChange: number;
}

export interface TargetedModifier {
  modifierType: ModifierTypes;
  target: ModifierTargets;
  resource: ResourceNames;
  modifier: BaseModifier | PercentModifier;
}

@model('Modifiers')
export class Modifiers extends Model({}) {
  /**
   * A list of all modifiers, globally
   */
  @computed
  get allAppliedModifiers(): TargetedModifier[] {
    const modifiers: TargetedModifier[] = [];
    [...getUpgrades(this).asArray, ...getJobs(this).asArray].forEach(
      (entity) => {
        entity.appliedModifiers.forEach((appliedModifier) =>
          modifiers.push(appliedModifier),
        );
      },
    );
    return modifiers;
  }

  /**
   * All applied modifiers, queryable by target
   */
  allAppliedModifiersByTarget(target: ModifierTargets): TargetedModifier[] {
    return this.allAppliedModifiers.filter((modifier) => {
      modifier.target === target;
    });
  }

  /**
   * Helper to get display name of a modifier target
   */
  getTargetDisplayName(target: ModifierTargets): string {
    let targetName = '';
    if (target in BuildingNames) {
      targetName = getBuildings(this)[target as BuildingNames].displayName;
    } else if (target in JobNames) {
      targetName = getJobs(this)[target as JobNames].displayName;
    } else {
      throw new Error('cannot find target name');
    }
    return targetName;
  }

  /**
   * Displayable modifier descriptors for modifier sources
   */
  sourceTooltipDescriptors(modifiers: TargetedModifier[]): string[] {
    return modifiers.map(({ target, resource, modifier, modifierType }) => {
      const targetDisplayName = this.getTargetDisplayName(target);
      const resourceDisplayName = getResources(this)[resource].displayName;
      const displayableModifierType = getDisplayableModifierType(modifierType);
      if ('baseChange' in modifier) {
        return `${targetDisplayName}'s base ${resourceDisplayName} ${displayableModifierType}: ${formatNumber(
          modifier.baseChange,
          { showSign: true },
        )}`;
      } else if ('percentChange' in modifier) {
        return `${targetDisplayName}'s ${resourceDisplayName} ${displayableModifierType}: ${formatNumber(
          modifier.percentChange,
          { showSign: true },
        )}%`;
      } else throw new Error('should not get here');
    });
  }
}
