import { Game } from '../game';
import { fromSnapshot } from 'mobx-keystone';
import { ensureFirstZoneIsSelected } from './ensureFirstZoneIsSelected';
import { ColorThemes } from '../persistedGui';

interface MakeNewGameProps {
  currentSaveVersion: string;
  colorTheme: ColorThemes;
}

export function makeNewGame({
  currentSaveVersion,
  colorTheme,
}: MakeNewGameProps): Game {
  const game = fromSnapshot(Game, {});
  game.persistedGui.setColorTheme(colorTheme);
  game.metadata.setSaveVersion(currentSaveVersion);
  return ensureFirstZoneIsSelected(game);
}
