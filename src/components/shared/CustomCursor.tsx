"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const springX = useSpring(x, { stiffness: 350, damping: 28 });
  const springY = useSpring(y, { stiffness: 350, damping: 28 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const over = (e: MouseEvent) => {
      const el = (e.target as Element).closest("a, button, [role='button'], label, input, textarea, select");
      setHovering(!!el);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y, visible]);

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full border border-pile-dark/50 pointer-events-none z-[9999] mix-blend-multiply hidden md:block"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: hovering ? 44 : 14,
        height: hovering ? 44 : 14,
        opacity: visible ? (hovering ? 0.55 : 0.35) : 0,
        backgroundColor: hovering ? "rgba(95,59,97,0.06)" : "transparent",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    />
  );
}
