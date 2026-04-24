const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Parse projectsData.js safely
let projectsStr = fs.readFileSync('./src/data/projectsData.js', 'utf8');
projectsStr = projectsStr.replace(/import[\s\S]*?['"];/g, '');
projectsStr = projectsStr.replace('export const projectsData =', 'const projectsData =');
projectsStr += '\nmodule.exports = { projectsData };';
fs.writeFileSync('./temp_projectsData_detailed.cjs', projectsStr);

const { projectsData } = require('./temp_projectsData_detailed.cjs');

// Data extracted from components
const personalInfo = {
  name: 'Muralikrishnan Srinivasan',
  title: 'Industrial & Product Design Engineer',
  location: 'Salem, Tamil Nadu, India',
  email: 'srinimurali121@gmail.com',
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
  { category: 'Design Capabilities', items: ['3D Modeling', 'Engineering Drawings', 'Product Design', 'Assembly Design', 'DFM', 'Injection Molding Design'] },
  { category: 'Manufacturing', items: ['3D Printing', '3D Scanning', 'Prototyping', 'Product Validation'] },
  { category: 'Core Strengths', items: ['Creative Problem Solving', 'Quick Decision Making', 'Design Modeling and Assembly'] }
];

const certifications = [
  'NPTEL – Manufacturing Process Technology I & II',
  'Diploma in Mechatronics – Alison',
  'Introduction to Aircraft Design – Alison',
  'NPTEL – Sustainable Power Generation Systems',
  'AutoCAD – GUVI',
  'CATIA Basics – Great Learning'
];

// Helper to convert local image to base64
const getBase64Image = (imagePath) => {
  if (!imagePath) return '';
  try {
    const fullPath = path.join(__dirname, 'public', imagePath);
    if (fs.existsSync(fullPath)) {
      const ext = path.extname(imagePath).toLowerCase();
      const mimeType = ext === '.png' ? 'image/png' : 'image/jpeg';
      const base64 = fs.readFileSync(fullPath, 'base64');
      return `data:${mimeType};base64,${base64}`;
    }
  } catch (e) {
    console.error('Error loading image:', imagePath);
  }
  return '';
};

const profileImage = getBase64Image('/murali_profile_v2.jpg');

let htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    :root {
      --primary: #0d9488;
      --primary-dark: #0f172a;
      --text-main: #334155;
      --text-dark: #1e293b;
      --bg-light: #f8fafc;
      --border: #e2e8f0;
    }
    
    * { box-sizing: border-box; }
    body { 
      font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
      margin: 0; 
      color: var(--text-main); 
      line-height: 1.5;
      background: white;
    }
    
    .container { max-width: 900px; margin: 0 auto; padding: 40px; }
    
    header {
      display: flex;
      align-items: center;
      gap: 30px;
      margin-bottom: 40px;
      border-bottom: 2px solid var(--primary);
      padding-bottom: 30px;
    }
    
    .profile-img {
      width: 150px;
      height: 150px;
      border-radius: 20px;
      object-fit: cover;
      border: 4px solid var(--primary);
    }
    
    .header-text h1 {
      margin: 0;
      font-size: 36px;
      color: var(--primary-dark);
      letter-spacing: -1px;
    }
    
    .header-text h2 {
      margin: 5px 0 10px 0;
      font-size: 20px;
      color: var(--primary);
      font-weight: 600;
    }
    
    .contact-info {
      font-size: 14px;
      display: flex;
      gap: 20px;
      color: var(--text-main);
    }
    
    section { margin-bottom: 40px; }
    h3 { 
      font-size: 22px; 
      color: var(--primary-dark); 
      border-left: 5px solid var(--primary);
      padding-left: 15px;
      margin-bottom: 20px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .summary-box {
      background: var(--bg-light);
      padding: 20px;
      border-radius: 12px;
      font-style: italic;
    }
    
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    
    .card {
      background: white;
      border: 1px solid var(--border);
      padding: 20px;
      border-radius: 12px;
      page-break-inside: avoid;
    }
    
    .card h4 { margin: 0 0 10px 0; color: var(--primary-dark); font-size: 18px; }
    .card .subtitle { color: var(--primary); font-weight: 600; font-size: 14px; margin-bottom: 10px; }
    .card .date { font-size: 13px; color: #64748b; margin-bottom: 10px; }
    
    ul { padding-left: 20px; margin: 10px 0; }
    li { margin-bottom: 5px; font-size: 14px; }
    
    .skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
    .skill-category b { color: var(--primary-dark); display: block; margin-bottom: 5px; font-size: 15px; }
    .skill-tags { display: flex; flex-wrap: wrap; gap: 5px; }
    .skill-tag { 
      background: #f1f5f9; 
      padding: 3px 10px; 
      border-radius: 6px; 
      font-size: 12px; 
      font-weight: 600;
    }
    
    .project-item {
      border: 1px solid var(--border);
      border-radius: 15px;
      padding: 25px;
      margin-bottom: 30px;
      page-break-inside: avoid;
    }
    
    .project-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
    .project-title h4 { margin: 0; font-size: 22px; color: var(--primary-dark); }
    .project-subtitle { color: var(--primary); font-weight: 700; font-size: 13px; text-transform: uppercase; }
    
    .project-content { display: grid; grid-template-columns: 350px 1fr; gap: 25px; }
    .project-img { width: 100%; border-radius: 10px; border: 1px solid var(--border); }
    
    .section-label { font-weight: 700; font-size: 13px; text-transform: uppercase; color: #64748b; margin-top: 15px; display: block; margin-bottom: 5px; }
    
    .gallery { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 20px; }
    .gallery img { width: 100%; border-radius: 8px; }
    
    .page-break { page-break-before: always; }
    
    .cert-list { columns: 2; column-gap: 30px; }
    .cert-list li { break-inside: avoid; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      ${profileImage ? `<img src="${profileImage}" class="profile-img" alt="Profile">` : ''}
      <div class="header-text">
        <h1>${personalInfo.name}</h1>
        <h2>${personalInfo.title}</h2>
        <div class="contact-info">
          <span>📍 ${personalInfo.location}</span>
          <span>✉️ ${personalInfo.email}</span>
        </div>
      </div>
    </header>

    <section>
      <h3>Professional Summary</h3>
      <div class="summary-box">
        ${personalInfo.summary}
      </div>
    </section>

    <div class="grid">
      <section>
        <h3>Education</h3>
        ${education.map(edu => `
          <div class="card">
            <h4>${edu.degree}</h4>
            <div class="subtitle">${edu.major}</div>
            <p>${edu.institution}</p>
            <div class="date">${edu.period} | <b>${edu.grade}</b></div>
          </div>
        `).join('')}
      </section>

      <section>
        <h3>Technical Skills</h3>
        <div class="card">
          <div class="skills-grid">
            ${skills.map(s => `
              <div class="skill-category">
                <b>${s.category}</b>
                <div class="skill-tags">
                  ${s.items.map(item => `<span class="skill-tag">${item}</span>`).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    </div>

    <section>
      <h3>Work Experience</h3>
      ${experienceData.map(exp => `
        <div class="card" style="margin-bottom: 15px;">
          <div style="display: flex; justify-content: space-between;">
            <h4>${exp.role}</h4>
            <span class="date">${exp.duration}</span>
          </div>
          <div class="subtitle">${exp.company}</div>
          <ul>
            ${exp.description.map(d => `<li>${d}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </section>

    <section>
      <h3>Certifications</h3>
      <div class="card">
        <ul class="cert-list">
          ${certifications.map(c => `<li>${c}</li>`).join('')}
        </ul>
      </div>
    </section>

    <div class="page-break"></div>
    
    <section>
      <h3>Key Engineering Projects</h3>
      ${projectsData.map(proj => {
        const mainImg = getBase64Image(proj.image);
        const details = proj.fullDetails || {};
        return `
          <div class="project-item">
            <div class="project-header">
              <div class="project-title">
                <h4>${proj.title}</h4>
                <div class="project-subtitle">${proj.subtitle}</div>
              </div>
              ${details.patent ? `<div class="skill-tag" style="background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0;">${details.patent}</div>` : ''}
            </div>

            <div class="project-content">
              <div>
                ${mainImg ? `<img src="${mainImg}" class="project-img">` : ''}
                
                ${details.gallery && details.gallery.length > 1 ? `
                  <div class="gallery">
                    ${details.gallery.slice(1, 3).map(img => {
                      const gImg = getBase64Image(img);
                      return gImg ? `<img src="${gImg}">` : '';
                    }).join('')}
                  </div>
                ` : ''}
              </div>
              
              <div>
                <span class="section-label">Project Overview</span>
                <p style="font-size: 14px; margin: 0;">${details.overview || proj.description}</p>
                
                ${details.engineeringContributions ? `
                  <span class="section-label">Engineering Contributions</span>
                  <ul>
                    ${details.engineeringContributions.map(c => `<li>${c}</li>`).join('')}
                  </ul>
                ` : ''}

                ${details.technicalSkills ? `
                  <span class="section-label">Technical Skills</span>
                  <div class="skill-tags">
                    ${details.technicalSkills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
                  </div>
                ` : ''}

                ${details.outcome ? `
                  <span class="section-label">Outcome</span>
                  <p style="font-size: 13px; font-weight: 600; color: var(--primary); margin: 0;">${details.outcome}</p>
                ` : ''}
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </section>
  </div>
</body>
</html>
`;

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: "new"
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    await page.pdf({
      path: 'Muralikrishnan_Detailed_Portfolio.pdf',
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });
    
    await browser.close();
    console.log('PDF generated successfully: Muralikrishnan_Detailed_Portfolio.pdf');
  } catch (err) {
    console.error('Error generating PDF:', err);
  } finally {
    if (fs.existsSync('./temp_projectsData_detailed.cjs')) {
      fs.unlinkSync('./temp_projectsData_detailed.cjs');
    }
  }
})();
