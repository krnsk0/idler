import { Game } from '../game';
import { fromSnapshot } from 'mobx-keystone';
import { ensureFirstZoneIsSelected } from './ensureFirstZoneIsSelectes';

class ExceededMigrationLoopError extends Error {
  constructor(message?: any) {
    super(message);
    this.name = 'ExceededMigrationLoopError';
  }
}
class NoSaveVersionFoundError extends Error {
  constructor(message?: any) {
    super(message);
    this.name = 'NoSaveVersionFoundError';
  }
}

/**
 * Selector for the version
 */
function findSaveVersion(gameJson: any): string {
  const maybeSaveVersion = gameJson?.metadata?.saveVersion ?? undefined;
  if (!maybeSaveVersion || typeof maybeSaveVersion !== 'string') {
    throw new NoSaveVersionFoundError();
  }
  return maybeSaveVersion;
}

/**
 * Sets save version. Assumes it exists
 */
function setSaveVersion(gameJson: any, version: string) {
  gameJson.metadata.saveVersion = version;
}

/**
 * These are migrator funcitons. Each function should migrate from
 * the version in the map key to the next version up
 */
const migrationMap: Record<string, (gameJson: any) => any> = {
  '0.0.1': (gameJson) => {
    setSaveVersion(gameJson, '0.0.2');
    return gameJson;
  },
};

/**
 * Migrates up to the current save version, throwing if it is not possible to
 * do so
 */
export function migrator(savegame: string, currentSaveVersion: string): Game {
  let gameJson = JSON.parse(savegame);

  /**
   * If the save version is less than the current version,
   * we need to migrate.
   */
  let loops = 0;
  while (findSaveVersion(gameJson) !== currentSaveVersion) {
    const saveVersion = findSaveVersion(gameJson);
    console.log(`found game with version ${saveVersion}`);

    /**
     * Bail if we loop too many times
     */
    loops += 1;
    if (loops > 100) throw new ExceededMigrationLoopError();

    /**
     * Run migation
     */
    gameJson = migrationMap[saveVersion](gameJson);
    console.log(`migrated to ${findSaveVersion(gameJson)}`);
  }
  console.log(`migration complete`);

  /**
   * Before returning, need to deserialize to MST.
   * This can throw, but is expected to be handled in the caller
   */
  return ensureFirstZoneIsSelected(fromSnapshot(Game, gameJson));
}
