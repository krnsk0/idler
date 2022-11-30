import { model, ExtendedModel, modelAction } from 'mobx-keystone';
import { BaseResource } from './baseResource';
import { ResourceNames } from './resourceNames';

@model(ResourceNames.COLONISTS)
export class Colonists extends ExtendedModel(BaseResource, {}) {
  name = ResourceNames.COLONISTS;
  displayName = 'colonist';
  initialCap = 0;
  unlockWhen = () => this.currentCap > 0;

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
