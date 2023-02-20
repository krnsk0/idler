import { findParent } from 'mobx-keystone';
import { Debug } from './debug/debug';
import { Game } from './game';
import { Gui } from './gui/gui';
import { Metadata } from './metadata';
import { Root } from './root';
import { SystemRegistry } from './systemRegistry';
import { Tech } from './tech/tech';
import { Actions } from './zone/actions/actions';
import { Buildings } from './zone/buildings/buildings';
import { Jobs } from './zone/jobs/jobs';
import { Modifiers } from './zone/modifiers';
import { Power } from './zone/power/power';
import { Resources } from './zone/resources/resources';
import { Upgrades } from './zone/upgrades/upgrades';
import { Zone } from './zone/zone';

export const getSystemRegistry = (child: object): SystemRegistry => {
  const root = findParent<Root>(child, (node) => {
    return node instanceof Root;
  });
  if (!root) throw new Error('no game model found in getGame');
  return root.game.systemRegistry;
};

export const getGame = (child: object): Game => {
  const root = findParent<Root>(child, (node) => {
    return node instanceof Root;
  });
  if (!root) throw new Error('no game model found in getGame');
  return root.game;
};

export const getDebug = (child: object): Debug => {
  const root = findParent<Root>(child, (node) => {
    return node instanceof Root;
  });
  if (!root) throw new Error('no parent root model found in getDebug');
  return root.debug;
};

export const getTech = (child: object): Tech => {
  const root = findParent<Root>(child, (node) => {
    return node instanceof Root;
  });
  if (!root) throw new Error('no parent root model found in getTech');
  return root.game.tech;
};

export const getGui = (child: object): Gui => {
  const root = findParent<Root>(child, (node) => {
    return node instanceof Root;
  });
  if (!root) throw new Error('no parent root model found in getGui');
  return root.gui;
};

export const getZone = (child: object): Zone => {
  const zone = findParent<Zone>(child, (node) => {
    return node instanceof Zone;
  });
  if (!zone) throw new Error('no parent zone model found in getZone');
  return zone;
};

export const getActions = (child: object): Actions => {
  const zone = findParent<Zone>(child, (node) => {
    return node instanceof Zone;
  });
  if (!zone) throw new Error('no parent zone model found in getActions');
  return zone.actions;
};

export const getBuildings = (child: object): Buildings => {
  const zone = findParent<Zone>(child, (node) => {
    return node instanceof Zone;
  });
  if (!zone) throw new Error('no parent zone model found in getZone');
  return zone.buildings;
};

export const getJobs = (child: object): Jobs => {
  const zone = findParent<Zone>(child, (node) => {
    return node instanceof Zone;
  });
  if (!zone) throw new Error('no parent jobs model found in getJobs');
  return zone.jobs;
};

export const getPower = (child: object): Power => {
  const zone = findParent<Zone>(child, (node) => {
    return node instanceof Zone;
  });
  if (!zone) throw new Error('no parent zone model found in getZone');
  return zone.power;
};

export const getResources = (child: object): Resources => {
  const zone = findParent<Zone>(child, (node) => {
    return node instanceof Zone;
  });
  if (!zone) throw new Error('no parent zone model found in getResources');
  return zone.resources;
};

export const getUpgrades = (child: object): Upgrades => {
  const zone = findParent<Zone>(child, (node) => {
    return node instanceof Zone;
  });
  if (!zone) throw new Error('no parent zone model found in getResources');
  return zone.upgrades;
};

export const getModifiers = (child: object): Modifiers => {
  const zone = findParent<Zone>(child, (node) => {
    return node instanceof Zone;
  });
  if (!zone) throw new Error('no parent zone model found in getResources');
  return zone.modifiers;
};

export const getMetadata = (child: object): Metadata => {
  const root = findParent<Root>(child, (node) => {
    return node instanceof Root;
  });
  if (!root) throw new Error('no game model found in getGame');
  return root.game.metadata;
};
