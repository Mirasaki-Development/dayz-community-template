'use client';

import { cn } from '@/lib/utils';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import React, { MouseEvent } from 'react';

export default function SpotlightBackgroundContent({
  color = 'rgba(14, 165, 233, 0.1)',
  children,
  className,
  wrapperClassName,
}: {
  color?: string;
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        'group relative',
        wrapperClassName
      )}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className={cn(
          'pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100',
          className
        )}
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${color},
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </div>
  );
}
