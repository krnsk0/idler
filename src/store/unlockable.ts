import { Model, modelAction, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { getSystemRegistry } from './systemRegistry';

export abstract class Unlockable extends Model({
  unlocked: tProp(types.boolean, false),
}) {
  /**
   * Instances must specify a fucntion, executed during unlock checks,
   * which tells this entity whether to become visible ot the player
   */
  abstract unlockWhen: () => boolean;

  /**
   * A wrapper to memoize unlockWhen without the children needing to worry
   * about using a getter
   */
  @computed
  get shouldUnlock(): boolean {
    return this.unlockWhen();
  }

  /**
   * State for an aniation we see when something first unlocks
   * i.e. when a colonist fies
   */
  showEntranceAnimation = false;
  entranceAnimationDuration = 300;

  /**
   * Runs an unlock check
   */
  @modelAction
  unlockCheck(): void {
    if (!this.unlocked && this.shouldUnlock) {
      this.unlocked = true;
      this.showEntranceAnimation = true;
      setTimeout(() => {
        this.showEntranceAnimation = false;
      }, this.entranceAnimationDuration);
    }
  }

  /**
   * Register with ticking systems
   */
  protected onAttachedToRootStore() {
    const registry = getSystemRegistry(this);
    registry.registerUnlockable(this);
    return () => {
      registry.deregisterUnlockable(this);
    };
  }
}
