import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaBuilding } from 'react-icons/fa';

const experienceData = [
  {
    role: 'Product Design Intern',
    company: 'Tamirabot Advanced Engineering Pvt Ltd',
    duration: 'March 2025 – May 2025',
    description: [
      'Worked on complete product design lifecycle from concept development to manufacturing delivery.',
      'Created detailed 3D models using SolidWorks.',
      'Designed products optimized for injection molding and cost efficiency.',
      'Managed prototyping and validation processes.'
    ],
    icon: <FaBriefcase className="w-6 h-6" />
  },
  {
    role: 'In Plant Training',
    company: 'TVS Mobility, Sankari',
    duration: 'July 2024',
    description: [
      'Exposure to automotive manufacturing processes and assembly workflows.',
      'Learned quality control procedures and production operations.'
    ],
    icon: <FaBuilding className="w-6 h-6" />
  },
  {
    role: 'Industrial Training',
    company: 'Salem Steel Plant',
    duration: '2023',
    description: [
      'Studied industrial manufacturing processes and steel production workflows.'
    ],
    icon: <FaBuilding className="w-6 h-6" />
  }
];

const Experience = () => {
  return (
    <section id="experience" className="section-container bg-light/50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Professional Experience</h2>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 transform md:-translate-x-1/2"></div>
          
          <div className="space-y-12">
            {experienceData.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative flex items-start md:items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
              >
                {/* Timeline Node */}
                <div className="absolute left-8 md:left-1/2 w-12 h-12 bg-white rounded-full border-4 border-primary-100 flex items-center justify-center transform -translate-x-1/2 mt-0 md:mt-0 z-10 shadow-sm text-primary-600">
                  {exp.icon}
                </div>
                
                {/* Content Card */}
                <div className={`w-full md:w-1/2 pl-24 pr-4 md:px-12 ${idx % 2 === 0 ? 'md:pr-12 md:pl-0text-left md:text-right' : 'md:pr-0 md:pl-12 text-left'}`}>
                  <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-sm font-semibold rounded-full mb-4">
                      {exp.duration}
                    </span>
                    <h3 className="text-xl font-bold text-dark mb-2">{exp.role}</h3>
                    <h4 className="text-slate-600 font-medium text-lg mb-4">{exp.company}</h4>
                    
                    <ul className={`space-y-2 text-slate-600 text-sm leading-relaxed ${idx % 2 === 0 ? 'md:items-end' : 'md:items-start'} flex flex-col`}>
                      {exp.description.map((item, iIdx) => (
                        <li key={iIdx} className="flex gap-2">
                           {/* Only show bullet dot on mobile or left aligned cards */}
                          <span className={`${idx % 2 === 0 ? 'hidden md:hidden' : ''}`}>•</span>
                          <span className={`${idx % 2 === 0 ? 'md:text-right' : ''} text-left`}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
