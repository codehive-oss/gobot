const x = 0.3;

export function xpToLvl(xp: number): number {
  return Math.floor(x * Math.sqrt(xp));
}

export function lvlToXp(lvl: number): number {
  return Math.floor(Math.pow(lvl / x, 2));
}
