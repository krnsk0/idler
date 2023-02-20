import { Model, model } from 'mobx-keystone';
import { computed } from 'mobx';
import { BuildingNames } from './buildings/buildingNames';
import { JobNames } from './jobs/jobNames';
import { ResourceNames } from './resources/resourceNames';
import { getBuildings, getJobs, getResources, getUpgrades } from '../selectors';
import { formatNumber } from '../../utils/formatNumber';
import { UpgradeNames } from './upgrades/upgradeNames';

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

export type ModifierTargets = BuildingNames;

export type ModifierSources = JobNames | UpgradeNames;

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

export type TargetedModifierWithSource = TargetedModifier & {
  source: ModifierSources;
};

@model('Modifiers')
export class Modifiers extends Model({}) {
  /**
   * A list of all modifiers, globally
   */
  @computed
  get allAppliedModifiers(): TargetedModifierWithSource[] {
    const modifiers: TargetedModifierWithSource[] = [];
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
  allAppliedModifiersByTarget(
    target: ModifierTargets,
  ): TargetedModifierWithSource[] {
    return this.allAppliedModifiers.filter((modifier) => {
      return modifier.target === target;
    });
  }

  /**
   * Helper to get display name of a modifier target
   */
  getTargetDisplayName(target: ModifierTargets): string {
    let targetName = '';
    if (target in BuildingNames) {
      targetName = getBuildings(this)[target as BuildingNames].displayName;
    } else {
      throw new Error('cannot find target name');
    }
    return targetName;
  }

  /**
   * Helper to get display name of a modifier source
   */
  getSourceDisplayName(target: ModifierSources): string {
    let sourceName = '';
    if (target in JobNames) {
      sourceName = getJobs(this)[target as JobNames].displayName;
    } else if (target in UpgradeNames) {
      sourceName = getUpgrades(this)[target as UpgradeNames].displayName;
    } else {
      throw new Error('cannot find source name');
    }
    return sourceName;
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
  /**
   * Target tooltip descriptors
   */
  targetTooltipDescriptors(target: ModifierTargets): string[] {
    return this.allAppliedModifiersByTarget(target).map(
      ({ resource, modifier, modifierType, source }) => {
        const resourceDisplayName = getResources(this)[resource].displayName;
        const displayableModifierType =
          getDisplayableModifierType(modifierType);
        const sourceDisplayName = this.getSourceDisplayName(source);

        if ('baseChange' in modifier) {
          return `${formatNumber(modifier.baseChange, {
            showSign: true,
          })} base ${resourceDisplayName} ${displayableModifierType} (${sourceDisplayName})`;
        } else if ('percentChange' in modifier) {
          return `${formatNumber(modifier.percentChange, {
            showSign: true,
          })}% ${resourceDisplayName} ${displayableModifierType} (${sourceDisplayName})`;
        } else throw new Error('should not get here');
      },
    );
  }
}
