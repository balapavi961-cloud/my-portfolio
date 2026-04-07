import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-10">
      <div className="section-container flex flex-col md:flex-row items-center justify-between gap-12 w-full">
        
        {/* Profile Image (Left Side) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex justify-center md:justify-start w-full max-w-md relative mb-12 md:mb-0 mx-auto md:mx-0"
        >
          <div className="relative w-64 h-80 xl:w-80 xl:h-[28rem]">
            {/* Background Accent shape */}
            <div className="absolute inset-0 bg-primary-100/50 rounded-full blur-3xl transform translate-x-4 -translate-y-4 opacity-70"></div>
            
            {/* Image Container (Oval Shape) */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-white shadow-2xl bg-slate-50 transition-all duration-500 hover:scale-[1.02]">
               <img 
                 src="/murali_profile_v2.jpg" 
                 alt="Muralikrishnan Srinivasan" 
                 className="w-full h-full object-cover object-top scale-110"
                 onError={(e) => {
                   e.target.onerror = null; 
                   e.target.src = "https://ui-avatars.com/api/?name=Muralikrishnan+Srinivasan&size=512&background=0d9488&color=fff";
                 }}
               />
               <div className="absolute inset-0 border-2 border-primary-500/10 rounded-full pointer-events-none"></div>
            </div>
          </div>
        </motion.div>

        {/* Text Content (Right Side) */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 text-center md:text-left"
        >
          <span className="text-primary-600 font-semibold tracking-wider uppercase text-sm mb-4 block">Portfolio</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-dark mb-6 leading-tight">
            Muralikrishnan <br className="hidden md:block" />
            <span className="text-slate-500">Srinivasan</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-slate-700 mb-6">
            Industrial & Product Design Engineer
          </h2>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto md:mx-0 mb-10 leading-relaxed">
            Creative and detail-oriented Industrial and Product Design Engineer passionate about product development, CAD modeling, and manufacturing design. Skilled in developing innovative solutions from concept to production using modern engineering tools.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-8">
            <Link to="projects" smooth={true} duration={500} className="w-full sm:w-auto">
              <button className="btn-primary w-full sm:w-auto">
                View Projects
              </button>
            </Link>
            <a href="/murali_resume.pdf" download="Muralikrishnan_Resume.pdf" className="w-full sm:w-auto">
               <button className="btn-secondary w-full sm:w-auto flex items-center gap-2">
                <FaDownload className="text-xl" /> Download Resume
              </button>
            </a>
            <Link to="contact" smooth={true} duration={500} className="w-full sm:w-auto">
               <button className="btn-secondary w-full sm:w-auto flex items-center gap-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400">
                <FaEnvelope className="text-xl" /> Contact Me
              </button>
            </Link>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500 font-medium">
            <FaMapMarkerAlt className="text-primary-600 text-xl" />
            <span>Salem, Tamil Nadu, India</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
