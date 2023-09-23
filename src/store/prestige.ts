import { Model, model, tProp, types } from 'mobx-keystone';
import { computed } from 'mobx';
import { getGame } from './selectors';

const MAX_WAVE_DEFEATED_MULTIPLIER = 10;

interface NewXpDisplay {
  maxWaveDefeated: number;
  maxWaveDefatedMultiplier: number;
  newXpThisRun: number;
}

/**
 * Persistent data that is not cleared between runs
 */
@model('Prestige')
export class Prestige extends Model({
  xp: tProp(types.number, 0),
}) {
  @computed
  get newXpDisplay(): NewXpDisplay {
    const maxWaveDefeated = getGame(this).zones[0].radar.currentWave - 1;
    return {
      maxWaveDefeated,
      maxWaveDefatedMultiplier: MAX_WAVE_DEFEATED_MULTIPLIER,
      newXpThisRun: maxWaveDefeated * MAX_WAVE_DEFEATED_MULTIPLIER,
    };
  }

  @computed
  get newXpThisRun(): number {
    return this.newXpDisplay.newXpThisRun;
  }
}
