import { motion } from "framer-motion";

export default function VoiceVisualizer() {

  return (

    <motion.div

      animate={{
        width:[
          250,
          450,
          250
        ]
      }}

      transition={{
        duration:1.2,
        repeat:Infinity
      }}

      style={{

        height:"8px",

        borderRadius:"20px",

        background:"red",

        boxShadow:
        "0 0 20px red"
      }}
    />
  );
}