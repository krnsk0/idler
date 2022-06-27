import { idProp, Model, tProp, types, modelAction } from 'mobx-keystone';

export abstract class BaseJob extends Model({
  id: idProp,
  workers: tProp(types.number, 0),
}) {
  abstract displayName: string;

  /**
   * Assign a free worker if possible
   */
  @modelAction
  assign(): void {
    this.workers += 1;
  }

  /**
   * Unassign a free worker if possible
   */
  @modelAction
  unassign(): void {
    this.workers -= 1;
  }
}
