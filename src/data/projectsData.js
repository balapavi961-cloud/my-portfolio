import { FaExternalLinkAlt, FaCheckCircle, FaLaptopCode, FaWrench, FaTools, FaDraftingCompass, FaCube, FaPrint, FaCogs } from 'react-icons/fa';

export const projectsData = [
  {
    id: 'electric-trolley',
    title: 'Multipurpose Tiltable Electric Trolley',
    subtitle: 'Design Patent No: 300578-001',
    description: 'Designed a multipurpose tiltable trolley for versatile material handling. Created full 3D CAD models and engineering drawings. Engineered an ergonomic tilt mechanism and built a working prototype.',
    imagePlaceholder: 'MT',
    image: '/trolley.png',
    fullDetails: {
      overview: 'Designed and developed a Multipurpose Tiltable Electric Trolley — a patented utility vehicle that combines electric mobility with a tiltable hopper mechanism and a detachable flat-bed platform, enabling versatile material handling across industrial, agricultural, and construction environments.',
      patent: 'Design Patent No: 300578-001 | Status: Granted',
      concept: 'The core objective was to eliminate the physical strain of conventional wheelbarrows and manual trolleys by integrating an electric drive system with a mechanically tiltable load bucket. The design addresses the need for a single adaptable tool that can transport, tip, and offload materials — while also serving as a flat-bed carrier when the hopper is not required.',
      keyFeatures: [
        {
          title: 'Tiltable Hopper (Olive/Sheet Metal Body)',
          desc: 'Trapezoidal bucket geometry designed for optimized load distribution and controlled forward tipping, reducing spillage during discharge'
        },
        {
          title: 'Electric Drive Unit (Green Enclosure)',
          desc: 'Houses the motor, controller, and battery pack with ventilation slots for thermal management'
        },
        {
          title: 'Hybrid Wheel Configuration',
          desc: 'A single large pneumatic front wheel provides shock absorption over rough terrain, while rear swivel casters with polyurethane wheels enable 360° maneuverability in tight spaces'
        },
        {
          title: 'Detachable Flat-Bed Platform (Blue)',
          desc: 'A bolt-on auxiliary tray that transforms the trolley into a flatbed carrier, expanding its use case without requiring a separate vehicle'
        },
        {
          title: 'Ergonomic Dual Handles',
          desc: 'Curved tubular handles designed for comfortable operator grip and directional steering'
        }
      ],
      engineeringContributions: [
        'Modeled the complete assembly in SolidWorks — including sheet metal hopper, structural chassis, and wheel sub-assemblies',
        'Applied sheet metal design principles (bends, flanges, clearance tolerances) for the hopper and body panels',
        'Designed the tilt mechanism to achieve a controlled dump angle while maintaining structural integrity under load',
        'Leveraged injection molding and fabrication knowledge (from Tamirabot internship) to ensure design-for-manufacturing compliance',
        'Conducted spatial and load path analysis to balance the center of gravity across tilt and flat-bed modes'
      ],
      tools: ['SolidWorks', 'Sheet Metal Design', 'Assembly Modeling', 'Design for Manufacturing (DFM)', 'Patent Documentation'],
      outcome: 'The design was granted an official Design Patent (No. 300578-001), validating its novelty and originality. The trolley reduces operator fatigue, improves material handling efficiency, and demonstrates the practical integration of electric actuation with mechanical adaptability in a compact utility vehicle.',
      gallery: [
        '/trolley.png',
        '/trolley_detail_1.jpg',
        '/trolley_detail_2.jpg'
      ]
    }
  },
  {
    id: 'farm-vehicle',
    title: 'Autonomous Farm Vehicle',
    subtitle: 'Agricultural Robotics',
    description: 'Designed an autonomous agricultural vehicle integrating mechanical and control systems. Developed chassis and drivetrain suitable for field operations. Created CAD models and detailed engineering drawings.',
    imagePlaceholder: 'AF',
    image: '/farm-vehicle.jpg',
  },
  {
    id: 'injection-molding',
    title: 'Micro injection molding mechine',
    subtitle: 'Precision Tooling & Manufacturing',
    description: 'Designed and developed a micro injection molding machine aimed at manufacturing terminal caps for electrical contact pins, focusing on precision molding and tooling parameters.',
    imagePlaceholder: 'MIM',
    image: '/molding_1.jpg',
    fullDetails: {
      overview: 'During my industrial training, I designed and developed a micro injection molding machine aimed at manufacturing terminal caps for electrical contact pins. The project focused on achieving precision molding for small components while understanding real-world tooling and process parameters.',
      tools: ['SOLIDWORKS', 'Basic Manufacturing Tools', 'Equipment'],
      concept: 'The core objective was to develop a micro-scale injection molding system capable of producing high-precision electrical contact components with consistent quality and minimal material waste.',
      keyFeatures: [
        { title: 'Mold Design', desc: 'Developed core and cavity for complex terminal cap geometry.' },
        { title: 'Flow System', desc: 'Studied and implemented runner and gate design for proper material flow.' },
        { title: 'Ejection Mechanism', desc: 'Worked on part ejection mechanisms to ensure defect-free removal.' },
        { title: 'Tooling Setup', desc: 'Assisted in tooling setup and mold assembly for precision manufacturing.' }
      ],
      engineeringContributions: [
        'Designed the micro injection molding machine concept and components using CAD tools',
        'Developed mold design including core and cavity for terminal cap geometry',
        'Studied and implemented runner and gate design for proper material flow',
        'Assisted in tooling setup and mold assembly',
        'Analyzed injection pressure requirements and material flow behavior',
        'Worked on part ejection mechanisms to ensure defect-free removal',
        'Collaborated with the production team during trial runs and optimization'
      ],
      technicalSkills: [
        'Injection Molding Process Fundamentals',
        'Mold Design (Core, Cavity, Runner, Gate)',
        'Sheet Metal & Mechanical Design',
        'CAD Modeling (SOLIDWORKS)',
        'Basic Manufacturing & Tooling Practices'
      ],
      keyLearnings: [
        'Understanding of plastic flow behavior inside molds',
        'Importance of gate location and runner design in part quality',
        'Effects of injection pressure and temperature control',
        'Practical exposure to tooling and mold assembly process'
      ],
      defectsAnalyzed: [
        { defect: 'Sink Marks', solution: 'Optimized cooling and material distribution' },
        { defect: 'Warpage', solution: 'Improved mold design and uniform cooling' },
        { defect: 'Short Shot', solution: 'Adjusted pressure and gate size' },
        { defect: 'Ejection Issues', solution: 'Modified ejector pin placement' }
      ],
      outcome: 'Successfully developed a functional concept of a micro injection molding system, improved understanding of precision plastic component manufacturing, and gained hands-on experience in tooling and defect analysis.',
      gallery: ['/molding_1.jpg', '/molding_2.jpg', '/molding_mold.jpg']
    }
  }
];
