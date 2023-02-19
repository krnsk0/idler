import { model, ExtendedModel, modelAction } from 'mobx-keystone';
import { BaseResource } from './baseResource';
import { ResourceNames } from './resourceNames';

export const FOOD_PER_WORKER_PER_SECOND_BASE = 0.2;

@model(ResourceNames.COLONISTS)
export class Colonists extends ExtendedModel(BaseResource, {}) {
  name = ResourceNames.COLONISTS;
  displayName = 'colonists';
  initialCap = 0;

  /**
   * Decreases quantity. Optionally can turn off tracking for average rate
   */
  @modelAction
  decrease(quantity: number, options?: { untracked?: boolean }): void {
    this.showHighlight = true;
    setTimeout(() => {
      this.showHighlight = false;
    }, this.highlightAnimationDuration);
    super.decrease(quantity, options);
  }
}
