import { motion, useAnimation } from 'framer-motion';
import useBreakpoint from 'hooks/useBreakpoint';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export const easing = [0.6, -0.05, 0.01, 0.99];

export const animationContainer = {
  visible: {
    transition: {
      staggerChildren: 0.4,
      easing,
    },
  },
};

export const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const fadeInRight = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
    },
  },
};

export const fadeInLeft = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
    },
  },
};

const FadeMotion = ({ children }: { children: ReactNode }) => {
  const controls = useAnimation();
  const isBreakpoint = useBreakpoint({});
  const [ref, inView] = useInView({
    threshold: [isBreakpoint ? 0.025 : 0.25],
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animationContainer}
    >
      {children}
    </motion.div>
  );
};

export default FadeMotion;
