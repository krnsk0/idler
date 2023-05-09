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
  const baseModifier = getConstrainedRandomFloat(0.75, 1.25);

  return {
    hpModifier: baseModifier + getConstrainedRandomFloat(-0.1, 0.1),
    movementSpeedModifier: baseModifier + getConstrainedRandomFloat(-0.1, 0.1),
    attackCooldownModifier: baseModifier + getConstrainedRandomFloat(-0.1, 0.1),
    attackDamageModifier: baseModifier + getConstrainedRandomFloat(-0.1, 0.1),
    attackRangeModifier: baseModifier + getConstrainedRandomFloat(-0.1, 0.1),
  };
}
