import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
interface FadeProviderProps {}

const fadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.75, transition: { duration: 1 } },
  visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  exit: { opacity: 0, scale: 0.75, transition: { duration: 1 } },
};

const FadeProvider: React.FC<FadeProviderProps> = ({ children }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
    if (!inView) {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      variants={fadeIn}
      initial="hidden"
      animate={controls}
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export default FadeProvider;
