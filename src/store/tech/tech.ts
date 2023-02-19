import {
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
import { ActionNames } from '../zone/actions/actionNames';
import { BuildingNames } from '../zone/buildings/buildingNames';
import { JobNames } from '../zone/jobs/jobNames';
import { TechNames } from './techNames';
import { BiomassCompression } from './biomassCompression';
import { Farming } from './farming';
import { Agronomy } from './agronomy';
import { Shelter } from './shelter';
import { Cryonics } from './cryonics';
import { BaseTech } from './baseTech';
import { getGame, getGui } from '../selectors';
import { Forestry } from './forestry';
import { Storage } from './storage';
import { ResourceNames } from '../zone/resources/resourceNames';
import { Unlockable } from '../unlockable';
import { Excavation } from './excavation';
import { Metallurgy } from './metallurgy';
import { Geology } from './geology';
import { Electromagnetism } from './electromagnetism';
import { TechName } from '../gui/gui';
import { SubsurfaceExcavation } from './subsurfaceExcavation';
import { Arboriculture } from './arboriculture';

const techRef = rootRef<BaseTech>('tech_ref', {});

@model('Tech')
export class Tech extends ExtendedModel(Unlockable, {
  selectedTechRef: prop<Ref<BaseTech> | undefined>(),
  [TechNames.BIOMASS_COMPRESSION]: tProp(
    types.model(BiomassCompression),
    () => new BiomassCompression({}),
  ),
  [TechNames.FARMING]: tProp(types.model(Farming), () => new Farming({})),
  [TechNames.AGRONOMY]: tProp(types.model(Agronomy), () => new Agronomy({})),
  [TechNames.SHELTER]: tProp(types.model(Shelter), () => new Shelter({})),
  [TechNames.CRYONICS]: tProp(types.model(Cryonics), () => new Cryonics({})),
  [TechNames.FORESTRY]: tProp(types.model(Forestry), () => new Forestry({})),
  [TechNames.ARBORICULTURE]: tProp(
    types.model(Arboriculture),
    () => new Arboriculture({}),
  ),
  [TechNames.STORAGE]: tProp(types.model(Storage), () => new Storage({})),
  [TechNames.EXCAVATION]: tProp(
    types.model(Excavation),
    () => new Excavation({}),
  ),
  [TechNames.METALLURGY]: tProp(
    types.model(Metallurgy),
    () => new Metallurgy({}),
  ),
  [TechNames.ELECTROMAGNETISM]: tProp(
    types.model(Electromagnetism),
    () => new Electromagnetism({}),
  ),
  [TechNames.SUBSURFACE_EXCAVATION]: tProp(
    types.model(SubsurfaceExcavation),
    () => new SubsurfaceExcavation({}),
  ),
  [TechNames.GEOLOGY]: tProp(types.model(Geology), () => new Geology({})),
}) {
  transientUnlockCheck = () => {
    return (
      getGame(this).initialZone.resources[ResourceNames.BIOMASS].quantity >= 5
    );
  };
  observableUnlockCheck = () => true;

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
   * What actions are unlocked by tech?
   * Relocks override unlocks
   */
  @computed
  get unlockedActions(): ActionNames[] {
    /**
     * These actions are unlocked at the start of the game
     */
    let actions: ActionNames[] = [ActionNames.HARVEST, ActionNames.GENERATE];

    // add unlocked
    for (const tech of this.researchedAsArray) {
      actions.push(...tech.actionsUnlocked);
    }

    // remove relocked
    for (const tech of this.researchedAsArray) {
      actions = actions.filter((action) => {
        return !tech.actionsRelocked.includes(action);
      });
    }
    return actions;
  }

  /**
   * What buildings are unlocked by tech?
   */
  @computed
  get unlockedBuildings(): BuildingNames[] {
    const buildings: BuildingNames[] = [];
    for (const tech of this.researchedAsArray) {
      buildings.push(...tech.buildingsUnlocked);
    }
    return buildings;
  }

  /**
   * What buildings are unlocked by tech?
   */
  @computed
  get unlockedJobs(): JobNames[] {
    const jobs: JobNames[] = [];
    for (const tech of this.researchedAsArray) {
      jobs.push(...tech.jobsUnlocked);
    }
    return jobs;
  }

  /**
   * Is the button expanded?
   */
  @computed
  get isExpanded(): boolean {
    return getGui(this).expandedShipColonyButton === TechName;
  }

  /**
   * Expand this button
   */
  @modelAction
  expandButton() {
    getGui(this).setExpandedShipColonyButton(TechName);
  }

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
