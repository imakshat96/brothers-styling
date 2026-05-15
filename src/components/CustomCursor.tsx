import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Scissors } from "lucide-react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 22, stiffness: 260, mass: 0.4 });
  const sy = useSpring(y, { damping: 22, stiffness: 260, mass: 0.4 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a, button, [role=button], input, textarea, select, label"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      style={{ translateX: sx, translateY: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[100]"
    >
      <motion.div
        animate={{ rotate: hover ? -15 : -45, scale: hover ? 1.25 : 1 }}
        transition={{ type: "spring", damping: 18, stiffness: 220 }}
        className="-translate-x-1/2 -translate-y-1/2"
        style={{ filter: "drop-shadow(0 0 8px rgba(200,169,81,0.7))" }}
      >
        <Scissors size={22} strokeWidth={1.75} color="#c8a951" />
      </motion.div>
    </motion.div>
  );
}
