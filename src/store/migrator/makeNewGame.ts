import { Game } from '../game';
import { fromSnapshot } from 'mobx-keystone';
import { ensureFirstZoneIsSelected } from './ensureFirstZoneIsSelectes';

export function makeNewGame(currentSaveVersion: string): Game {
  const game = fromSnapshot(Game, {});
  game.metadata.setSaveVersion(currentSaveVersion);
  return ensureFirstZoneIsSelected(game);
}
