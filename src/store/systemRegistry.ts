import { findParent, getRoot, Model, model, modelAction } from 'mobx-keystone';
import { computed } from 'mobx';
import { getDebug } from './debug/debug';
import { Root } from './root';
import { Game, getGame } from './game';

export interface Unlockable {
  unlockCheck: () => void;
}

/**
 * All animation frame update flow through the models that
 * get registered here
 */
@model('SystemRegistry')
export class SystemRegistry extends Model({}) {
  /**
   * There are a lot of unlockables and walking the tree to find them is
   * a performance cost, so they register themselves here
   */
  unlockables = new Set<Unlockable>();
  @modelAction
  registerUnlockable(model: Unlockable) {
    this.unlockables.add(model);
  }
  @modelAction
  deregisterUnlockable(model: Unlockable) {
    this.unlockables.delete(model);
  }

  @computed
  get game(): Game {
    return getGame(this);
  }

  /**
   * This is the actual tick executor and the order in which things are called
   * here matters a great deal for the simulation; e.g. if we do a food check
   * before production we might kill workers unnecessarily
   */
  private doTick(delta: number): void {
    /**
     * Tick all actions.
     */
    this.game.zones.forEach((zone) => {
      zone.actions.asArray.forEach((action) => {
        action.tick(delta);
      });
    });

    /**
     * Tick tech
     */
    this.game.tech.tick(delta);

    /**
     * Tick all buildings.
     */
    this.game.zones.forEach((zone) => {
      zone.buildings.asArray.forEach((building) => {
        building.tick(delta);
      });
    });

    /**
     * Tick all jobs.
     */
    this.game.zones.forEach((zone) => {
      zone.jobs.asArray.forEach((job) => {
        job.tick(delta);
      });
    });

    /**
     * Tick food consumption
     */
    this.game.zones.forEach((zone) => {
      zone.jobs.tick(delta);
    });

    /**
     * Tick resources
     */
    this.game.zones.forEach((zone) => {
      zone.resources.asArray.forEach((resource) => {
        resource.tick(delta);
      });
    });

    /**
     * Unlock checks happen after everything else to ensure that unlock
     * conditions are met before doing the check
     */
    this.unlockables.forEach((model: any) => {
      model.unlockCheck();
    });
  }

  /**
   * If a tick is too long, break it up to run as a batch. This is intended
   * to be called externally
   */
  @modelAction
  executeTick(time: number): void {
    let timeRemaining = time * (getDebug(this).hyperMode ? 20 : 1);
    // longest allowable tick length
    const longestTick = 1;
    const start = performance.now();
    while (timeRemaining > longestTick) {
      this.doTick(longestTick);
      timeRemaining -= longestTick;
    }
    this.doTick(timeRemaining);
    if (time > longestTick) {
      console.log('broke up long tick of length', time);
      console.log(`took ${(performance.now() - start).toFixed(2)}ms`);
    }
  }
}

export const getSystemRegistry = (child: object): SystemRegistry => {
  const root = findParent<Root>(child, (node) => {
    return node instanceof Root;
  });
  if (!root) throw new Error('no game model found in getGame');
  return root.game.systemRegistry;
};
