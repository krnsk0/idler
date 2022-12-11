import { setGlobalConfig } from 'mobx-keystone';
import { Root } from '../src/store/root';

setGlobalConfig({ showDuplicateModelNameWarnings: false });
const root = new Root({});

console.log('hello5');
