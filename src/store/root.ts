import { model, Model, modelAction, tProp, types } from 'mobx-keystone';
import { Debug } from './debug/debug';
import { Gui } from './gui/gui';
import { Zone } from './zone/zone';
import { Tech } from './tech/tech';

const initialZoneName = 'Planetfall';

@model('Root')
export class Root extends Model({
  zones: tProp(types.array(types.model(Zone)), () => [
    new Zone({ name: initialZoneName }),
  ]),
  tech: tProp(types.model(Tech), () => new Tech({})),
  gui: tProp(types.model(Gui), () => new Gui({})),
  debug: tProp(types.model(Debug), () => new Debug({})),
}) {
  @modelAction
  addZone() {
    this.zones.push(new Zone({}));
  }
}
