import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const clouds = Array.from({ length: 6 }).map((_, i) => `/assets/clouds/cloud${i + 1}.png`);
const letters = [
  '/assets/letters/M.png', '/assets/letters/A.png', '/assets/letters/R.png',
  '/assets/letters/K.png', '/assets/letters/E.png', '/assets/letters/T.png',
  '/assets/letters/P.png', '/assets/letters/E.png', '/assets/letters/A.png',
  '/assets/letters/C.png', '/assets/letters/E.png'
];

export default function Loader({ onComplete }) {
  // 0: Loading images (White screen, blue wheel)
  // 1: Images loaded, white screen fades out (Clouds cover screen)
  // 2: Clouds slide out
  const [loadingState, setLoadingState] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const imagesToLoad = [...clouds, ...letters];
    let loadedCount = 0;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === imagesToLoad.length) {
        // Minimum load time so user sees the white screen if it loads instantly
        setTimeout(() => {
          setLoadingState(1); // Fade out white screen
          
          setTimeout(() => {
            setLoadingState(2); // Slide clouds out
            
            setTimeout(() => {
              setVisible(false);
              onComplete();
            }, 1800); // Wait for clouds to slide out completely
          }, 1000); // How long the clouds stay still before sliding out
        }, 1000); 
      }
    };

    imagesToLoad.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded; // Proceed even if an image fails
    });

  }, [onComplete]);

  if (!visible) return null;

  return (
    <motion.div className="fixed inset-0 z-[9000] overflow-hidden pointer-events-none flex items-center justify-center">
      
      {/* State 1 -> 2: Massive Clouds covering the screen */}
      <div className="absolute inset-0 flex items-center justify-center w-full h-full">
        {/* Left Clouds */}
        <motion.img 
          src={clouds[0]} 
          alt=""
          className="absolute w-[150vw] sm:w-[100vw] h-[150vh] object-cover opacity-100 drop-shadow-2xl mix-blend-normal"
          initial={{ x: "-10vw", scale: 1.1 }}
          animate={{ x: loadingState >= 2 ? "-120vw" : "-10vw" }}
          transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.img 
          src={clouds[2]} 
          alt=""
          className="absolute w-[120vw] sm:w-[80vw] h-[120vh] object-cover opacity-100 drop-shadow-2xl left-[-20vw] mix-blend-normal"
          initial={{ x: 0, scale: 1.3 }}
          animate={{ x: loadingState >= 2 ? "-100vw" : 0 }}
          transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        />
        
        {/* Right Clouds */}
        <motion.img 
          src={clouds[1]} 
          alt=""
          className="absolute w-[150vw] sm:w-[100vw] h-[150vh] object-cover opacity-100 drop-shadow-2xl mix-blend-normal"
          initial={{ x: "10vw", scale: 1.1 }}
          animate={{ x: loadingState >= 2 ? "120vw" : "10vw" }}
          transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.img 
          src={clouds[3]} 
          alt=""
          className="absolute w-[120vw] sm:w-[80vw] h-[120vh] object-cover opacity-100 drop-shadow-2xl right-[-20vw] mix-blend-normal"
          initial={{ x: 0, scale: 1.3 }}
          animate={{ x: loadingState >= 2 ? "100vw" : 0 }}
          transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        />
      </div>

      {/* State 0: White Screen with Blue Loading Wheel */}
      <AnimatePresence>
        {loadingState === 0 && (
          <motion.div 
            className="absolute inset-0 bg-white flex flex-col items-center justify-center z-50 pointer-events-auto"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="w-16 h-16 relative flex items-center justify-center mb-8">
              <div className="absolute inset-0 border-t-4 border-[#0690d4] rounded-full animate-[spin_1s_linear_infinite]"></div>
              <div className="absolute inset-2 border-r-4 border-[#0690d4] rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
            </div>
            <h2 className="text-xl tracking-[0.4em] font-bold text-[#061530] uppercase">Loading Experience</h2>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
