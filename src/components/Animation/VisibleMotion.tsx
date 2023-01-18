import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const VisibleMotion = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export default VisibleMotion;
