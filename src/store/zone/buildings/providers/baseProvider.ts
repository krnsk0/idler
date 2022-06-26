import { idProp, decoratedModel, ExtendedModel } from 'mobx-keystone';
import { BasePurchaseable } from '../basePurchaseable';

abstract class _BaseProvider extends ExtendedModel(BasePurchaseable, {
  id: idProp,
}) {
  abstract displayName: string;
}

/**
 * Needed because decorators do not work in abstract classses
 * See https://mobx-keystone.js.org/class-models#usage-without-decorators
 */
export const BaseProvider = decoratedModel(undefined, _BaseProvider, {});

type BaseProvider = _BaseProvider;
