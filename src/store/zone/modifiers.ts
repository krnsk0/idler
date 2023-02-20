import { Model, model } from 'mobx-keystone';
import { computed } from 'mobx';
import { BuildingNames } from './buildings/buildingNames';
import { JobNames } from './jobs/jobNames';
import { ResourceNames } from './resources/resourceNames';
import { UpgradeNames } from './upgrades/upgradeNames';
import { getJobs, getUpgrades } from '../selectors';

export enum ModifierTypes {
  PRODUCTION = 'PRODUCTION',
  STORAGE = 'STORAGE',
  COST = 'COST',
}

export type ModifierTargets = BuildingNames | JobNames;

// export type ModifierSources = JobNames | UpgradeNames;

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
}
