import { Model, modelAction, tProp, types } from 'mobx-keystone';

export abstract class Unlockable extends Model({
  unlocked: tProp(types.boolean, false),
}) {
  abstract unlockWhen: () => boolean;
  /**
   * Runs an unlock check
   */
  @modelAction
  unlockCheck(): void {
    if (!this.unlocked) {
      this.unlocked = this.unlockWhen();
    }
  }
}
