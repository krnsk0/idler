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
    this.highlightQuantity = true;
    setTimeout(() => {
      this.highlightQuantity = false;
    }, this.highlightQuantityAnimationDuration);
    super.decrease(quantity, options);
  }
}
