import { idProp, Model, tProp, types, modelAction } from 'mobx-keystone';

export abstract class Producer extends Model({
  id: idProp,
  qty: tProp(types.number, 0),
}) {
  abstract displayName: string;
  abstract tick(): void;
}
