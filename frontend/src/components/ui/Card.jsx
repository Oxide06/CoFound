import { motion } from "framer-motion";

export default function Card({ children, className = "", hover = true }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      className={`glass-panel rounded-2xl p-6 transition ${className}`}
    >
      {children}
    </motion.div>
  );
}
