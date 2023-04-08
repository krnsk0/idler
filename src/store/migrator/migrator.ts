import { fromSnapshot } from 'mobx-keystone';
import { Game } from '../game';
import { ensureFirstZoneIsSelected } from './ensureFirstZoneIsSelected';

export class ExceededMigrationLoopError extends Error {
  constructor(message?: any) {
    super(message);
    this.name = 'ExceededMigrationLoopError';
  }
}
export class NoSaveVersionFoundError extends Error {
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
  '0.0.2': (gameJson) => {
    setSaveVersion(gameJson, '0.0.3');
    return gameJson;
  },
};

/**
 * Migrates up to the current save version, throwing if it is not possible to
 * do so
 */
export function migrateToCurrentVersion(
  input: any,
  currentSaveVersion: string,
): any {
  let gameJson = input;
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
  return gameJson;
}

export function migrator(gameJson: any, currentSaveVersion: string): Game {
  return ensureFirstZoneIsSelected(
    fromSnapshot(Game, migrateToCurrentVersion(gameJson, currentSaveVersion)),
  );
}
