import {
  modelAction,
  ExtendedModel,
  tProp,
  types,
  getSnapshot,
} from 'mobx-keystone';
import { computed } from 'mobx';
import { ZoneEntity } from '../zoneEntity';
import { ResourceNames } from '../resources/resourceNames';
import { ProducerNames } from './producerNames';
import { getResources } from '../resources/resources';
import { getTech } from '../../tech/tech';
import { TechEffectNames } from '../../tech/techEffectTypes';
import { enumKeys } from '../../../helpers/enumKeys';

interface Storage {
  resource: ResourceNames;
  quantity: number;
}

interface PurchaseCost {
  resource: ResourceNames;
  quantity: number;
}

interface PurchaseCostDisplay {
  resourceDisplayName: string;
  quantity: number;
}

interface ProducerOutput {
  resource: ResourceNames;
  quantityPerSecond: number;
}

interface ProducerInput {
  resource: ResourceNames;
  quantityPerSecond: number;
}

interface ProducerEffectDisplay {
  resourceDisplayName: string;
  quantityPerSecond: number;
}

interface ProducerStorageDispay {
  resourceDisplayName: string;
  quantity: number;
}

export abstract class BaseProducer extends ExtendedModel(ZoneEntity, {
  unlocked: tProp(types.boolean, false),
  quantity: tProp(types.number, 0),
}) {
  abstract name: ProducerNames;
  abstract displayName: string;
  abstract description: string;
  abstract splashText: string;
  abstract storage: Array<Storage>;
  abstract baseCost: Array<PurchaseCost>;
  abstract costExponent: number;
  abstract outputs: Array<ProducerOutput>;
  abstract inputs: Array<ProducerInput>;
  abstract unlockWhen: () => boolean;

  /**
   * Given the name of a resource, tells the caller how much of that resource
   * this producer can store
   */
  getStorageAmountByKey(resourceName: ResourceNames): number {
    const entry = this.storage.find((entry) => entry.resource === resourceName);
    return entry ? entry.quantity : 0;
  }

  /**
   * Resource cost adjusted according to exponentiation
   */
  @computed
  get currentCost(): Array<PurchaseCost> {
    return this.baseCost.map(({ resource, quantity: baseCost }) => {
      return {
        resource,
        quantity: baseCost * this.costExponent ** this.quantity,
      };
    });
  }

  /**
   * Current cost with displayable names
   */
  @computed
  get currentCostDisplay(): Array<PurchaseCostDisplay> {
    return this.currentCost.map(({ resource, quantity }) => {
      return {
        resourceDisplayName: getResources(this)[resource].displayName,
        quantity,
      };
    });
  }

  /**
   * Can this entity be bought?
   */
  @computed
  get affordable(): boolean {
    return this.currentCost.every(({ resource, quantity }) => {
      return this.zoneResources[resource].quantity >= quantity;
    });
  }

  /**
   * Effects with displayable names
   */
  @computed
  get displayEffects(): Array<ProducerEffectDisplay> {
    return [
      ...this.inputs.map(({ resource, quantityPerSecond }) => {
        return {
          resourceDisplayName: getResources(this)[resource].displayName,
          quantityPerSecond: -quantityPerSecond,
        };
      }),
      ...this.outputs.map(({ resource, quantityPerSecond }) => {
        return {
          resourceDisplayName: getResources(this)[resource].displayName,
          quantityPerSecond,
        };
      }),
    ];
  }

  /**
   * Storage with displayable names
   */
  @computed
  get displayStorage(): Array<ProducerStorageDispay> {
    return this.storage.map(({ resource, quantity }) => {
      return {
        resourceDisplayName: getResources(this)[resource].displayName,
        quantity,
      };
    });
  }

  /**
   * Helper intended to be called in unlockWhen
   */
  @computed
  get isUnlockedByTech(): boolean {
    return !!getTech(this).allTechEffects.find((effect) => {
      return (
        effect.kind === TechEffectNames.PRODUCER_UNLOCK &&
        effect.producerName === this.name
      );
    });
  }

  /**
   * Purhcases a new entity if possible
   */
  @modelAction
  buy(quantity: number): void {
    if (this.affordable) {
      this.currentCost.forEach(({ resource, quantity }) => {
        this.zoneResources[resource].decrease(quantity, { untracked: true });
      });
      this.quantity += quantity;
    }
  }

  /**
   * Attempts to run production
   * TODO: only run when we have enough inputs
   * TODO: stop production when hitting maximums
   */
  @modelAction
  tick(delta: number): void {
    this.outputs.forEach((product) => {
      const potentialProduction =
        product.quantityPerSecond * this.quantity * delta;
      const resourceModel = this.zoneResources[product.resource];
      resourceModel.increase(potentialProduction);
    });
  }

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
