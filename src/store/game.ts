import {
  findParent,
  model,
  Model,
  modelAction,
  tProp,
  types,
} from 'mobx-keystone';
import { Zone } from './zone/zone';
import { Tech } from './tech/tech';
import { Root } from './root';

const initialZoneName = 'Landing Zone';

@model('Game')
export class Game extends Model({
  zones: tProp(types.array(types.model(Zone)), () => [
    new Zone({ name: initialZoneName }),
  ]),
  tech: tProp(types.model(Tech), () => new Tech({})),
}) {
  @modelAction
  addZone() {
    this.zones.push(new Zone({}));
  }
}

export const getGame = (child: object): Game => {
  const root = findParent<Root>(child, (node) => {
    return node instanceof Root;
  });
  if (!root) throw new Error('no game model found in getGame');
  return root.game;
};
