import { model, Model, tProp, types } from 'mobx-keystone';
import { ProducerNames } from './producers/producerNames';
import { ProviderNames } from './providers/providerNames';
import { Farm } from '../zone/producers/farm';
import { Habitat } from '../zone/providers/habitat';

@model('Buildings')
export class Buildings extends Model({
  [ProducerNames.Farm]: tProp(types.model(Farm), () => new Farm({})),
  [ProviderNames.Habitat]: tProp(types.model(Habitat), () => new Habitat({})),
}) {}
