import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/img/logo.png";
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const HeaderAccueil = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
  });

  return (
    <motion.header
      className={`fixed w-full z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container mx-auto flex flex-row justify-between items-center px-4 sm:px-6 py-3">
        <div className="flex items-center gap-3 mb-2 sm:mb-0">
          <Link to="/">
            <motion.img 
              src={logo} 
              alt="logo" 
              className={`h-14 w-14 rounded-full border-2 ${
                isScrolled ? 'border-[#016CEC]' : 'border-white'
              } transition-all duration-300`}
              whileHover={{ scale: 1.05 }}
            />
          </Link>
        </div>
        
        <motion.div 
          className="flex gap-2 sm:gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to="/login-page"
            className={`text-sm sm:text-base font-medium transition-all duration-300 px-3 sm:px-4 py-2 rounded-lg ${
              isScrolled 
                ? 'text-gray-800 hover:text-[#016CEC] border border-[#016CEC]' 
                : 'text-white hover:text-rose-200 border border-white'
            }`}
          >
            Connexion
          </Link>
          <Link
            to="/register-page"
            className={`text-sm sm:text-base font-medium transition-all duration-300 px-3 sm:px-4 py-2 rounded-lg ${
              isScrolled 
                ? 'bg-[#016CEC] hover:bg-[#0156c4] text-white' 
                : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
            }`}
          >
            Inscription
          </Link>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default HeaderAccueil;