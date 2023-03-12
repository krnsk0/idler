import { describe, it, expect } from 'vitest';
import {
  migrateToCurrentVersion,
  NoSaveVersionFoundError,
} from './migrateToCurrentVersion';

describe('the migrateToCurrentVersion function', () => {
  it('should throw when passed a save with no version string', async () => {
    const save = await import('./sampleSaves/noVersion.json');
    const latestVersion = import.meta.env.PACKAGE_VRSION;
    expect(() => migrateToCurrentVersion(save, latestVersion)).toThrowError(
      NoSaveVersionFoundError,
    );
  });
});
