The current click animation uses `useAnimationControls` alongside a separate hover-driven `controls.start` effect — the two compete and the snip gets canceled or never visibly plays.

## Fix
Rewrite `src/components/CustomCursor.tsx` to drive the scissors with a single declarative `animate` prop based on state, no imperative controls:

- State: `hover: boolean`, `cutting: boolean`.
- `animate` prop computes target from state:
  - idle: `{ rotate: -45, scale: 1 }`
  - hover: `{ rotate: -15, scale: 1.25 }`
  - cutting (overrides): `{ rotate: [base, base+40, base], scale: [baseScale, 0.7, baseScale] }` with `duration: 0.28, ease: "easeOut"`.
- On `mousedown`: set `cutting=true`; after 280ms `setTimeout`, set `cutting=false`. Use a ref to track timeout so rapid clicks reset cleanly.
- Keep gold-spark ring at click coordinates (already working pattern).
- Verify the listener attaches in capture phase (`window.addEventListener("mousedown", down, true)`) so SmoothScroll/Lenis or any `e.stopPropagation()` doesn't swallow it.

No other files touched.
