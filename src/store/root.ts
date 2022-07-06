import { model, Model, modelAction, tProp, types } from 'mobx-keystone';
import { Debug } from './debug/debug';
import { Gui } from './gui/gui';
import { Zone } from './zone/zone';

const initialZoneName = 'Planetfall';

@model('Root')
export class Root extends Model({
  zones: tProp(types.array(types.model(Zone)), () => [
    new Zone({ name: initialZoneName }),
  ]),
  gui: tProp(types.model(Gui), () => new Gui({})),
  debug: tProp(types.model(Debug), () => new Debug({})),
}) {
  @modelAction
  addZone() {
    this.zones.push(new Zone({}));
  }
}
