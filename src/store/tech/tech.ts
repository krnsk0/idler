import {
  findParent,
  model,
  ExtendedModel,
  modelAction,
  prop,
  Ref,
  rootRef,
  tProp,
  types,
} from 'mobx-keystone';
import { computed } from 'mobx';
import { enumKeys } from '../../utils/enumKeys';
import { TechNames } from './techNames';
import { BiomassCompression } from './biomassCompression';
import { Farming } from './farming';
import { Shelter } from './shelter';
import { Cryonics } from './cryonics';
import { Root } from '../root';
import { BaseTech } from './baseTech';
import { TechEffect } from './techEffectTypes';
import { getGame } from '../game';
import { Agroforestry } from './agroforestry';
import { Storage } from './storage';
import { ResourceNames } from '../zone/resources/resourceNames';
import { Unlockable } from '../unlockable';
import { BiomassReclamation } from './biomassReclamation';

const techRef = rootRef<BaseTech>('tech_ref', {});

@model('Tech')
export class Tech extends ExtendedModel(Unlockable, {
  selectedTechRef: prop<Ref<BaseTech> | undefined>(),
  [TechNames.BIOMASS_COMPRESSION]: tProp(
    types.model(BiomassCompression),
    () => new BiomassCompression({}),
  ),
  [TechNames.FARMING]: tProp(types.model(Farming), () => new Farming({})),
  [TechNames.SHELTER]: tProp(types.model(Shelter), () => new Shelter({})),
  [TechNames.CRYONICS]: tProp(types.model(Cryonics), () => new Cryonics({})),
  [TechNames.AGROFORESTRY]: tProp(
    types.model(Agroforestry),
    () => new Agroforestry({}),
  ),
  [TechNames.STORAGE]: tProp(types.model(Storage), () => new Storage({})),
  [TechNames.BIOMASS_RECLAMATION]: tProp(
    types.model(BiomassReclamation),
    () => new BiomassReclamation({}),
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
  get availableAsArray(): BaseTech[] {
    return this.asArray.filter((tech) => tech.unlocked && !tech.researched);
  }

  /**
   * Is any tech available
   */
  @computed
  get noTechAvailable(): boolean {
    return this.availableAsArray.length === 0;
  }

  /**
   * Iterable list of only researched tech
   */
  @computed
  get researchedAsArray(): BaseTech[] {
    return this.asArray.filter((tech) => tech.researched);
  }

  /**
   * The selected tech
   */
  @computed
  get selectedTech(): BaseTech | undefined {
    return this.selectedTechRef ? this.selectedTechRef.current : undefined;
  }

  /**
   * Aggregates all tech effects
   */
  @computed
  get allTechEffects(): TechEffect[] {
    const allEffects = [];
    for (const tech of this.researchedAsArray) {
      allEffects.push(...tech.effects);
    }
    return allEffects;
  }

  /**
   * The unlock check for the technology button
   */
  unlockWhen = () => {
    return (
      getGame(this).initialZone.resources[ResourceNames.BIOMASS].quantity >= 5
    );
  };

  /**
   * Tick to update research
   *
   * TODO: generalize to all zones
   */
  tick(delta: number): void {
    if (this.selectedTech) {
      const power = getGame(this).initialZone.power;
      const fudgeFactor = 1.02; // helps w/ rounding errors
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
  return root.game.tech;
};
