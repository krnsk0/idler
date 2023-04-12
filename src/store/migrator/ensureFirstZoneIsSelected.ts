import { Game } from '../game';

export function ensureFirstZoneIsSelected(game: Game): Game {
  if (!game.selectedZoneRef && game.zones.length === 1) {
    game.selectZone(game.initialZone);
  }
  return game;
}
