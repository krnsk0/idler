import {
  findParent,
  model,
  Model,
  modelAction,
  prop,
  Ref,
  rootRef,
  tProp,
  types,
} from 'mobx-keystone';
import { computed } from 'mobx';
import { enumKeys } from '../../helpers/enumKeys';
import { TechNames } from './techNames';
import { BiomassCompression } from './biomassCompression';
import { getRoot, Root } from '../root';
import { BaseTech } from './baseTech';
import { getPower } from '../zone/power/power';

const techRef = rootRef<BaseTech>('tech_ref', {});

@model('Tech')
export class Tech extends Model({
  unlocked: tProp(types.boolean, false),
  selectedTechRef: prop<Ref<BaseTech> | undefined>(),
  [TechNames.BIOMASS_COMPRESSION]: tProp(
    types.model(BiomassCompression),
    () => new BiomassCompression({}),
  ),
}) {
  /**
   * Returns an iterable list of the action model
   */
  @computed
  get asArray() {
    return enumKeys(TechNames).map((name) => {
      return this[name];
    });
  }

  /**
   * Iterable list of only available (unlocked and not researched) tech
   */
  @computed
  get availableAsArray() {
    return this.asArray.filter((tech) => tech.unlocked && !tech.researched);
  }

  /**
   * The selected tech
   */
  @computed
  get selectedTech(): BaseTech | undefined {
    return this.selectedTechRef ? this.selectedTechRef.current : undefined;
  }

  /**
   * Runs an unlock check
   */
  @modelAction
  unlockCheck(): void {
    if (!this.unlocked) {
      this.unlocked = getRoot(this).zones.some(
        (zone) => zone.power.production > 0,
      );
    }
  }

  /**
   * Tick to update research
   *
   * TODO: generalize to all zones
   */
  tick(delta: number): void {
    if (this.selectedTech) {
      const power = getRoot(this).zones[0].power;
      const fudgeFactor = 1.0001; // helps w/ rounding errors
      const researchRate = 1;
      const increase = delta * researchRate * power.satisfaction * fudgeFactor;
      this.selectedTech.addPower(increase);
    }
  }

  /**
   * Select a new piece of tech to research
   */
  @modelAction
  selectTech(tech: BaseTech | undefined) {
    this.selectedTechRef = tech ? techRef(tech) : undefined;
  }
}

export const getTech = (child: object): Tech => {
  const root = findParent<Root>(child, (node) => {
    return node instanceof Root;
  });
  if (!root) throw new Error('no parent root model found in getTech');
  return root.tech;
};
