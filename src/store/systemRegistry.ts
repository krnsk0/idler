import { Model, model, modelAction, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { Game } from './game';
import { getDebug, getGame } from './selectors';

export interface Unlockable {
  runTransientUnlockCheck: () => void;
}

/**
 * All animation frame update flow through the models that
 * get registered here
 */
@model('SystemRegistry')
export class SystemRegistry extends Model({
  paused: tProp(types.boolean, false),
}) {
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
   *
   * delta is in seconds
   */
  @modelAction
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
     * Tick perimeter
     */
    this.game.zones.forEach((zone) => {
      zone.radar.tick(delta);
      zone.perimeter.tick(delta);
    });

    /**
     * Unlock checks happen after everything else to ensure that unlock
     * conditions are met before doing the check
     */
    this.unlockables.forEach((model: Unlockable) => {
      model.runTransientUnlockCheck();
    });
  }

  /**
   * If a tick is too long, break it up to run as a batch. This is intended
   * to be called externally
   */
  @modelAction
  executeTick(time: number): void {
    if (this.paused) return;

    // reject ticks that are over 10 sec long
    if (time > 10) return;

    let timeRemaining = time * (getDebug(this).hyperMode ? 20 : 1);
    // ticks longer than this get split
    const tickBreakupThreshhold = 1;
    const start = performance.now();
    while (timeRemaining > tickBreakupThreshhold) {
      this.doTick(tickBreakupThreshhold);
      timeRemaining -= tickBreakupThreshhold;
    }
    this.doTick(timeRemaining);
    if (time > tickBreakupThreshhold) {
      console.log('broke up long tick of length', time);
      console.log(`took ${(performance.now() - start).toFixed(2)}ms`);
    }
  }

  @modelAction
  pauseGame() {
    this.paused = true;
  }

  @modelAction
  unpauseGame() {
    this.paused = false;
  }

  /**
   * Can be necessary to call if cleanup does not happen
   * automatically when replacing large parts of the game
   * state
   */
  @modelAction
  clearState() {
    this.unlockables.clear();
  }
}
