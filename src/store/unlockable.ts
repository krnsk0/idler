import { Model, modelAction, tProp, types } from 'mobx-keystone';
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
    if (!this.unlocked) {
      if (this.unlockWhen()) {
        this.unlocked = true;
        this.showEntranceAnimation = true;
        setTimeout(() => {
          this.showEntranceAnimation = false;
        }, this.entranceAnimationDuration);
      }
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
