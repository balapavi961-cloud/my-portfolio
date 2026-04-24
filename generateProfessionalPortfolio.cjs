const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// 1. Prepare Data
let projectsStr = fs.readFileSync('./src/data/projectsData.js', 'utf8');
projectsStr = projectsStr.replace(/import[\s\S]*?['"];/g, '');
projectsStr = projectsStr.replace('export const projectsData =', 'const projectsData =');
projectsStr += '\nmodule.exports = { projectsData };';
const tempFile = './temp_projects_pro.cjs';
fs.writeFileSync(tempFile, projectsStr);
const { projectsData } = require(tempFile);

const personalInfo = {
  name: 'Muralikrishnan Srinivasan',
  title: 'Industrial & Product Design Engineer',
  tagline: 'Bridging Creativity and Mechanical Excellence',
  location: 'Salem, Tamil Nadu, India',
  email: 'srinimurali121@gmail.com',
  phone: '+91 88701 44521', // Added placeholder phone if needed
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
  { category: 'CAD Software', items: ['SolidWorks', 'CATIA V5', 'AutoCAD', 'Creo'], level: 90 },
  { category: 'Design Capabilities', items: ['3D Modeling', 'Engineering Drawings', 'DFM', 'Injection Molding Design'], level: 85 },
  { category: 'Manufacturing', items: ['3D Printing', '3D Scanning', 'Prototyping', 'Product Validation'], level: 80 },
  { category: 'Core Strengths', items: ['Creative Problem Solving', 'Decision Making', 'Design Assembly'], level: 95 }
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

const profileImgBase64 = getBase64Image('/murali_profile_v2.jpg');

// 2. Define HTML Template
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #0d9488;
      --primary-dark: #0f172a;
      --primary-light: #f0fdfa;
      --text-main: #334155;
      --text-dark: #0f172a;
      --text-muted: #64748b;
      --bg-light: #f8fafc;
      --border: #e2e8f0;
      --card-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    }
    
    * { 
      box-sizing: border-box; 
      -webkit-print-color-adjust: exact; 
      print-color-adjust: exact; 
    }
    
    body { 
      font-family: 'Inter', sans-serif; 
      margin: 0; 
      padding: 0;
      color: var(--text-main); 
      line-height: 1.6;
      background: #f1f5f9;
    }

    h1, h2, h3, h4 { 
      font-family: 'Outfit', sans-serif; 
      margin: 0;
      color: var(--text-dark);
    }

    /* A4 Page Styling */
    .page {
      width: 210mm;
      height: 297mm;
      margin: 10mm auto;
      background: white;
      position: relative;
      overflow: hidden;
      box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
      display: flex;
      flex-direction: column;
    }

    @media print {
      body { background: none; }
      .page { 
        margin: 0; 
        box-shadow: none; 
        page-break-after: always;
      }
    }

    .content-padding {
      padding: 25mm 20mm;
      flex-grow: 1;
    }

    /* --- Page 1: Cover --- */
    .cover-page {
      background: linear-gradient(135deg, var(--primary-dark) 0%, #1e293b 100%);
      color: white;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .cover-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 30px;
    }

    .cover-img-container {
      width: 180px;
      height: 180px;
      border-radius: 40px;
      padding: 8px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      margin-bottom: 20px;
    }

    .cover-img {
      width: 100%;
      height: 100%;
      border-radius: 32px;
      object-fit: cover;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
    }

    .cover-title {
      font-size: 52px;
      font-weight: 800;
      letter-spacing: -2px;
      color: white;
      line-height: 1.1;
    }

    .cover-subtitle {
      font-size: 24px;
      color: var(--primary);
      font-weight: 600;
      margin-top: 10px;
    }

    .cover-tagline {
      font-size: 18px;
      color: var(--text-muted);
      max-width: 500px;
      margin-top: 20px;
    }

    .cover-footer {
      position: absolute;
      bottom: 40px;
      width: 100%;
      display: flex;
      justify-content: center;
      gap: 40px;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.6);
    }

    /* --- Common Layout Elements --- */
    .section-title {
      font-size: 24px;
      font-weight: 700;
      color: var(--primary-dark);
      margin-bottom: 25px;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .section-title::after {
      content: '';
      flex-grow: 1;
      height: 2px;
      background: var(--primary-light);
    }

    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
    }

    /* --- Cards --- */
    .card {
      background: white;
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 20px;
      position: relative;
    }

    .card h4 {
      font-size: 18px;
      margin-bottom: 6px;
    }

    .card .subtitle {
      color: var(--primary);
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 12px;
    }

    .card .meta {
      font-size: 13px;
      color: var(--text-muted);
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;
    }

    /* --- Progress Bars --- */
    .skill-item {
      margin-bottom: 18px;
    }

    .skill-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
      font-weight: 600;
      font-size: 14px;
    }

    .progress-bg {
      height: 8px;
      background: var(--primary-light);
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: var(--primary);
      border-radius: 4px;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 10px;
    }

    .tag {
      background: var(--bg-light);
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      border: 1px solid var(--border);
    }

    /* --- Projects --- */
    .project-card {
      display: grid;
      grid-template-columns: 240px 1fr;
      gap: 30px;
      padding: 30px;
      border-radius: 20px;
      background: white;
      border: 1px solid var(--border);
      margin-bottom: 30px;
    }

    .project-img-box img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      border-radius: 12px;
      border: 1px solid var(--border);
    }

    .project-gallery {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 10px;
    }

    .project-gallery img {
      width: 100%;
      height: 60px;
      object-fit: cover;
      border-radius: 8px;
    }

    .project-info h3 {
      font-size: 22px;
      margin-bottom: 4px;
    }

    .project-id {
      font-size: 12px;
      color: var(--primary);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 12px;
    }

    .project-desc {
      font-size: 14px;
      color: var(--text-main);
      margin-bottom: 15px;
    }

    .contribution-list {
      padding-left: 18px;
      margin: 0;
    }

    .contribution-list li {
      font-size: 13px;
      margin-bottom: 4px;
    }

    /* --- Footer --- */
    .page-footer {
      padding: 10mm 20mm;
      border-top: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: var(--text-muted);
    }

    .contact-block {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-top: 40px;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 15px;
      font-size: 16px;
    }

    .contact-icon {
      width: 40px;
      height: 40px;
      background: var(--primary-light);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary);
      font-weight: bold;
    }
  </style>
