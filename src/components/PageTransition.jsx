import { useEffect } from "react";
import { motion } from "framer-motion";
const pageVariants = {
  initial: {
    opacity: 0,
    y: 8
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: {
      duration: 0.18,
      ease: "easeIn"
    }
  }
};
export const PageTransition = ({ children, className = "" }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  return <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className={`w-full flex-grow flex flex-col ${className}`}
  >
      {children}
    </motion.div>;
};
