import { Model, model } from 'mobx-keystone';
import { computed } from 'mobx';
import { BuildingNames } from '../buildings/buildingNames';
import { JobNames } from '../jobs/jobNames';
import {
  getBuildings,
  getJobs,
  getResources,
  getUpgrades,
} from '../../selectors';
import { formatNumber } from '../../../utils/formatNumber';
import { UpgradeNames } from '../upgrades/upgradeNames';
import {
  TargetedModifierWithSource,
  ModifierTargets,
  ModifierSources,
  TargetedModifier,
  getDisplayableModifierType,
  isBaseModifier,
  isPercentModifier,
  isCostScalingModifier,
  isStorageAllPercentModifier,
} from './modifierTypes';

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
  appliedModifiersByTarget(
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
    const tooltipDescriptors: string[] = [];

    modifiers.forEach((modifier) => {
      const displayableModifierType = getDisplayableModifierType(modifier.type);
      const targetDisplayName = this.getTargetDisplayName(modifier.target);

      if (isBaseModifier(modifier)) {
        const resourceDisplayName =
          getResources(this)[modifier.resource].displayName;
        tooltipDescriptors.push(
          `${targetDisplayName} base ${resourceDisplayName} ${displayableModifierType}: ${formatNumber(
            modifier.baseChange,
            { showSign: true },
          )}`,
        );
      } else if (isPercentModifier(modifier)) {
        const resourceDisplayName =
          getResources(this)[modifier.resource].displayName;
        tooltipDescriptors.push(
          `${targetDisplayName} ${resourceDisplayName} ${displayableModifierType}: ${formatNumber(
            modifier.percentChange * 100,
            { showSign: true },
          )}%`,
        );
      } else if (isCostScalingModifier(modifier)) {
        tooltipDescriptors.push(
          `${targetDisplayName} ${displayableModifierType}: ${formatNumber(
            modifier.scaleFactorPercentModifier * 100,
            { showSign: true },
          )}%`,
        );
      } else if (isStorageAllPercentModifier(modifier)) {
        tooltipDescriptors.push(
          `${targetDisplayName} ${displayableModifierType}: ${formatNumber(
            modifier.allStoragePercentChange * 100,
            { showSign: true },
          )}%`,
        );
      } else throw new Error('should not get here');
    });

    return tooltipDescriptors;
  }
  /**
   * Target tooltip descriptors
   */
  targetTooltipDescriptors(target: ModifierTargets): string[] {
    const tooltipDescriptors: string[] = [];
    this.appliedModifiersByTarget(target).forEach((modifier) => {
      const displayableModifierType = getDisplayableModifierType(modifier.type);
      const sourceDisplayName = this.getSourceDisplayName(modifier.source);
      if (isBaseModifier(modifier)) {
        if (modifier.baseChange === 0) return;
        const resourceDisplayName =
          getResources(this)[modifier.resource].displayName;
        tooltipDescriptors.push(
          `${formatNumber(modifier.baseChange, {
            showSign: true,
          })} base ${resourceDisplayName} ${displayableModifierType} (${sourceDisplayName})`,
        );
      } else if (isPercentModifier(modifier)) {
        if (modifier.percentChange === 0) return;
        const resourceDisplayName =
          getResources(this)[modifier.resource].displayName;
        tooltipDescriptors.push(
          `${formatNumber(modifier.percentChange * 100, {
            showSign: true,
          })}% ${resourceDisplayName} ${displayableModifierType} (${sourceDisplayName})`,
        );
      } else if (isCostScalingModifier(modifier)) {
        if (modifier.scaleFactorPercentModifier === 0) return;
        tooltipDescriptors.push(
          `${displayableModifierType}: ${formatNumber(
            modifier.scaleFactorPercentModifier * 100,
            { showSign: true },
          )}% (${sourceDisplayName})`,
        );
      } else if (isStorageAllPercentModifier(modifier)) {
        if (modifier.allStoragePercentChange === 0) return;
        tooltipDescriptors.push(
          `${displayableModifierType}: ${formatNumber(
            modifier.allStoragePercentChange * 100,
            { showSign: true },
          )}% (${sourceDisplayName})`,
        );
      } else throw new Error('should not get here');
    });

    return tooltipDescriptors;
  }
}
