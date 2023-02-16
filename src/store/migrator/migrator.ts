import { fromSnapshot } from 'mobx-keystone';
import { Game } from '../game';

export function migrator(savegame: string, currentSaveVersion: string): Game {
  const gameJson = JSON.parse(savegame);

  // TODO - migration happens here

  // Once we get here, we've finished migrating
  const deserializedGame = fromSnapshot(Game, gameJson);

  // Prevents a bug in which the initial zone is not selected
  // after loading; root cause unknown
  if (
    !deserializedGame.selectedZoneRef &&
    deserializedGame.zones.length === 1
  ) {
    deserializedGame.selectZone(deserializedGame.zones[0]);
  }

  return deserializedGame;
}
