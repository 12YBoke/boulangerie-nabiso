'use client'

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { Typography } from "../typography/typography";

interface Props {
  from?: number;
  to: number;
  className?: string
  variant?: 
    'display'     |
    'title-lg'    | 
    'title-base'  | 
    'title-sm'    | 
    'title-xs'    | 
    'body-lg'     | 
    'body-base'   | 
    'body-sm'     
  duration?: number
  delay?: number
  remove_plus?: boolean
  prefix?: string
}

export const CountUpAnimation = ({prefix ,remove_plus = false, from = 0, to, duration = 2, delay = 0, className, variant = 'body-base' }: Props) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => {
    return Math.round(latest);
  });
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      animate(count, to, { duration: duration, delay: delay });
    }
  }, [count, inView, to, duration, delay]);

  return (
    <Typography variant={variant} className={className}>
      {!remove_plus && '+'}<motion.span ref={ref}>{rounded}</motion.span>{prefix && prefix}
    </Typography>
  );
};

