"use client";

import { motion } from "framer-motion";

/**
 * Page transition wrapper — template.tsx re-mounts on every route change,
 * making it perfect for entrance animations. Each page fades up on enter.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}
