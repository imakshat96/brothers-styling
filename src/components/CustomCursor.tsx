import { useEffect, useState } from "react";
import { motion, useAnimationControls, useMotionValue, useSpring } from "framer-motion";
import { Scissors } from "lucide-react";

type Spark = { id: number; x: number; y: number };

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 22, stiffness: 260, mass: 0.4 });
  const sy = useSpring(y, { damping: 22, stiffness: 260, mass: 0.4 });
  const controls = useAnimationControls();

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a, button, [role=button], input, textarea, select, label"));
    };
    const down = (e: MouseEvent) => {
      const base = hover ? -15 : -45;
      controls.start({
        rotate: [base, base + 30, base],
        scale: [hover ? 1.25 : 1, 0.8, hover ? 1.25 : 1],
        transition: { duration: 0.24, ease: "easeOut" },
      });
      const id = Date.now() + Math.random();
      setSparks((s) => [...s, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setSparks((s) => s.filter((sp) => sp.id !== id)), 400);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
    };
  }, [x, y, hover, controls]);

  if (!enabled) return null;
  return (
    <>
      <motion.div
        style={{ translateX: sx, translateY: sy }}
        className="pointer-events-none fixed left-0 top-0 z-[100]"
      >
        <motion.div
          animate={controls}
          initial={{ rotate: -45, scale: 1 }}
          className="-translate-x-1/2 -translate-y-1/2"
          style={{ filter: "drop-shadow(0 0 8px rgba(200,169,81,0.7))" }}
        >
          <motion.div
            animate={{ rotate: hover ? -15 : -45, scale: hover ? 1.25 : 1 }}
            transition={{ type: "spring", damping: 18, stiffness: 220 }}
          >
            <Scissors size={22} strokeWidth={1.75} color="#c8a951" />
          </motion.div>
        </motion.div>
      </motion.div>
      {sparks.map((s) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 1, scale: 0.4 }}
          animate={{ opacity: 0, scale: 1.8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="pointer-events-none fixed z-[99] rounded-full"
          style={{
            left: s.x - 8,
            top: s.y - 8,
            width: 16,
            height: 16,
            border: "1.5px solid #c8a951",
            boxShadow: "0 0 10px rgba(200,169,81,0.6)",
          }}
        />
      ))}
    </>
  );
}
