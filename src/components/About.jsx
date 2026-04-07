import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';

const About = () => {
  return (
    <section id="about" className="section-container bg-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">About Me</h2>
        
        <div className="max-w-4xl mx-auto">
          {/* Professional Description */}
          <div className="bg-light p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100 mb-12">
            <p className="text-slate-700 text-lg leading-relaxed text-justify md:text-left font-medium">
              Industrial and Product Design engineer with strong experience in CAD modeling, product development, and manufacturing technologies. Experienced in SolidWorks product design, injection molding design, and prototyping. Passionate about creating innovative engineering solutions and improving product functionality through design optimization.
            </p>
          </div>

          {/* Education & Overview Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Education Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <FaGraduationCap className="w-32 h-32 text-primary-600" />
              </div>
              
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                  <FaGraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-dark">Education</h3>
              </div>
              
              <div className="relative z-10 border-l-2 border-primary-200 pl-6 ml-6 space-y-6">
                <div className="relative">
                  <div className="absolute -left-[35px] mt-1.5 w-4 h-4 rounded-full bg-primary-500 border-4 border-white"></div>
                  <h4 className="text-lg font-semibold text-slate-800">Bachelor of Engineering</h4>
                  <p className="text-primary-600 font-medium mb-1">Mechanical Engineering</p>
                  <p className="text-slate-600">Sri Shanmugha College of Engineering and Technology</p>
                  <div className="flex justify-between items-center mt-3 text-sm">
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium">Expected: 2026</span>
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">CGPA: 7.6</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats or Core Focus Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <FaBriefcase className="w-32 h-32 text-primary-600" />
              </div>

               <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                  <FaBriefcase className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-dark">Core Focus</h3>
              </div>

              <div className="relative z-10 space-y-4">
                 {[
                   { label: 'CAD Modeling', desc: 'SolidWorks, CATIA, AutoCAD' },
                   { label: 'Product Development', desc: 'Concept to Production lifecycle' },
                   { label: 'Manufacturing', desc: 'DFM, Injection Molding, 3D Printing' },
                 ].map((item, index) => (
                    <div key={index} className="flex flex-col">
                      <span className="text-slate-800 font-semibold">{item.label}</span>
                      <span className="text-slate-500 text-sm">{item.desc}</span>
                      {index !== 2 && <div className="h-px bg-slate-100 my-3 w-full"></div>}
                    </div>
                 ))}
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
