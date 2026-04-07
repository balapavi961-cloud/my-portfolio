import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaCheckCircle, FaLaptopCode, FaWrench, FaTools, FaDraftingCompass, FaCube, FaPrint, FaCogs, FaTimes, FaRegLightbulb, FaAward, FaArrowLeft } from 'react-icons/fa';
import { projectsData } from '../data/projectsData';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  const details = project.fullDetails || {};

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-dark/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] overflow-hidden shadow-2xl relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-dark hover:bg-primary-600 hover:text-white transition-all shadow-lg"
        >
          <FaTimes size={20} />
        </button>

        <div className="overflow-y-auto flex-1">
          {/* Modal Header/Hero */}
          <div className="bg-slate-50 p-8 md:p-12 border-b border-slate-100">
            <span className="text-primary-600 font-bold tracking-widest uppercase text-xs mb-4 block">{project.subtitle}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-6 leading-tight">{project.title}</h2>
            
            {details.patent && (
              <div className="inline-flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-sm border border-primary-100 text-sm font-bold text-slate-700">
                <FaAward className="text-primary-600" /> {details.patent}
              </div>
            )}
          </div>

          {/* Modal Content */}
          <div className="p-8 md:p-12">
            <div className="grid lg:grid-cols-5 gap-12 mb-16">
              <div className="lg:col-span-3">
                <div className="rounded-3xl overflow-hidden shadow-md border border-slate-100">
                  <img src={project.image} alt={project.title} className="w-full h-auto" />
                </div>
              </div>
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-dark">
                    <FaRegLightbulb className="text-primary-600" /> Overview
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {details.overview || project.description}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-dark">
                    <FaTools className="text-primary-600" /> Tools
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(details.tools || []).map((tool, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {details.concept && (
              <div className="mb-16">
                <h3 className="text-2xl font-bold mb-6 text-dark">Design Concept</h3>
                <p className="text-slate-700 leading-relaxed">{details.concept}</p>
              </div>
            )}

            {details.keyFeatures && (
              <div className="mb-16">
                <h3 className="text-2xl font-bold mb-8 text-dark">Key Features</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {details.keyFeatures.map((f, i) => (
                    <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <h4 className="font-bold text-dark mb-2">{f.title}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {details.engineeringContributions && (
              <div className="bg-primary-900 text-white p-10 rounded-[2.5rem] mb-16">
                <h3 className="text-2xl font-bold mb-6">Engineering Contributions</h3>
                <ul className="space-y-4">
                  {details.engineeringContributions.map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <FaCheckCircle className="text-primary-400 mt-1 flex-shrink-0" />
                      <span className="text-primary-50 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {details.technicalSkills && (
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-dark flex items-center gap-3">
                    <FaLaptopCode className="text-primary-600" /> Technical Skills
                  </h3>
                  <ul className="space-y-3">
                    {details.technicalSkills.map((skill, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500"></div>
                        <span className="text-sm font-medium">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {details.keyLearnings && (
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-dark flex items-center gap-3">
                    <FaRegLightbulb className="text-primary-600" /> Key Learnings
                  </h3>
                  <ul className="space-y-3">
                    {details.keyLearnings.map((learning, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500"></div>
                        <span className="text-sm font-medium">{learning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {details.defectsAnalyzed && (
              <div className="mb-16">
                <h3 className="text-2xl font-bold mb-8 text-dark flex items-center gap-3">
                  <FaCogs className="text-primary-600" /> Defects Analyzed & Solutions
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {details.defectsAnalyzed.map((item, i) => (
                    <div key={i} className="bg-red-50/50 p-6 rounded-2xl border border-red-100">
                      <h4 className="font-bold text-red-900 mb-2">{item.defect}</h4>
                      <p className="text-sm text-slate-700 leading-relaxed font-medium">
                        <span className="text-primary-700 font-bold uppercase text-[10px] tracking-wider mr-2">Solution:</span>
                        {item.solution}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {details.outcome && (
              <div className="mb-16 bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
                <h3 className="text-2xl font-bold mb-6 text-dark flex items-center gap-3">
                  <FaAward className="text-primary-600" /> Outcome
                </h3>
                <p className="text-slate-700 leading-relaxed font-medium italic">
                  "{details.outcome}"
                </p>
              </div>
            )}

            {details.gallery && details.gallery.length > 1 && (
              <div>
                <h3 className="text-2xl font-bold mb-8 text-dark">Visual Showcase</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {details.gallery.slice(1).map((img, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                      <img src={img} alt="Gallery" className="w-full h-auto" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Modal Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
           <button onClick={onClose} className="text-primary-600 font-bold hover:underline">Close Project Details</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full -tranglate-y-1/2 translate-x-1/2 blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-50 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-50"></div>

      <div className="section-container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <span className="text-primary-600 font-bold tracking-widest uppercase text-sm mb-2 block">My Work</span>
            <h2 className="section-title mb-0">Featured Projects</h2>
          </div>
          <p className="text-slate-500 max-w-md md:text-right font-medium">
            A selection of my technical projects ranging from mechanical design to autonomous systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div 
                onClick={() => setSelectedProject(project)}
                className="group block h-full bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              >
                {/* Project Image Placeholder */}
                <div className="relative h-64 bg-slate-50 overflow-hidden">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary-900 group-hover:scale-110 transition-transform duration-700">
                      <span className="text-6xl font-black text-white/20 select-none">
                        {project.imagePlaceholder}
                      </span>
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-primary-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white text-primary-900 px-6 py-2.5 rounded-full font-bold text-sm tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      VIEW DETAILS
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-primary-600 uppercase tracking-widest bg-primary-50 px-3 py-1 rounded-full">
                      {project.subtitle}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-4 group-hover:text-primary-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 mb-6 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-primary-600 font-bold text-sm">
                    Read More <FaExternalLinkAlt className="text-xs" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Detail View */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
