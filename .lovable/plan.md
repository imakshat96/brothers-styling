Replace the dot crosshair in `src/components/CustomCursor.tsx` with a gold scissors icon (Lucide `Scissors`).

- Keep the existing follow-the-mouse motion logic and outer ring.
- Replace the inner solid dot with a `<Scissors />` SVG sized ~18px in gold (`#c8a951`), slightly rotated (-45°) so the blades point along the cursor direction.
- Add a subtle scale/rotate tween on hover over interactive elements (reuse current hover state if present).
- Hide native cursor as today; ensure scissors stays centered on the pointer via `translate(-50%, -50%)`.

No other components touched.