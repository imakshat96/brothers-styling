Add a cut/snip animation to the scissors cursor that triggers on every mouse click.

## Changes
Edit only `src/components/CustomCursor.tsx`:

1. Add a `cutting` state (boolean) and a `useAnimationControls()` instance from framer-motion for the scissors wrapper.
2. Add a `mousedown` window listener that triggers a quick keyframe animation: rotate goes `[-45, -25, -45]` (or current rotation ±20°) and scale goes `[1, 0.85, 1]` over ~220ms with easeOut — simulating blades snapping shut then opening.
3. Keep existing hover scale/rotate behavior; the click animation overrides briefly via `controls.start(...)` then returns to the hover/idle state.
4. Optional polish: emit a tiny gold spark — a 6px ring that fades+scales out (`opacity 1→0`, `scale 0.5→1.6`, 300ms) at the click point, rendered as a sibling motion.div positioned at the cursor coords. Adds tactile feedback without changing layout.

No other files touched. No new dependencies.
