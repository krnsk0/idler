import { Model, tProp, types } from 'mobx-keystone';
import { Autoballista } from '../zone/perimeter/turrets/autoballista';

/**
 * Instances of turrets actually used for combat are stored in zone data,
 * and there are often multiples of them
 *
 * This model exists to store  single global isntances of turrets to run
 * theri unlock logic and to allow us to reason about which are purchaseable
 * based on this logic
 */
export class Turrets extends Model({
  autoBallista: tProp(types.model(Autoballista), () => new Autoballista({})),
}) {}
