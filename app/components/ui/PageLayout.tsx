"use client";

import { motion } from "framer-motion";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <main className={`w-full flex flex-col py-4 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[448px] space-y-3"
      >
        {children}
      </motion.div>
    </main>
  );
}
