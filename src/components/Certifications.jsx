import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaGraduationCap, FaTools } from 'react-icons/fa';

const certifications = [
  'NPTEL – Manufacturing Process Technology I & II',
  'Diploma in Mechatronics – Alison',
  'Introduction to Aircraft Design – Alison',
  'NPTEL – Sustainable Power Generation Systems',
  'AutoCAD – GUVI',
  'CATIA Basics – Great Learning'
];

const workshops = [
  'Reverse Engineering Training',
  '3D Printing Hands-on Training',
  '3D Scanning Technology Workshop'
];

const Certifications = () => {
  return (
    <section id="certifications" className="section-container bg-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Certifications & Workshops</h2>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          
          {/* Certifications Block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-light p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
                <FaGraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-dark">Certifications</h3>
            </div>
            
            <ul className="space-y-4">
              {certifications.map((cert, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <FaCheckCircle className="w-6 h-6 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium leading-relaxed">{cert}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Workshops Block */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-light p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
                <FaTools className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-dark">Workshops Attended</h3>
            </div>
            
             <ul className="space-y-4">
              {workshops.map((workshop, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary-50 border-2 border-primary-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  </div>
                  <span className="text-slate-700 font-medium leading-relaxed">{workshop}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default Certifications;
