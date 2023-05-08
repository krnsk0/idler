import { ColorThemes, Game } from '../game';
import { fromSnapshot } from 'mobx-keystone';
import { ensureFirstZoneIsSelected } from './ensureFirstZoneIsSelected';

interface MakeNewGameProps {
  currentSaveVersion: string;
  colorTheme: ColorThemes;
}

export function makeNewGame({
  currentSaveVersion,
  colorTheme,
}: MakeNewGameProps): Game {
  const game = fromSnapshot(Game, {});
  game.setColorTheme(colorTheme);
  game.metadata.setSaveVersion(currentSaveVersion);
  return ensureFirstZoneIsSelected(game);
}
