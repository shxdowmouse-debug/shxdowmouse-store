import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  duration: number;
}

export function ShootingStars() {
  const [stars, setStars] = useState<Star[]>([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    // Create a shooting star every 5-10 minutes
    const createStar = () => {
      const id = nextId;
      setNextId(prev => prev + 1);

      // Random position in the sky
      const x = Math.random() * 100;
      const y = Math.random() * 60; // Top 60% of screen

      const duration = 2 + Math.random() * 1; // 2-3 seconds

      setStars(prev => [...prev, { id, x, y, duration }]);

      // Remove star after animation completes
      setTimeout(() => {
        setStars(prev => prev.filter(star => star.id !== id));
      }, (duration + 0.5) * 1000);
    };

    // Random interval between 5-10 minutes
    const randomInterval = () => {
      const minInterval = 5 * 60 * 1000; // 5 minutes
      const maxInterval = 10 * 60 * 1000; // 10 minutes
      return Math.random() * (maxInterval - minInterval) + minInterval;
    };

    const interval = setInterval(createStar, randomInterval());

    return () => clearInterval(interval);
  }, [nextId]);

  return (
    <>
      {stars.map(star => (
        <motion.div
          key={star.id}
          initial={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: 0,
          }}
          animate={{
            left: `${star.x + 20}%`,
            top: `${star.y - 20}%`,
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: star.duration,
            ease: "linear",
          }}
          className="fixed pointer-events-none"
          style={{
            width: "2px",
            height: "2px",
            boxShadow: "0 0 20px 2px rgba(255, 255, 255, 0.8), 0 0 40px 4px rgba(255, 255, 255, 0.4)",
            filter: "blur(0.5px)",
            zIndex: 1,
          }}
        />
      ))}
    </>
  );
}
