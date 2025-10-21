import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import "./ThreeDImageRing.css"; // 👈 el CSS lo creamos abajo

export default function ThreeDImageRing({
  images,
  width = 300,
  perspective = 2000,
  imageDistance = 500,
  initialRotation = 180,
  animationDuration = 1.5,
  staggerDelay = 0.1,
  hoverOpacity = 0.5,
  backgroundColor = "black",
  draggable = true,
}) {
  const ringRef = useRef(null);
  const rotationY = useMotionValue(initialRotation);
  const startX = useRef(0);
  const currentRotationY = useRef(initialRotation);
  const isDragging = useRef(false);
  const velocity = useRef(0);
  const [showImages, setShowImages] = useState(false);

  const angle = useMemo(() => 360 / images.length, [images.length]);

  useEffect(() => {
    const unsub = rotationY.on("change", (latest) => {
      currentRotationY.current = latest;
    });
    setShowImages(true);
    return () => unsub();
  }, [rotationY]);

  const handleDragStart = (e) => {
    if (!draggable) return;
    isDragging.current = true;
    startX.current = e.clientX || e.touches?.[0]?.clientX || 0;
    rotationY.stop();
    velocity.current = 0;
    ringRef.current.style.cursor = "grabbing";
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchmove", handleDrag);
    document.addEventListener("touchend", handleDragEnd);
  };

  const handleDrag = (e) => {
    if (!isDragging.current) return;
    const x = e.clientX || e.touches?.[0]?.clientX || 0;
    const delta = x - startX.current;
    velocity.current = -delta * 0.5;
    rotationY.set(currentRotationY.current + velocity.current);
    startX.current = x;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    ringRef.current.style.cursor = "grab";
    currentRotationY.current = rotationY.get();

    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", handleDragEnd);
    document.removeEventListener("touchmove", handleDrag);
    document.removeEventListener("touchend", handleDragEnd);

    const initial = rotationY.get();
    const target = initial + velocity.current * 10;
    animate(initial, target, {
      type: "inertia",
      power: 0.8,
      timeConstant: 300,
      onUpdate: (val) => rotationY.set(val),
    });
  };

  const imageVariants = {
    hidden: { y: 200, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div
      className="ring-container"
      style={{ backgroundColor }}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
    >
      <div
        className="ring-wrapper"
        style={{
          perspective: `${perspective}px`,
          width: `${width}px`,
          height: `${width * 1.33}px`,
        }}
      >
        <motion.div
          ref={ringRef}
          className="ring"
          style={{
            transformStyle: "preserve-3d",
            rotateY: rotationY,
            cursor: "grab",
          }}
        >
          <AnimatePresence>
            {showImages &&
              images.map((url, i) => (
                <motion.div
                  key={i}
                  className="ring-image"
                  style={{
                    backgroundImage: `url(${url})`,
                    rotateY: i * -(360 / images.length),
                    transformOrigin: `50% 50% ${imageDistance}px`,
                    z: -imageDistance,
                  }}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={imageVariants}
                  transition={{
                    delay: i * staggerDelay,
                    duration: animationDuration,
                  }}
                  whileHover={{ opacity: 1 }}
                  onHoverStart={() => {
                    if (isDragging.current) return;
                    Array.from(ringRef.current.children).forEach((img, j) => {
                      if (j !== i) img.style.opacity = hoverOpacity;
                    });
                  }}
                  onHoverEnd={() => {
                    if (isDragging.current) return;
                    Array.from(ringRef.current.children).forEach(
                      (img) => (img.style.opacity = 1)
                    );
                  }}
                />
              ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
