import { Model, modelAction, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { getSystemRegistry } from './systemRegistry';
import { entranceAnimationDuration } from '../globalStyles';

export abstract class Unlockable extends Model({
  /**
   * Some unlockables depend on a condition being met once. E.g. the player
   * has held at least N of resource Y. If resource Y drops below the threshhold
   * this condition remains satisfied.
   *
   * Whether this transient condition has been satisfied must be persisted and
   * cannot be derived from the current state of the application, because it is
   * derived from past history we don't have access to.
   *
   * At what timestamp did this element unlock?
   * We store time as it is useful for detemining when entrance animation is done
   */
  _unlockTime: tProp(types.maybe(types.number), undefined),
}) {
  /**
   * Not memoizeable, runs every tick until satisfied.
   */
  abstract transientUnlockCheck: () => boolean;
  /**
   * Intended to be implemented by abstract classes that inherit this one,
   * teaching them what to observe to unlock
   */
  abstract observableUnlockCheck: () => boolean;

  /**
   * Helper that lets us get around child classes implementing an
   * `@observable`-decorated `observableUnlockCheck`
   */
  @computed
  get _observableUnlockCheck(): boolean {
    return this.observableUnlockCheck();
  }

  /**
   * State for an aniation we see when something first unlocks
   */
  showEntranceAnimation(): boolean {
    if (!this._unlockTime) return false;

    return Date.now() - this._unlockTime < entranceAnimationDuration;
  }

  /**
   * Whether the entity is unlocked and should be e.g. shown to the player
   * in the UI
   */
  @computed
  get unlocked(): boolean {
    return !!this._unlockTime;
  }

  /**
   * Runs an unlock check
   */
  @modelAction
  runTransientUnlockCheck(): void {
    if (
      // prevents premature unlocking
      // also a perf optimization
      this._observableUnlockCheck &&
      // did we pass the transient check
      this.transientUnlockCheck()
    ) {
      if (!this._unlockTime) {
        this._unlockTime = Date.now();
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
