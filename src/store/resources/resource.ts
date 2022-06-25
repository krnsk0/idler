import { idProp, Model, tProp, types, modelAction } from 'mobx-keystone';

export abstract class Resource extends Model({
  id: idProp,
  qty: tProp(types.number, 0),
}) {
  abstract displayName: string;
  abstract displayColor: string;

  @modelAction
  increase(qty: number): void {
    this.qty += qty;
  }

  @modelAction
  decrease(qty: number): void {
    this.qty -= qty;
  }
}
