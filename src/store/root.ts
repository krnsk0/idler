import { model, Model, modelAction, tProp, types } from 'mobx-keystone';
import { Debug } from './debug/debug';
import { Zone } from './zone/zone';
import { Tech } from './tech/tech';

const initialZoneName = 'Planetfall';

@model('Root')
export class Root extends Model({
  zones: tProp(types.array(types.model(Zone)), () => [
    new Zone({ name: initialZoneName }),
  ]),
  tech: tProp(types.model(Tech), () => new Tech({})),
  debug: tProp(types.model(Debug), () => new Debug({})),
  techModal: tProp(types.boolean, false),
}) {
  @modelAction
  addZone() {
    this.zones.push(new Zone({}));
  }

  @modelAction
  setTechModal(value: boolean) {
    this.techModal = value;
  }
}
