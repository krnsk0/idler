import { ExtendedModel, model, modelAction, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { enumKeys } from '../../../utils/enumKeys';
import { ZoneEntity } from '../zoneEntity';
import { UpgradeNames } from './upgradeNames';
import { CompostingDrums } from './compostingDrums';
import { getTech } from '../../selectors';
import { TechNames } from '../../tech/techNames';
import { Chainsaws } from './chainsaws';
import { Tuyeres } from './tuyeres';
import { HeatReclamators } from './heatReclamators';
import { Prefabrication } from './prefabrication';
import { Crates } from './crates';

@model('Upgrades')
export class Upgrades extends ExtendedModel(ZoneEntity, {
  [UpgradeNames.COMPOSTING_DRUMS]: tProp(
    types.model(CompostingDrums),
    () => new CompostingDrums({}),
  ),
  [UpgradeNames.CHAINSAWS]: tProp(
    types.model(Chainsaws),
    () => new Chainsaws({}),
  ),
  [UpgradeNames.TUYERES]: tProp(types.model(Tuyeres), () => new Tuyeres({})),
  [UpgradeNames.HEAT_RECLAMATORS]: tProp(
    types.model(HeatReclamators),
    () => new HeatReclamators({}),
  ),
  [UpgradeNames.PREFABRICATION]: tProp(
    types.model(Prefabrication),
    () => new Prefabrication({}),
  ),
  [UpgradeNames.CRATES]: tProp(types.model(Crates), () => new Crates({})),
}) {
  transientUnlockCheck = () => {
    return (
      !!this.unlockedAsArray.length &&
      getTech(this)[TechNames.ZONE_UPGRADES].researched
    );
  };
  observableUnlockCheck = () => true;

  /**
   * Returns an iterable list of the upgrade models
   */
  @computed
  get asArray() {
    return enumKeys(UpgradeNames).map((name) => {
      return this[name];
    });
  }

  /**
   * Iterable list of only unlocked upgrades
   */
  @computed
  get unlockedAsArray() {
    return this.asArray.filter((upgrade) => upgrade.unlocked);
  }

  /**
   * Iterable list of only available upgrades
   */
  @computed
  get availableAsArray() {
    return this.unlockedAsArray.filter((upgrade) => !upgrade.purchased);
  }

  /**
   * Iterable list of only purchased upgrades
   */
  @computed
  get purchasedAsArray() {
    return this.unlockedAsArray.filter((upgrade) => upgrade.purchased);
  }
}
