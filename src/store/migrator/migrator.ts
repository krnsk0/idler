import { Game } from '../game';
import { fromSnapshot } from 'mobx-keystone';
import { ensureFirstZoneIsSelected } from './ensureFirstZoneIsSelected';
import { migrateToCurrentVersion } from './migrateToCurrentVersion';

export function migrator(gameJson: any, currentSaveVersion: string): Game {
  return ensureFirstZoneIsSelected(
    fromSnapshot(Game, migrateToCurrentVersion(gameJson, currentSaveVersion)),
  );
}
