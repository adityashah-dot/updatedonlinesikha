import { useEffect } from "react";
import { motion } from "framer-motion";
// Short fade-in only. There is no exit animation, so navigation never waits for the old page.
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.15, ease: "easeOut" } },
};
export const PageTransition = ({ children, className = "" }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  return <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    className={`w-full flex-grow flex flex-col ${className}`}
  >
      {children}
    </motion.div>;
};
