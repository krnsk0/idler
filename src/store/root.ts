import { model, Model, modelAction, tProp, types } from 'mobx-keystone';
import { Debug } from './debug/debug';
import { Zone } from './zone/zone';
import { Tech } from './tech/tech';
import { Gui } from './gui/gui';

const initialZoneName = 'Planetfall';

@model('Root')
export class Root extends Model({
  zones: tProp(types.array(types.model(Zone)), () => [
    new Zone({ name: initialZoneName }),
  ]),
  tech: tProp(types.model(Tech), () => new Tech({})),
  debug: tProp(types.model(Debug), () => new Debug({})),
  gui: tProp(types.model(Gui), () => new Gui({})),
}) {
  @modelAction
  addZone() {
    this.zones.push(new Zone({}));
  }
}
