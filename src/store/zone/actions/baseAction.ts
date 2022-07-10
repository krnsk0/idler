import { modelAction, ExtendedModel, tProp, types } from 'mobx-keystone';
import { ResourceNames } from '../resources/resourceNames';
import { ZoneEntity } from '../zoneEntity';
import { ActionNames } from './actionNames';
import { computed } from 'mobx';
import { getResources } from '../resources/resources';
import { getPower } from '../power/power';
import { getTech } from '../../tech/tech';
import { TechEffectNames } from '../../tech/techEffectTypes';

interface ActionInput {
  resource: ResourceNames;
  quantity: number;
}

interface ActionInputDisplay {
  resourceDisplayName: string;
  quantity: number;
}

interface ActionOutputDisplay {
  resourceDisplayName: string;
  quantity: number;
}

interface ActionOutput {
  resource: ResourceNames;
  quantity: number;
}

export abstract class BaseAction extends ExtendedModel(ZoneEntity, {
  unlocked: tProp(types.boolean, false),
  progress: tProp(types.number, 0),
  active: tProp(types.boolean, false),
}) {
  abstract name: ActionNames;
  abstract displayName: string;
  abstract description: string;
  abstract duration: number;
  abstract inputs: Array<ActionInput>; // consumed when action starts
  abstract outputs: Array<ActionOutput>; // received when action is done
  abstract basePowerProduction: number;
  abstract basePowerConsumption: number;
  abstract unlockWhen: () => boolean;

  /**
   * Current inputs with displayable names
   */
  @computed
  get inputsDisplay(): Array<ActionInputDisplay> {
    return this.inputs.map(({ resource, quantity }) => {
      return {
        resourceDisplayName: getResources(this)[resource].displayName,
        quantity,
      };
    });
  }

  /**
   * Current inputs with displayable names
   */
  @computed
  get outputsDisplay(): Array<ActionOutputDisplay> {
    return this.outputs.map(({ resource, quantity }) => {
      return {
        resourceDisplayName: getResources(this)[resource].displayName,
        quantity,
      };
    });
  }

  /**
   * Can this action be kicked off?
   */
  @computed
  get enabled(): boolean {
    const affordable = this.inputs.every(({ resource, quantity }) => {
      return this.zoneResources[resource].quantity >= quantity;
    });

    const emptySpace =
      this.outputs.length === 0 ||
      this.outputs.some(({ resource }) => {
        return (
          this.zoneResources[resource].quantity <
          this.zoneResources[resource].currentCap
        );
      });

    return affordable && emptySpace;
  }

  /**
   * Power production
   */
  @computed
  get powerProduction(): number {
    if (this.active) {
      return this.basePowerProduction;
    } else return 0;
  }

  /**
   * Power consumption
   */
  @computed
  get powerConsumption(): number {
    if (this.active) {
      return this.basePowerConsumption;
    } else return 0;
  }

  /**
   * Helper intended to be called in unlockWhen
   */
  @computed
  get isUnlockedByTech(): boolean {
    return !!getTech(this).allTechEffects.find((effect) => {
      return (
        effect.kind === TechEffectNames.ACTION_UNLOCK &&
        effect.actionName === this.name
      );
    });
  }

  /**
   * What happens when the action is done?
   */
  @modelAction
  onActionComplete(): void {
    this.outputs.every(({ resource, quantity }) => {
      this.zoneResources[resource].increase(quantity, { untracked: true });
    });
  }

  /**
   * Ticks the action's progress
   */
  @modelAction
  tick(delta: number): void {
    if (this.active) {
      let satisfaction;
      if (this.basePowerConsumption > 0) {
        satisfaction = getPower(this).satisfaction;
      } else {
        satisfaction = 1;
      }

      const progressThisTick = (delta / this.duration) * satisfaction;
      if (this.progress + progressThisTick < 1) {
        this.progress += progressThisTick;
      } else {
        this.progress = 0;
        this.active = false;
        this.onActionComplete();
      }
    }
  }

  /**
   * Starts advancing progress bar on next tick
   */
  @modelAction
  start(): void {
    if (!this.active && this.enabled) {
      this.inputs.every(({ resource, quantity }) => {
        this.zoneResources[resource].decrease(quantity, { untracked: true });
      });
      this.active = true;
    }
  }

  /**
   * Runs an unlock check
   */
  @modelAction
  unlockCheck(): void {
    if (!this.unlocked) {
      this.unlocked = this.unlockWhen();
    }
  }
}
