import {
  idProp,
  modelAction,
  decoratedModel,
  ExtendedModel,
} from 'mobx-keystone';
import { ResourceNames } from '../../resources/resourceNames';
import { BasePurchaseable } from '../basePurchaseable';

interface ProducerOutput {
  resource: ResourceNames;
  quantityPerSecond: number;
}

interface ProducerInput {
  resource: ResourceNames;
  quantityPerSecond: number;
}

abstract class _BaseProducer extends ExtendedModel(BasePurchaseable, {
  id: idProp,
}) {
  abstract displayName: string;
  abstract outputs: Array<ProducerOutput>;
  abstract inputs: Array<ProducerInput>;

  /**
   * Attempts to run production
   */
  tick(delta: number): void {
    this.outputs.forEach((product) => {
      const resourceName = product.resource;
      const qps = product.quantityPerSecond;
      this.zoneResources[resourceName].increase(qps * this.quantity * delta);
    });
  }
}

/**
 * Needed because decorators do not work in abstract classses
 * See https://mobx-keystone.js.org/class-models#usage-without-decorators
 */
export const BaseProducer = decoratedModel(undefined, _BaseProducer, {
  tick: modelAction,
});

type BaseProducer = _BaseProducer;
