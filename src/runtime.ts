export interface GravityBounds {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface GravityPoint {
  x: number;
  y: number;
}

export interface VisibleSection {
  intersectionRatio: number;
  isIntersecting: boolean;
  target: Element;
}

export function calculatePageProgress(scrollY: number, scrollHeight: number, viewportHeight: number): number {
  const scrollRange = scrollHeight - viewportHeight;
  if (scrollRange <= 0) {
    return 0;
  }

  return Math.min(1, Math.max(0, scrollY / scrollRange));
}

export function calculateGravityPoint(clientX: number, clientY: number, bounds: GravityBounds): GravityPoint {
  if (bounds.width <= 0 || bounds.height <= 0) {
    return { x: 56, y: 24 };
  }

  return {
    x: ((clientX - bounds.left) / bounds.width) * 100,
    y: ((clientY - bounds.top) / bounds.height) * 100,
  };
}

export function mostVisibleSectionId(entries: readonly VisibleSection[]): string | undefined {
  return entries
    .filter((entry) => entry.isIntersecting)
    .toSorted((left, right) => right.intersectionRatio - left.intersectionRatio)[0]?.target.id;
}
