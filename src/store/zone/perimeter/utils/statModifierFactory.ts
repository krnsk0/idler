function getConstrainedRandomFloat(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

interface StatModifiers {
  hpModifier: number;
  movementSpeedModifier: number;
  attackCooldownModifier: number;
  attackDamageModifier: number;
  attackRangeModifier: number;
}

export function statModifierFactory(): StatModifiers {
  return {
    hpModifier: getConstrainedRandomFloat(0.75, 1.25),
    movementSpeedModifier: getConstrainedRandomFloat(0.75, 1.25),
    attackCooldownModifier: getConstrainedRandomFloat(0.75, 1.25),
    attackDamageModifier: getConstrainedRandomFloat(0.75, 1.25),
    attackRangeModifier: getConstrainedRandomFloat(0.75, 1.25),
  };
}
