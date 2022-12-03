import { Model, modelAction, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { getSystemRegistry } from './systemRegistry';

interface UnlockWhen {
  /**
   * This function checks non-transient unlock conditions
   */
  observable: () => boolean;
  /**
   * This function should check transient unlock conditions
   */
  transient: () => boolean;
}

export abstract class Unlockable extends Model({
  /**
   * Some unlockables depend on a condition being met once. E.g. the player
   * has held at least N of resource Y. If resource Y drops below the threshhold
   * this condition remains satisfied.
   *
   * Whether this transient condition has been satisfied must be persisted and
   * cannot be derived from the current state of the application, because it is
   * derived from past history we don't have access to.
   */
  _transientUnlockConditionSatisfied: tProp(types.boolean, false),
}) {
  abstract unlockWhen: UnlockWhen;

  /**
   * State for an aniation we see when something first unlocks
   * i.e. when a colonist fies
   */
  showEntranceAnimation = false;
  entranceAnimationDuration = 300;

  /**
   * Whether the entity is unlocked and should be e.g. shown to the player
   * in the UI
   */
  @computed
  get unlocked(): boolean {
    if (!this.unlockWhen.observable()) return false;

    if (this._transientUnlockConditionSatisfied) {
      this.showEntranceAnimation = true;
      setTimeout(() => {
        this.showEntranceAnimation = false;
      }, this.entranceAnimationDuration);
    }

    return this._transientUnlockConditionSatisfied;
  }

  /**
   * Runs an unlock check
   */
  @modelAction
  runTransientUnlockCheck(): void {
    if (this.unlockWhen.transient()) {
      this._transientUnlockConditionSatisfied = true;
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
