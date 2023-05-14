import { EnemyNames } from '../enemyNames';

interface ThreatProfile {
  threat: number;
  modelName: EnemyNames;
}

// TODO: allow using only unlocked enemies
const enemiesByThreatLevel: Array<ThreatProfile> = [
  { threat: 5, modelName: EnemyNames.PHASE_MANTIS },
  { threat: 1, modelName: EnemyNames.PHASE_WORM },
].sort((a, b) => b.threat - a.threat);

function getStrongestEnemyUnderThreatLevel(
  threatLevel: number,
): ThreatProfile | undefined {
  return enemiesByThreatLevel.find(({ threat }) => threat <= threatLevel);
}

/**
 * Given a threat level, builds a wave of enemies based on their threat level,
 * populating the wave with the highest-threat-level enemies first and then
 * filling out with lower threat-level enemies.
 */

export function waveBuilder(threatLevel: number): EnemyNames[] {
  const enemies: EnemyNames[] = [];
  while (threatLevel > 0) {
    const threatProfile = getStrongestEnemyUnderThreatLevel(threatLevel);
    if (threatProfile) {
      enemies.push(threatProfile.modelName);
      threatLevel -= threatProfile.threat;
    }
  }
  return enemies;
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it('builds waves', () => {
    expect(waveBuilder(1)).toStrictEqual([EnemyNames.PHASE_WORM]);
    expect(waveBuilder(2)).toStrictEqual([
      EnemyNames.PHASE_WORM,
      EnemyNames.PHASE_WORM,
    ]);
    expect(waveBuilder(5)).toStrictEqual([EnemyNames.PHASE_MANTIS]);
    expect(waveBuilder(6)).toStrictEqual([
      EnemyNames.PHASE_MANTIS,
      EnemyNames.PHASE_WORM,
    ]);
  });
}
