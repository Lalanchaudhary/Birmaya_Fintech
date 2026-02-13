"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let mouse = { x: 0, y: 0 };
    let pos = { x: 0, y: 0 };

    const moveMouse = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", moveMouse);

    const animate = () => {
      // smooth follow
      pos.x += (mouse.x - pos.x) * 0.15;
      pos.y += (mouse.y - pos.y) * 0.15;

      if (ringRef.current && dotRef.current) {
        ringRef.current.style.left = pos.x + "px";
        ringRef.current.style.top = pos.y + "px";

        dotRef.current.style.left = mouse.x + "px";
        dotRef.current.style.top = mouse.y + "px";
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("mousemove", moveMouse);
  }, []);

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="fixed w-7 h-7 border-2 border-primary rounded-full pointer-events-none z-[9999]"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed w-3 h-3 bg-accent rounded-full pointer-events-none z-[9999]"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  );
}
