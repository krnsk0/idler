import { model, Model, modelAction, tProp, types } from 'mobx-keystone';
import { Gui } from './gui/gui';
import { Zone } from './zone/zone';

const initialZoneName = 'Planetfall';

@model('Root')
export class Root extends Model({
  zones: tProp(types.array(types.model(Zone)), () => [
    new Zone({ name: initialZoneName }),
  ]),
  gui: tProp(types.model(Gui), () => new Gui({})),
}) {
  @modelAction
  addZone() {
    this.zones.push(new Zone({}));
  }
}
