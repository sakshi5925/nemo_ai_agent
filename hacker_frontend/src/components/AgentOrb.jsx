import { motion } from "framer-motion";


export default function AgentOrb() {

  return (

    <div className="orb-container">

      <motion.div
        className="outer-ring"
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="middle-ring"
        animate={{ rotate: -360 }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        className="core"
        animate={{
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      />

    </div>

  );
}