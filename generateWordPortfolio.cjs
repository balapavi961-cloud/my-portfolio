const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, ImageRun, Table, TableRow, TableCell, WidthType, BorderStyle } = require('docx');

// 1. Prepare Data (Reuse logic from PDF script)
let projectsStr = fs.readFileSync('./src/data/projectsData.js', 'utf8');
projectsStr = projectsStr.replace(/import[\s\S]*?['"];/g, '');
projectsStr = projectsStr.replace('export const projectsData =', 'const projectsData =');
projectsStr += '\nmodule.exports = { projectsData };';
const tempFile = './temp_projects_word.cjs';
fs.writeFileSync(tempFile, projectsStr);
const { projectsData } = require(tempFile);

const personalInfo = {
  name: 'Muralikrishnan Srinivasan',
  title: 'Industrial & Product Design Engineer',
  location: 'Salem, Tamil Nadu, India',
  email: 'srinimurali121@gmail.com',
  phone: '+91 88701 44521',
  linkedin: 'linkedin.com/in/muralikrishnan-s',
  summary: 'Industrial and Product Design engineer with strong experience in CAD modeling, product development, and manufacturing technologies. Experienced in SolidWorks product design, injection molding design, and prototyping. Passionate about creating innovative engineering solutions and improving product functionality through design optimization.'
};

const education = [
  {
    degree: 'Bachelor of Engineering',
    major: 'Mechanical Engineering',
    institution: 'Sri Shanmugha College of Engineering and Technology',
    period: 'Expected 2026',
    grade: 'CGPA: 7.6'
  }
];

const experienceData = [
  { 
    role: 'Product Design Intern', 
    company: 'Tamirabot Advanced Engineering Pvt Ltd', 
    duration: 'March 2025 – May 2025', 
    description: ['Worked on complete product design lifecycle from concept development to manufacturing delivery.', 'Created detailed 3D models using SolidWorks.', 'Designed products optimized for injection molding and cost efficiency.', 'Managed prototyping and validation processes.'] 
  },
  { 
    role: 'In Plant Training', 
    company: 'TVS Mobility, Sankari', 
    duration: 'July 2024', 
    description: ['Exposure to automotive manufacturing processes and assembly workflows.', 'Learned quality control procedures and production operations.'] 
  },
  { 
    role: 'Industrial Training', 
    company: 'Salem Steel Plant', 
    duration: '2023', 
    description: ['Studied industrial manufacturing processes and steel production workflows.'] 
  }
];

const skills = [
  { category: 'CAD Software', items: ['SolidWorks', 'CATIA V5', 'AutoCAD', 'Creo'] },
  { category: 'Design Capabilities', items: ['3D Modeling', 'Engineering Drawings', 'DFM', 'Injection Molding Design'] },
  { category: 'Manufacturing', items: ['3D Printing', '3D Scanning', 'Prototyping', 'Product Validation'] },
  { category: 'Core Strengths', items: ['Creative Problem Solving', 'Decision Making', 'Design Assembly'] }
];

const certifications = [
  'NPTEL – Manufacturing Process Technology I & II',
  'Diploma in Mechatronics – Alison',
  'Introduction to Aircraft Design – Alison',
  'NPTEL – Sustainable Power Generation Systems',
  'AutoCAD – GUVI',
  'CATIA Basics – Great Learning'
];

// Helper to get image buffer
const getImageBuffer = (imagePath) => {
  if (!imagePath) return null;
  try {
    const fullPath = path.join(__dirname, 'public', imagePath);
    if (fs.existsSync(fullPath)) {
      return fs.readFileSync(fullPath);
    }
  } catch (e) {
    console.error('Error loading image:', imagePath);
  }
  return null;
};

// 2. Build Document
const doc = new Document({
  sections: [
    {
      properties: {},
      children: [
        // Header
        new Paragraph({
          text: personalInfo.name.toUpperCase(),
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph({
          text: personalInfo.title,
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: personalInfo.title,
              bold: true,
              color: "0d9488",
              size: 28,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: `${personalInfo.location} | ${personalInfo.email} | ${personalInfo.phone}`, size: 20 }),
          ],
          spacing: { after: 400 },
        }),

        // Summary
        new Paragraph({ text: "PROFESSIONAL SUMMARY", heading: HeadingLevel.HEADING_2, border: { bottom: { color: "0d9488", size: 12, space: 1, style: BorderStyle.SINGLE } } }),
        new Paragraph({
          text: personalInfo.summary,
          spacing: { before: 200, after: 400 },
        }),

        // Education
        new Paragraph({ text: "EDUCATION", heading: HeadingLevel.HEADING_2, border: { bottom: { color: "0d9488", size: 12, space: 1, style: BorderStyle.SINGLE } } }),
        ...education.flatMap(edu => [
          new Paragraph({
            children: [
              new TextRun({ text: edu.degree, bold: true }),
              new TextRun({ text: ` in ${edu.major}` }),
            ],
            spacing: { before: 200 },
          }),
          new Paragraph({ text: edu.institution }),
          new Paragraph({ text: `${edu.period} | ${edu.grade}`, spacing: { after: 200 } }),
        ]),

        // Skills
        new Paragraph({ text: "TECHNICAL SKILLS", heading: HeadingLevel.HEADING_2, border: { bottom: { color: "0d9488", size: 12, space: 1, style: BorderStyle.SINGLE } }, spacing: { before: 200 } }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: skills.map(s => new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text: s.category, bold: true })] })],
                width: { size: 30, type: WidthType.PERCENTAGE },
              }),
              new TableCell({
                children: [new Paragraph({ text: s.items.join(", ") })],
                width: { size: 70, type: WidthType.PERCENTAGE },
              }),
            ],
          })),
          spacing: { after: 400 },
        }),

        // Experience
        new Paragraph({ text: "WORK EXPERIENCE", heading: HeadingLevel.HEADING_2, border: { bottom: { color: "0d9488", size: 12, space: 1, style: BorderStyle.SINGLE } }, spacing: { before: 200 } }),
        ...experienceData.flatMap(exp => [
          new Paragraph({
            children: [
              new TextRun({ text: exp.role, bold: true }),
              new TextRun({ text: ` at ${exp.company}`, italic: true }),
              new TextRun({ text: ` (${exp.duration})`, size: 18 }),
            ],
            spacing: { before: 200 },
          }),
          ...exp.description.map(d => new Paragraph({ text: `• ${d}`, spacing: { left: 720 } })),
        ]),

        // Certifications
        new Paragraph({ text: "CERTIFICATIONS", heading: HeadingLevel.HEADING_2, border: { bottom: { color: "0d9488", size: 12, space: 1, style: BorderStyle.SINGLE } }, spacing: { before: 400 } }),
        ...certifications.map(c => new Paragraph({ text: `• ${c}`, spacing: { before: 100 } })),

        // Projects
        new Paragraph({ text: "ENGINEERING PROJECTS", heading: HeadingLevel.HEADING_2, border: { bottom: { color: "0d9488", size: 12, space: 1, style: BorderStyle.SINGLE } }, spacing: { before: 400 } }),
        ...projectsData.flatMap(proj => {
          const imgBuffer = getImageBuffer(proj.image);
          const details = proj.fullDetails || {};
          
          const components = [
            new Paragraph({
              children: [new TextRun({ text: proj.title.toUpperCase(), bold: true, size: 24, color: "0d9488" })],
              spacing: { before: 400 },
            }),
            new Paragraph({ text: details.patent || proj.subtitle, italic: true }),
            new Paragraph({ text: details.overview || proj.description, spacing: { before: 200 } }),
          ];

          if (imgBuffer) {
            components.push(new Paragraph({
              children: [
                new ImageRun({
                  data: imgBuffer,
                  transformation: { width: 400, height: 250 },
                }),
              ],
              spacing: { before: 200, after: 200 },
              alignment: AlignmentType.CENTER,
            }));
          }

          if (details.engineeringContributions) {
            components.push(new Paragraph({ text: "Key Contributions:", bold: true, spacing: { before: 200 } }));
            details.engineeringContributions.forEach(c => {
              components.push(new Paragraph({ text: `• ${c}`, spacing: { left: 720 } }));
            });
          }

          return components;
        }),
      ],
    },
  ],
});

// 3. Save Document
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("Muralikrishnan_Portfolio.docx", buffer);
  console.log("Word document generated successfully: Muralikrishnan_Portfolio.docx");
  if (fs.existsSync(tempFile)) {
    fs.unlinkSync(tempFile);
  }
}).catch(err => {
  console.error("Error generating Word document:", err);
});
