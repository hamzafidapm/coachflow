const hues = [165, 205, 32, 275, 340, 130];

export function tint(name: string) {
  const h = hues[name.charCodeAt(0) % hues.length];
  return { bg: `oklch(0.32 0.06 ${h})`, ink: `oklch(0.88 0.11 ${h})` };
}

export function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('');
}