</head>
<body>

  <!-- PAGE 1: COVER -->
  <div class="page cover-page">
    <div class="cover-content">
      <div class="cover-img-container">
        ${profileImgBase64 ? `<img src="${profileImgBase64}" class="cover-img">` : ''}
      </div>
      <h1 class="cover-title">${personalInfo.name.toUpperCase()}</h1>
      <div class="cover-subtitle">${personalInfo.title}</div>
      <div class="cover-tagline">"${personalInfo.tagline}"</div>
    </div>
    <div class="cover-footer">
      <span>${personalInfo.location}</span>
      <span>•</span>
      <span>${personalInfo.email}</span>
    </div>
  </div>

  <!-- PAGE 2: PROFILE & EDUCATION -->
  <div class="page">
    <div class="content-padding">
      <h3 class="section-title">Professional Summary</h3>
      <div class="card" style="font-size: 16px; border-left: 4px solid var(--primary);">
        ${personalInfo.summary}
      </div>

      <h3 class="section-title">Education</h3>
      <div class="grid-2">
        ${education.map(edu => `
          <div class="card">
            <h4>${edu.degree}</h4>
            <div class="subtitle">${edu.major}</div>
            <div class="meta">
              <span>${edu.institution}</span>
            </div>
            <div style="font-weight: 700; color: var(--primary-dark);">${edu.period} • ${edu.grade}</div>
          </div>
        `).join('')}
      </div>

      <h3 class="section-title">Experience</h3>
      ${experienceData.map(exp => `
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <h4>${exp.role}</h4>
              <div class="subtitle">${exp.company}</div>
            </div>
            <div class="tag" style="background: var(--primary-light); color: var(--primary); border: none;">${exp.duration}</div>
          </div>
          <ul class="contribution-list" style="margin-top: 15px;">
            ${exp.description.map(d => `<li>${d}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </div>
    <div class="page-footer">
      <span>Muralikrishnan Srinivasan • Portfolio</span>
      <span>Page 2</span>
    </div>
  </div>

  <!-- PAGE 3: SKILLS & CERTIFICATIONS -->
  <div class="page">
    <div class="content-padding">
      <h3 class="section-title">Technical Expertise</h3>
      <div class="grid-2">
        ${skills.map(s => `
          <div class="card">
            <div class="skill-info">
              <span>${s.category}</span>
              <span style="color: var(--primary)">${s.level}%</span>
            </div>
            <div class="progress-bg">
              <div class="progress-fill" style="width: ${s.level}%"></div>
            </div>
            <div class="tags">
              ${s.items.map(item => `<span class="tag">${item}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <h3 class="section-title">Certifications</h3>
      <div class="card">
        <div class="grid-2" style="grid-template-columns: 1fr 1fr; gap: 10px;">
          ${certifications.map(c => `
            <div style="font-size: 14px; padding: 10px; border-radius: 8px; background: var(--bg-light); display: flex; align-items: center; gap: 10px;">
              <span style="color: var(--primary); font-weight: 800;">✓</span>
              ${c}
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    <div class="page-footer">
      <span>Muralikrishnan Srinivasan • Portfolio</span>
      <span>Page 3</span>
    </div>
  </div>

  <!-- PAGE 4: PROJECTS (Part 1) -->
  <div class="page">
    <div class="content-padding">
      <h3 class="section-title">Engineering Projects</h3>
      
      ${projectsData.slice(0, 2).map(proj => {
        const mainImg = getBase64Image(proj.image);
        const details = proj.fullDetails || {};
        return `
          <div class="project-card">
            <div class="project-img-box">
              ${mainImg ? `<img src="${mainImg}">` : ''}
              <div class="project-gallery">
                ${(details.gallery || []).slice(1, 3).map(img => {
                  const gImg = getBase64Image(img);
                  return gImg ? `<img src="${gImg}">` : '';
                }).join('')}
              </div>
            </div>
            <div class="project-info">
              <div class="project-id">${details.patent || proj.subtitle}</div>
              <h3>${proj.title}</h3>
              <p class="project-desc">${details.overview || proj.description}</p>
              
              <div style="font-weight: 700; font-size: 12px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px;">Key Contributions</div>
              <ul class="contribution-list">
                ${(details.engineeringContributions || []).slice(0, 4).map(c => `<li>${c}</li>`).join('')}
              </ul>
              
              <div class="tags" style="margin-top: 15px;">
                ${(details.tools || details.technicalSkills || []).slice(0, 5).map(t => `<span class="tag">${t}</span>`).join('')}
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
    <div class="page-footer">
      <span>Muralikrishnan Srinivasan • Portfolio</span>
      <span>Page 4</span>
    </div>
  </div>

  <!-- PAGE 5: PROJECTS (Part 2) & CONTACT -->
  <div class="page">
    <div class="content-padding">
      ${projectsData.slice(2, 3).map(proj => {
        const mainImg = getBase64Image(proj.image);
        const details = proj.fullDetails || {};
        return `
          <div class="project-card">
            <div class="project-img-box">
              ${mainImg ? `<img src="${mainImg}">` : ''}
              <div class="project-gallery">
                ${(details.gallery || []).slice(1, 3).map(img => {
                  const gImg = getBase64Image(img);
                  return gImg ? `<img src="${gImg}">` : '';
                }).join('')}
              </div>
            </div>
            <div class="project-info">
              <div class="project-id">${proj.subtitle}</div>
              <h3>${proj.title}</h3>
              <p class="project-desc">${details.overview || proj.description}</p>
              
              <div style="font-weight: 700; font-size: 12px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px;">Key Contributions</div>
              <ul class="contribution-list">
                ${(details.engineeringContributions || []).slice(0, 4).map(c => `<li>${c}</li>`).join('')}
              </ul>
              
              <div class="tags" style="margin-top: 15px;">
                ${(details.tools || details.technicalSkills || []).slice(0, 5).map(t => `<span class="tag">${t}</span>`).join('')}
              </div>
            </div>
          </div>
        `;
      }).join('')}

      <div style="margin-top: 60px;">
        <h3 class="section-title">Get In Touch</h3>
        <div class="card" style="background: var(--primary-dark); color: white; border: none; padding: 40px;">
          <div class="grid-2">
            <div>
              <div class="contact-item">
                <div class="contact-icon">✉</div>
                <div>
                  <div style="font-size: 12px; color: var(--primary);">Email</div>
                  <div>${personalInfo.email}</div>
                </div>
              </div>
              <br>
              <div class="contact-item">
                <div class="contact-icon">📍</div>
                <div>
                  <div style="font-size: 12px; color: var(--primary);">Location</div>
                  <div>${personalInfo.location}</div>
                </div>
              </div>
            </div>
            <div>
              <div class="contact-item">
                <div class="contact-icon">in</div>
                <div>
                  <div style="font-size: 12px; color: var(--primary);">LinkedIn</div>
                  <div>${personalInfo.linkedin}</div>
                </div>
              </div>
              <br>
              <div class="contact-item">
                <div class="contact-icon">📱</div>
                <div>
                  <div style="font-size: 12px; color: var(--primary);">Phone</div>
                  <div>${personalInfo.phone}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <span>Muralikrishnan Srinivasan • Portfolio</span>
      <span>Page 5</span>
    </div>
  </div>

</body>
</html>
`;

// 3. Generate PDF
(async () => {
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({
      headless: "new"
    });
    const page = await browser.newPage();
    
    console.log('Setting content...');
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    const outputPath = 'Muralikrishnan_Professional_Portfolio.pdf';
    console.log('Generating PDF...');
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm'
      }
    });
    
    await browser.close();
    console.log('PDF generated successfully: ' + outputPath);
  } catch (err) {
    console.error('Error generating PDF:', err);
  } finally {
    if (fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile);
    }
  }
})();
