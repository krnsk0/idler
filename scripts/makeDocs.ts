import { writeFileSync } from 'fs';
import { join } from 'path';
import { setGlobalConfig } from 'mobx-keystone';
import { Root } from '../src/store/root';

// prevents mobx-keystone from complaining when hot-reloading
setGlobalConfig({ showDuplicateModelNameWarnings: false });

const FILE_PATH = join('docs', 'TECH_TREE.md');

type Tech = string;
type Relationship = [Tech, Tech];

function writeFile(data: string) {
  writeFileSync(FILE_PATH, data);
}

function makeTree(relationships: Relationship[]) {
  return `
\`\`\`mermaid
flowchart TD;
${relationships
  .map((rel) => {
    const [first, second] = rel;
    return `  ${first} --> ${second}\n`;
  })
  .join('')}
\`\`\`
`;
}

function getRelationships(root: Root): Relationship[] {
  const relationships: Relationship[] = [];
  root.game.tech.asArray.forEach((parent) => {
    parent.techUnlocked.forEach((child) => {
      relationships.push([parent.name, child]);
    });
  });
  return relationships;
}

console.log('REGENERATING ./docs/TECH_TREE.md');
writeFile(makeTree(getRelationships(new Root({}))));
