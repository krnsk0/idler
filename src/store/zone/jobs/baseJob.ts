import {
  idProp,
  Model,
  tProp,
  types,
  modelAction,
  decoratedModel,
} from 'mobx-keystone';

abstract class _BaseJob extends Model({
  id: idProp,
  workers: tProp(types.number, 0),
}) {
  abstract displayName: string;

  /**
   * Assign a free worker if possible
   */
  assign(): void {
    this.workers += 1;
  }

  /**
   * Unassign a free worker if possible
   */
  unassign(): void {
    this.workers -= 1;
  }
}

/**
 * Needed because decorators do not work in abstract classses
 * See https://mobx-keystone.js.org/class-models#usage-without-decorators
 */
export const BaseJob = decoratedModel(undefined, _BaseJob, {
  assign: modelAction,
  unassign: modelAction,
});
