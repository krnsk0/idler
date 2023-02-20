import { Model, model } from 'mobx-keystone';
import { computed } from 'mobx';
import { BuildingNames } from './buildings/buildingNames';
import { JobNames } from './jobs/jobNames';
import { ResourceNames } from './resources/resourceNames';
import { getBuildings, getJobs, getResources, getUpgrades } from '../selectors';
import { formatNumber } from '../../utils/formatNumber';
import { UpgradeNames } from './upgrades/upgradeNames';

type ModifierTypes =
  | 'input_base'
  | 'input_percent'
  | 'output_base'
  | 'output_percent'
  | 'cost_scaling';

export function getDisplayableModifierType(type: ModifierTypes) {
  const mapping: { [key in ModifierTypes]: string } = {
    input_base: 'consumption',
    input_percent: 'consumption',
    output_base: 'production',
    output_percent: 'production',
    cost_scaling: 'cost scaling',
  };
  return mapping[type];
}

export type ModifierTargets = BuildingNames;

export type ModifierSources = JobNames | UpgradeNames;

interface InputBaseModifier {
  type: 'input_base';
  target: ModifierTargets;
  resource: ResourceNames;
  baseChange: number;
}

export function isInputBaseModifier(
  modifier: TargetedModifier,
): modifier is InputBaseModifier {
  return modifier.type === 'input_base';
}
interface InputPercentModifier {
  type: 'input_percent';
  target: ModifierTargets;
  resource: ResourceNames;
  percentChange: number;
}

export function isInputPercentModifier(
  modifier: TargetedModifier,
): modifier is InputPercentModifier {
  return modifier.type === 'input_percent';
}

interface OutputBaseModifier {
  type: 'output_base';
  target: ModifierTargets;
  resource: ResourceNames;
  baseChange: number;
}

export function isOutputBaseModifier(
  modifier: TargetedModifier,
): modifier is OutputBaseModifier {
  return modifier.type === 'output_base';
}

interface OutputPercentModifier {
  type: 'output_percent';
  target: ModifierTargets;
  resource: ResourceNames;
  percentChange: number;
}

export function isOutputPercentModifier(
  modifier: TargetedModifier,
): modifier is OutputPercentModifier {
  return modifier.type === 'output_percent';
}

interface CostScalingModifier {
  type: 'cost_scaling';
  target: ModifierTargets;
  scaleFactorPercentModifier: number;
}

export function isCostScalingModifier(
  modifier: TargetedModifier,
): modifier is CostScalingModifier {
  return modifier.type === 'cost_scaling';
}

export type BaseModifier = InputBaseModifier | OutputBaseModifier;

export type PercentModifier = InputPercentModifier | OutputPercentModifier;

export type TargetedModifier =
  | BaseModifier
  | PercentModifier
  | CostScalingModifier;

export type TargetedModifierWithSource = TargetedModifier & {
  source: ModifierSources;
};

export function isBaseModifier(
  modifier: TargetedModifier,
): modifier is BaseModifier {
  console.log('checking here', isOutputBaseModifier(modifier));
  return isOutputBaseModifier(modifier) || isInputBaseModifier(modifier);
}

export function isPercentModifier(
  modifier: TargetedModifier,
): modifier is PercentModifier {
  return isOutputPercentModifier(modifier) || isInputPercentModifier(modifier);
}

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
    return modifiers.map((modifier) => {
      const displayableModifierType = getDisplayableModifierType(modifier.type);
      const targetDisplayName = this.getTargetDisplayName(modifier.target);

      if (isBaseModifier(modifier)) {
        const resourceDisplayName =
          getResources(this)[modifier.resource].displayName;
        return `${targetDisplayName}'s base ${resourceDisplayName} ${displayableModifierType}: ${formatNumber(
          modifier.baseChange,
          { showSign: true },
        )}`;
      } else if (isPercentModifier(modifier)) {
        const resourceDisplayName =
          getResources(this)[modifier.resource].displayName;

        return `${targetDisplayName}'s ${resourceDisplayName} ${displayableModifierType}: ${formatNumber(
          modifier.percentChange,
          { showSign: true },
        )}%`;
      } else if (isCostScalingModifier(modifier)) {
        return `${targetDisplayName}'s ${displayableModifierType}: ${formatNumber(
          modifier.scaleFactorPercentModifier,
          { showSign: true },
        )}%`;
      } else throw new Error('should not get here');
    });
  }
  /**
   * Target tooltip descriptors
   */
  targetTooltipDescriptors(target: ModifierTargets): string[] {
    return this.appliedModifiersByTarget(target).map((modifier) => {
      const displayableModifierType = getDisplayableModifierType(modifier.type);
      const sourceDisplayName = this.getSourceDisplayName(modifier.source);
      console.log('here', modifier);
      if (isBaseModifier(modifier)) {
        console.log('here 0');

        const resourceDisplayName =
          getResources(this)[modifier.resource].displayName;
        return `${formatNumber(modifier.baseChange, {
          showSign: true,
        })} base ${resourceDisplayName} ${displayableModifierType} (${sourceDisplayName})`;
      } else if (isPercentModifier(modifier)) {
        console.log('here 1');

        const resourceDisplayName =
          getResources(this)[modifier.resource].displayName;

        return `${formatNumber(modifier.percentChange, {
          showSign: true,
        })}% ${resourceDisplayName} ${displayableModifierType} (${sourceDisplayName})`;
      } else if (isCostScalingModifier(modifier)) {
        console.log('here 2');

        return `${displayableModifierType}:${formatNumber(
          modifier.scaleFactorPercentModifier,
          { showSign: true },
        )}% (${sourceDisplayName})`;
      } else throw new Error('should not get here');
    });
  }
}
