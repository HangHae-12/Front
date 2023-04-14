import React from "react";
import { motion } from "framer-motion";

const fadeInDown = (delay) => ({
  hidden: { opacity: 0, y: -10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: delay,
    },
  },
});

const AnimatedTableRow = ({ children, delay, ...props }) => {
  return (
    <motion.tr
      initial="hidden"
      animate="show"
      variants={fadeInDown(delay)}
      {...props}
    >
      {children}
    </motion.tr>
  );
};

export default AnimatedTableRow;
