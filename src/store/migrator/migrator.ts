import { Game } from '../game';
import { fromSnapshot } from 'mobx-keystone';
import { migrateToCurrentVersion } from './migrateToCurrentVersion';
import { ensureFirstZoneIsSelected } from './ensureFirstZoneIsSelected';

export function migrator(gameJson: any, currentSaveVersion: string): Game {
  return ensureFirstZoneIsSelected(
    fromSnapshot(Game, migrateToCurrentVersion(gameJson, currentSaveVersion)),
  );
}
