import { modelAction, decoratedModel, ExtendedModel } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { BaseZoneEntity } from '../baseZoneEntity';
interface ProducerOutput {
  resource: ResourceNames;
  quantityPerSecond: number;
}

interface ProducerInput {
  resource: ResourceNames;
  quantityPerSecond: number;
}
export function makeProducer(Base: typeof BaseZoneEntity) {
  abstract class Producer extends ExtendedModel(Base, {}) {
    abstract outputs: Array<ProducerOutput>;
    abstract inputs: Array<ProducerInput>;

    /**
     * Attempts to run production
     */
    tick(delta: number): void {
      this.outputs.forEach((product) => {
        const resourceName = product.resource;
        this.zoneResources[resourceName].increase(
          product.quantityPerSecond * this.quantity * delta,
        );
      });
    }
  }

  /**
   * Needed because decorators do not work in abstract classses
   * See https://mobx-keystone.js.org/class-models#usage-without-decorators
   */
  return decoratedModel(undefined, Producer, { tick: modelAction });
}
