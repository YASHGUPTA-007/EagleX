// "use client";

// import React from "react";
// import { motion } from "framer-motion";

// const HeroTypewriter = () => {
//   const text = "WE ENGINEER DOMINANCE";
  
//   // Split text into array of characters for individual animation
//   const letters = text.split("");

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.15, // 0.15s delay between each letter (Slow Typewriter)
//         delayChildren: 0.5,    // Initial delay before starting
//       },
//     },
//   };

//   const childVariants = {
//     hidden: { 
//       opacity: 0, 
//       display: "none" // Hides the layout space until revealed for a smoother cursor flow
//     },
//     visible: {
//       opacity: 1,
//       display: "inline-block",
//       transition: {
//         type: "spring",
//         damping: 12,
//         stiffness: 100,
//       },
//     },
//   };

//   const cursorVariants = {
//     blinking: {
//       opacity: [0, 1, 0],
//       transition: {
//         duration: 0.8,
//         repeat: Infinity,
//         ease: "linear",
//       },
//     },
//   };

//   return (
//     <div className="relative h-screen w-full bg-black flex items-center justify-center overflow-hidden">
//       {/* Optional: Subtle Grid Background for 'Engineering' vibe */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

//       <div className="z-10 flex flex-col items-center">
//         <motion.h1
//           className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter text-white font-mono uppercase"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           {letters.map((letter, index) => (
//             <motion.span key={index} variants={childVariants}>
//               {letter === " " ? "\u00A0" : letter}
//             </motion.span>
//           ))}
          
//           {/* The Blinking Cursor */}
//           <motion.span
//             variants={cursorVariants}
//             animate="blinking"
//             className="inline-block w-2 h-8 md:w-4 md:h-16 lg:w-6 lg:h-20 bg-green-500 ml-1 align-middle mb-2 md:mb-4"
//           />
//         </motion.h1>

//         {/* Subtext appearing after title */}
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 4.5, duration: 1 }} // Delays until typing finishes
//           className="mt-8 text-gray-400 text-sm md:text-lg tracking-[0.2em] font-light"
//         >
//           BOTMARTZ IT SOLUTIONS
//         </motion.p>
//       </div>
//     </div>
//   );
// };

// export default HeroTypewriter;