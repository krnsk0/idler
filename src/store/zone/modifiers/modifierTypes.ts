import { BuildingNames } from '../buildings/buildingNames';
import { JobNames } from '../jobs/jobNames';
import { ResourceNames } from '../resources/resourceNames';
import { UpgradeNames } from '../upgrades/upgradeNames';

type ModifierTypes =
  | 'input_base'
  | 'input_percent'
  | 'output_base'
  | 'output_percent'
  | 'cost_scaling'
  | 'storage_base'
  | 'storage_percent';

export function getDisplayableModifierType(type: ModifierTypes) {
  const mapping: { [key in ModifierTypes]: string } = {
    input_base: 'consumption',
    input_percent: 'consumption',
    output_base: 'production',
    output_percent: 'production',
    cost_scaling: 'cost scaling',
    storage_base: 'storage',
    storage_percent: 'storage',
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

interface StorageBaseModifier {
  type: 'storage_base';
  target: ModifierTargets;
  resource: ResourceNames;
  baseChange: number;
}

export function isStorageBaseModifier(
  modifier: TargetedModifier,
): modifier is StorageBaseModifier {
  return modifier.type === 'storage_base';
}

interface StoragePercentModifier {
  type: 'storage_percent';
  target: ModifierTargets;
  resource: ResourceNames;
  percentChange: number;
}

export function isStoragePercentModifier(
  modifier: TargetedModifier,
): modifier is StoragePercentModifier {
  return modifier.type === 'storage_percent';
}

export type BaseModifier =
  | InputBaseModifier
  | OutputBaseModifier
  | StorageBaseModifier;

export type PercentModifier =
  | InputPercentModifier
  | OutputPercentModifier
  | StoragePercentModifier;

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
  return isOutputBaseModifier(modifier) || isInputBaseModifier(modifier);
}

export function isPercentModifier(
  modifier: TargetedModifier,
): modifier is PercentModifier {
  return isOutputPercentModifier(modifier) || isInputPercentModifier(modifier);
}
