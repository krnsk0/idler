import { ExtendedModel, modelAction, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { UpgradeNames } from './upgradeNames';
import { getTech, getGui, getModifiers } from '../../selectors';
import { ZoneEntity } from '../zoneEntity';
import { PurchaseCost, PurchaseCostDisplay } from '../sharedTypes';
import { TargetedModifier, TargetedModifierWithSource } from '../modifiers';

export abstract class BaseUpgrade extends ExtendedModel(ZoneEntity, {
  /**
   * Has this upgrade been purchased for this zone?
   */
  purchased: tProp(types.boolean, false),
}) {
  abstract name: UpgradeNames;
  abstract displayName: string;
  abstract description: string;
  abstract cost: PurchaseCost[];
  abstract modifiers: TargetedModifier[];

  /**
   * Responsible for managing when jobs are unlocked
   */
  observableUnlockCheck = () => {
    return getTech(this).unlockedUpgrades.includes(this.name);
  };

  /**
   * What is the modification provided when we consider whether the upgrade
   * has been purchased
   */
  @computed
  get appliedModifiers(): TargetedModifierWithSource[] {
    return this.purchased
      ? this.modifiers.map((modifier) => {
          return {
            ...modifier,
            source: this.name,
          };
        })
      : [];
  }

  /**
   * Current cost with displayable names
   */
  @computed
  get currentCostDisplay(): PurchaseCostDisplay[] {
    return this.cost.map(({ resource, quantity }) => {
      const resourceModel = this.zoneResources[resource];
      return {
        resourceDisplayName: resourceModel.displayName,
        isSatisfied: resourceModel.quantity >= quantity,
        availableQuantity: resourceModel.quantity,
        storageConstrained: quantity > resourceModel.currentCap,
        quantity,
      };
    });
  }

  /**
   * Displayable modifier descriptors
   */
  @computed
  get tooltipDescriptors(): string[] {
    return getModifiers(this).sourceTooltipDescriptors(this.modifiers);
  }

  /**
   * Is storage constrained for any costs
   */
  @computed
  get isStorageConstrainted(): boolean {
    return this.currentCostDisplay.some(
      ({ storageConstrained }) => storageConstrained,
    );
  }

  /**
   * Can this entity be bought?
   */
  @computed
  get affordable(): boolean {
    return this.cost.every(({ resource, quantity }) => {
      return this.zoneResources[resource].quantity >= quantity;
    });
  }

  /**
   * Is the row expanded?
   */
  @computed
  get isExpanded(): boolean {
    return getGui(this).expandedUpgradeRow === this.name;
  }

  /**
   * Expand this button
   */
  @modelAction
  expandButton() {
    getGui(this).setExpandedUpgradeRow(this.name);
  }

  /**
   * Purhcases a new entity if possible
   */
  @modelAction
  buy(): void {
    if (this.affordable) {
      this.cost.forEach(({ resource, quantity }) => {
        this.zoneResources[resource].decrease(quantity, { untracked: true });
      });
      this.purchased = true;
    }
  }

  /**
   * Immediately build
   */
  @modelAction
  cheat(): void {
    console.log(`CHEAT: UPGRADE ${this.name}`);
    this.purchased = true;
  }
}
