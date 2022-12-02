import { Model } from 'mobx-keystone';
import { getSystemRegistry } from './systemRegistry';

/**
 * Participates in the ticking system by registering with it... but
 * may not actually tick unless it has actions with the right names
 */
export abstract class Tickable extends Model({}) {
  /**
   * Register with ticking systems
   */
  protected onAttachedToRootStore() {
    const registry = getSystemRegistry(this);
    registry.register(this);
    return () => {
      registry.deregister(this);
    };
  }
}
