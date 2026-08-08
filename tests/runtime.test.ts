import assert from "node:assert/strict";
import { test } from "vitest";
import { calculateGravityPoint, calculatePageProgress, mostVisibleSectionId } from "../src/runtime";

test("page progress stays within the document range", () => {
  assert.equal(calculatePageProgress(250, 1_500, 1_000), 0.5);
  assert.equal(calculatePageProgress(-100, 1_500, 1_000), 0);
  assert.equal(calculatePageProgress(900, 1_500, 1_000), 1);
  assert.equal(calculatePageProgress(100, 800, 1_000), 0);
});

test("gravity coordinates follow the threshold bounds", () => {
  assert.deepEqual(calculateGravityPoint(150, 100, { left: 50, top: 50, width: 200, height: 100 }), { x: 50, y: 50 });
  assert.deepEqual(calculateGravityPoint(150, 100, { left: 50, top: 50, width: 0, height: 100 }), { x: 56, y: 24 });
});

test("the most visible intersecting section wins", () => {
  const project = { id: "project" } as Element;
  const releases = { id: "releases" } as Element;
  const entries = [
    { intersectionRatio: 0.2, isIntersecting: true, target: project },
    { intersectionRatio: 0.6, isIntersecting: true, target: releases },
    { intersectionRatio: 0.9, isIntersecting: false, target: project },
  ];

  assert.equal(mostVisibleSectionId(entries), "releases");
  assert.equal(mostVisibleSectionId([]), undefined);
});
