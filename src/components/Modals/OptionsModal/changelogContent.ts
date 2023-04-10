export interface ChangelogEntry {
  version: string;
  changes: string[];
}

export const changelogContent: ChangelogEntry[] = [
  {
    version: '0.0.3',
    changes: [
      'add changelogs to options menu',
      'fix: consumption modifiers apply to already-constructed buildings',
      'options modal and tech modal restyled on desktop',
      'colonist food consumption shown in colonist tooltip',
      'reduce initial cost for cache and dynamo',
      'fix: rounding error in storage cap calculation',
      'fix: tab bar scrolls on mobile',
      'fix: jobs tab does not overlap resources on very narrow screens',
    ],
  },
  {
    version: '0.0.2',
    changes: [
      'early game rebalance',
      'jobs can modify production',
      "more jobs - there's new jobs and new tech for them",
      'add upgrade tab',
      'tooltips show prorated production',
      'tooltips show why production is constrained',
      'save migration system',
      'tech tree reorganization',
    ],
  },
];
