import { modelAction, decoratedModel, ExtendedModel } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { ZoneEntity } from '../zoneEntity';
interface ProducerOutput {
  resource: ResourceNames;
  quantityPerSecond: number;
}

interface ProducerInput {
  resource: ResourceNames;
  quantityPerSecond: number;
}
export function makeProducer(Base: typeof ZoneEntity) {
  abstract class Producer extends ExtendedModel(Base, {}) {
    abstract outputs: Array<ProducerOutput>;
    abstract inputs: Array<ProducerInput>;

    /**
     * Attempts to run production
     * TODO: only run when we have enough inputs
     * TODO: stop production when hitting maximums
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
