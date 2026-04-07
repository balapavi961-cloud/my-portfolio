import React from 'react';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaWrench, FaTools, FaDraftingCompass, FaCube, FaPrint, FaCogs } from 'react-icons/fa';

const skillCategories = [
  {
    title: 'CAD Software',
    icon: <FaLaptopCode className="w-8 h-8 text-primary-600 mb-4" />,
    skills: [
      { name: 'SolidWorks', icon: <span className="font-bold text-red-600 text-sm">SW</span> },
      { name: 'CATIA V5', level: 'Beginner', icon: <span className="font-bold text-blue-600 text-sm">CATIA</span> },
      { name: 'AutoCAD', icon: <FaDraftingCompass className="w-5 h-5 text-teal-600" /> },
      { name: 'Creo', level: 'Beginner', icon: <span className="font-bold text-green-600 text-sm">Creo</span> },
    ],
  },
  {
    title: 'Design Capabilities',
    icon: <FaCube className="w-8 h-8 text-primary-600 mb-4" />,
    skills: [
      { name: '3D Modeling' },
      { name: 'Engineering Drawings' },
      { name: 'Product Design' },
      { name: 'Assembly Design' },
      { name: 'Design for Manufacturing (DFM)' },
      { name: 'Injection Molding Design' },
    ],
  },
  {
    title: 'Manufacturing Technologies',
    icon: <FaPrint className="w-8 h-8 text-primary-600 mb-4" />,
    skills: [
      { name: '3D Printing' },
      { name: '3D Scanning' },
      { name: 'Prototyping' },
      { name: 'Product Validation' },
    ],
  },
  {
    title: 'Engineering Skills',
    icon: <FaCogs className="w-8 h-8 text-primary-600 mb-4" />,
    skills: [
      { name: 'Mechanical Design' },
      { name: 'Chassis Design' },
      { name: 'Drivetrain Design' },
      { name: 'Autonomous Systems Integration' },
    ],
  },
  {
    title: 'Core Strengths',
    icon: <FaWrench className="w-8 h-8 text-primary-600 mb-4" />,
    skills: [
      { name: 'Creative Problem Solving' },
      { name: 'Quick Decision Making' },
      { name: 'Design Modeling and Assembly' },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="section-container bg-light/50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Technical Skills</h2>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-16">
          A comprehensive overview of my technical capabilities, software proficiency, and engineering core competencies developed through academic and practical experience.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-slate-100 group"
            >
              <div className="flex flex-col items-center text-center">
                 {/* Icon Wrapper */}
                <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                  {React.cloneElement(category.icon, { 
                    className: "w-8 h-8 text-primary-600 group-hover:text-white transition-colors duration-300"
                  })}
                </div>
                
                <h3 className="text-xl font-bold text-dark mb-6">{category.title}</h3>
                
                <ul className="w-full space-y-3">
                  {category.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex justify-between items-center text-slate-700 bg-slate-50 px-4 py-2.5 rounded-lg border border-slate-100">
                      <div className="flex items-center gap-3">
                        {skill.icon && <span className="flex-shrink-0">{skill.icon}</span>}
                        {/* Fallback icon for visual consistency if no specific icon */}
                        {!skill.icon && <FaTools className="w-4 h-4 text-slate-400" />}
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      {skill.level && (
                        <span className="text-xs font-semibold bg-primary-100 text-primary-700 px-2.5 py-1 rounded-full whitespace-nowrap">
                          {skill.level}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
