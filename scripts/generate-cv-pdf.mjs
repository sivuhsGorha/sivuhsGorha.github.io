import { writeFileSync, unlinkSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { cv } from '../src/data/cv.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const c = cv.contact;
const link = (l) => `<a href="${l.url}">${l.label}</a>`;
const bullets = (items) => `<ul>${items.map((b) => `<li>${b}</li>`).join('')}</ul>`;

const cvHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${cv.name} - CV</title>
<style>
    @page { size: A4 portrait; margin: 12mm 15mm; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    body { font-family: Calibri, "Segoe UI", Arial, sans-serif; font-size: 10pt; line-height: 1.38; color: #111827; margin: 0; }
    a { color: #1d4ed8; text-decoration: none; }
    h1 { font-size: 22pt; margin: 0; letter-spacing: -0.01em; }
    .headline { font-size: 11.5pt; font-weight: 600; color: #374151; margin: 1px 0 4px; }
    .contact { font-size: 9.5pt; color: #374151; }
    .contact span + span::before { content: "  |  "; color: #9ca3af; }
    .contact br + span::before { content: none; }
    h2 { font-size: 10.5pt; text-transform: uppercase; letter-spacing: 0.06em; border-bottom: 1.2px solid #111827; margin: 11px 0 5px; padding-bottom: 1px; break-after: avoid; }
    p { margin: 0; }
    ul { margin: 2px 0 0; padding-left: 16px; }
    li { margin-bottom: 1.5px; }
    .row { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
    .item { margin-bottom: 7px; break-inside: avoid; }
    .role { font-weight: 700; }
    .where { color: #374151; }
    .date { white-space: nowrap; color: #374151; font-size: 9.5pt; }
    .stack { font-size: 9.3pt; color: #4b5563; font-style: italic; }
    .skills td { padding: 1px 0; vertical-align: top; }
    .skills td:first-child { width: 17%; font-weight: 700; padding-right: 8px; }
    table { border-collapse: collapse; width: 100%; }
</style>
</head>
<body>
    <h1>${cv.name}</h1>
    <div class="headline">${cv.headline}</div>
    <div class="contact">
        <span>${c.location}</span><span>${c.phone}</span><span><a href="mailto:${c.email}">${c.email}</a></span><br><span>${link(c.website)}</span><span>${link(c.github)}</span><span>${link(c.linkedin)}</span>
    </div>

    <h2>Summary</h2>
    <p>${cv.summary}</p>

    <h2>Skills</h2>
    <table class="skills">${cv.skills.map((s) => `<tr><td>${s.label}</td><td>${s.items}</td></tr>`).join('')}</table>

    <h2>Experience</h2>
    ${cv.experience.map((j) => `<div class="item">
        <div class="row"><span><span class="role">${j.title}</span>, <span class="where">${j.company}, ${j.location}</span></span><span class="date">${j.dates}</span></div>
        ${bullets(j.bullets)}
    </div>`).join('')}

    <h2>${cv.projectsTitle}</h2>
    ${cv.projects.map((p) => `<div class="item">
        <div class="row"><span><span class="role">${p.name}</span>${p.link ? ` (${link(p.link)})` : ''}</span><span class="date">${p.dates}</span></div>
        <div class="stack">${p.stack}</div>
        ${bullets(p.bullets)}
    </div>`).join('')}

    <h2>Education &amp; Certifications</h2>
    ${cv.education.map((e) => `<div class="item">
        <div class="row"><span><span class="role">${e.title}</span>, <span class="where">${e.school}</span></span><span class="date">${e.dates}</span></div>
        ${e.note ? `<p>${e.note}</p>` : ''}${e.detail ? `<p>${e.detail}</p>` : ''}
    </div>`).join('')}
    <p><span class="role">Certifications:</span> ${cv.certifications.map((x) => x.name + (x.note ? ` (${x.note})` : '')).join(', ')}</p>
    <p style="margin-top:3px"><span class="role">Languages:</span> ${cv.languages}</p>
</body>
</html>`;

const tempHtmlPath = join(root, 'temp_cv_render.html');
const targetPdfPublic = join(root, 'public', 'Sibongakonke_Simamane_CV.pdf');

writeFileSync(tempHtmlPath, cvHtml, 'utf8');

const edgeExe = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

console.log('Rendering PDF using Microsoft Edge headless...');
try {
    execFileSync(edgeExe, ['--headless', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${targetPdfPublic}`, tempHtmlPath], { stdio: 'inherit' });
    console.log(`Generated PDF at ${targetPdfPublic}`);
} catch (err) {
    console.error('Error generating PDF:', err);
} finally {
    if (existsSync(tempHtmlPath)) {
        unlinkSync(tempHtmlPath);
    }
}
