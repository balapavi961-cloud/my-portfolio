const fs = require('fs');
const puppeteer = require('puppeteer');

// Parse projectsData.js safely
let projectsStr = fs.readFileSync('./src/data/projectsData.js', 'utf8');
// Remove all imports
projectsStr = projectsStr.replace(/import[\s\S]*?['"];/g, '');
// Change export to const
projectsStr = projectsStr.replace('export const projectsData =', 'const projectsData =');
// Export for node
projectsStr += '\nmodule.exports = { projectsData };';
fs.writeFileSync('./temp_projectsData.cjs', projectsStr);

const { projectsData } = require('./temp_projectsData.cjs');

const experienceData = [
  { role: 'Product Design Intern', company: 'Tamirabot Advanced Engineering Pvt Ltd', duration: 'March 2025 – May 2025', description: ['Worked on complete product design lifecycle from concept development to manufacturing delivery.', 'Created detailed 3D models using SolidWorks.', 'Designed products optimized for injection molding and cost efficiency.', 'Managed prototyping and validation processes.'] },
  { role: 'In Plant Training', company: 'TVS Mobility, Sankari', duration: 'July 2024', description: ['Exposure to automotive manufacturing processes and assembly workflows.', 'Learned quality control procedures and production operations.'] },
  { role: 'Industrial Training', company: 'Salem Steel Plant', duration: '2023', description: ['Studied industrial manufacturing processes and steel production workflows.'] }
];

const path = require('path');

// Helper to convert local image to base64
const getBase64Image = (imagePath) => {
  try {
    const fullPath = path.join(__dirname, 'public', imagePath);
    if (fs.existsSync(fullPath)) {
      const ext = path.extname(imagePath).toLowerCase();
      const mimeType = ext === '.png' ? 'image/png' : 'image/jpeg';
      const base64 = fs.readFileSync(fullPath, 'base64');
      return `data:${mimeType};base64,${base64}`;
    }
  } catch (e) {
    console.error('Error loading image:', imagePath, e);
  }
  return '';
};

let htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; color: #333; line-height: 1.6; }
    h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; margin-bottom: 30px; font-size: 28px; }
    h2 { color: #2980b9; margin-top: 30px; border-bottom: 1px solid #eee; padding-bottom: 5px; font-size: 22px; }
    .item { margin-bottom: 25px; padding: 20px; background: #fff; border: 1px solid #e1e8ed; border-radius: 8px; page-break-inside: avoid; }
    .title { font-size: 18px; font-weight: bold; color: #2c3e50; margin-bottom: 5px; }
    .subtitle { color: #34495e; font-size: 15px; margin-bottom: 10px; font-weight: 500; }
    .tag { display: inline-block; background: #eef2f5; color: #556; padding: 4px 10px; border-radius: 4px; font-size: 13px; margin-bottom: 10px; font-weight: bold; }
    ul { margin-top: 10px; padding-left: 20px; font-size: 14px; }
    li { margin-bottom: 6px; }
    p { font-size: 14px; margin-bottom: 10px; }
    .section-title { font-weight: 600; margin-top: 15px; color: #34495e; font-size: 15px; text-transform: uppercase; letter-spacing: 0.5px; }
    .page-break { page-break-after: always; }
    .gallery { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 15px; }
    .gallery-img { max-width: 48%; height: auto; border-radius: 8px; object-fit: cover; border: 1px solid #eee; }
    .main-img { max-width: 100%; height: auto; border-radius: 8px; margin-bottom: 15px; border: 1px solid #eee; }
  </style>
</head>
<body>
  <h1>Murali's Portfolio & Experience</h1>
  
  <h2>Work Experience</h2>
  ${experienceData.map(exp => `
    <div class="item">
      <div class="title">${exp.role}</div>
      <div class="subtitle">${exp.company}</div>
      <div class="tag">${exp.duration}</div>
      <ul>
        ${exp.description.map(desc => `<li>${desc}</li>`).join('')}
      </ul>
    </div>
  `).join('')}

  <div class="page-break"></div>

  <h2>Key Projects</h2>
  ${projectsData.map(proj => {
    const mainImgBase64 = proj.image ? getBase64Image(proj.image) : '';
    return `
    <div class="item">
      <div class="title">${proj.title}</div>
      <div class="subtitle">${proj.subtitle}</div>
      
      ${mainImgBase64 ? `<img src="${mainImgBase64}" class="main-img" />` : ''}
      
      <p>${proj.description}</p>
      
      ${proj.fullDetails ? `
        ${proj.fullDetails.overview ? `<div class="section-title">Overview</div><p>${proj.fullDetails.overview}</p>` : ''}
        
        ${proj.fullDetails.engineeringContributions ? `
          <div class="section-title">Key Responsibilities & Contributions</div>
          <ul>
            ${proj.fullDetails.engineeringContributions.map(item => `<li>${item}</li>`).join('')}
          </ul>
        ` : ''}

        ${proj.fullDetails.technicalSkills ? `
          <div class="section-title">Technical Skills</div>
          <ul>
            ${proj.fullDetails.technicalSkills.map(item => `<li>${item}</li>`).join('')}
          </ul>
        ` : ''}

        ${proj.fullDetails.outcome ? `
          <div class="section-title">Outcome</div>
          <p>${proj.fullDetails.outcome}</p>
        ` : ''}
        
        ${proj.fullDetails.gallery && proj.fullDetails.gallery.length > 0 ? `
          <div class="section-title">Gallery</div>
          <div class="gallery">
            ${proj.fullDetails.gallery.map(img => {
              const imgBase64 = getBase64Image(img);
              return imgBase64 ? `<img src="${imgBase64}" class="gallery-img" />` : '';
            }).join('')}
          </div>
        ` : ''}
      ` : ''}
    </div>
  `}).join('')}

</body>
</html>
`;

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    await page.pdf({ 
      path: 'Murali_Portfolio.pdf', 
      format: 'A4', 
      printBackground: true,
      margin: { top: '40px', right: '40px', bottom: '40px', left: '40px' } 
    });
    await browser.close();
    console.log('PDF generated successfully!');
  } catch (err) {
    console.error('Error generating PDF:', err);
  } finally {
    if(fs.existsSync('./temp_projectsData.cjs')) {
      fs.unlinkSync('./temp_projectsData.cjs');
    }
  }
})();
