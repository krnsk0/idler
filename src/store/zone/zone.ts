import { idProp, model, Model, tProp, types } from 'mobx-keystone';
import { Power } from './power/power';
import { Actions } from './actions/actions';
import { Buildings } from './buildings/buildings';
import { Resources } from './resources/resources';
import { makeZoneName } from './zoneName';
import { Jobs } from './jobs/jobs';
import { Upgrades } from './upgrades/upgrades';
import { Modifiers } from './modifiers/modifiers';
import { Perimeter } from './perimeter/perimeter';
import { Radar } from './radar/radar';

@model('Zone')
export class Zone extends Model({
  id: idProp,
  name: tProp(types.string, makeZoneName).withSetter(),
  power: tProp(types.model(Power), () => new Power({})),
  buildings: tProp(types.model(Buildings), () => new Buildings({})),
  resources: tProp(types.model(Resources), () => new Resources({})),
  actions: tProp(types.model(Actions), () => new Actions({})),
  jobs: tProp(types.model(Jobs), () => new Jobs({})),
  radar: tProp(types.model(Radar), () => new Radar({})),
  perimeter: tProp(types.model(Perimeter), () => new Perimeter({})),
  upgrades: tProp(types.model(Upgrades), () => new Upgrades({})),
  modifiers: tProp(types.model(Modifiers), () => new Modifiers({})),
}) {}
