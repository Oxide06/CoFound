import { motion } from "framer-motion";

export default function Card({ children, className = "", hover = true }) {
  return (
    <motion.div
      whileHover={hover ? { y: -2 } : undefined}
      className={`glass-panel rounded-xl p-5 border border-border bg-surface shadow-sm transition ${className}`}
    >
      {children}
    </motion.div>
  );
}
