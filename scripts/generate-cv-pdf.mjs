import { writeFileSync, unlinkSync, existsSync, copyFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const cvHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Curriculum Vitae — Sibongakonke Simamane</title>
    <style>
        @page {
            size: A4 portrait;
            margin: 7mm 11mm 7mm 11mm;
        }

        *, *::before, *::after {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #1e293b;
            background: #ffffff;
            line-height: 1.35;
            font-size: 8.7pt;
            margin: 0;
            padding: 0;
        }

        a {
            color: #0369a1;
            text-decoration: none;
        }

        /* HEADER */
        .header {
            border-bottom: 2px solid #b45309;
            padding-bottom: 5px;
            margin-bottom: 7px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }

        .header-left {
            flex: 1;
        }

        .name {
            font-size: 20pt;
            font-weight: 800;
            letter-spacing: -0.02em;
            color: #0f172a;
            margin: 0 0 2px 0;
            text-transform: uppercase;
        }

        .title-line {
            font-size: 9.5pt;
            font-weight: 700;
            color: #b45309;
            text-transform: uppercase;
            letter-spacing: 0.03em;
            margin-bottom: 4px;
        }

        .contact-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 2px 12px;
            font-size: 8.2pt;
            color: #475569;
        }

        .contact-item {
            display: inline-flex;
            align-items: center;
            gap: 3px;
        }

        .contact-item a {
            color: #0f172a;
            font-weight: 500;
        }

        .header-badge {
            background: #fffbeb;
            border: 1px solid #d97706;
            border-radius: 4px;
            padding: 4px 8px;
            text-align: right;
            flex-shrink: 0;
            margin-left: 10px;
        }

        .badge-title {
            font-size: 7pt;
            font-weight: 700;
            color: #64748b;
            letter-spacing: 0.05em;
        }

        .badge-dist {
            font-size: 9.8pt;
            font-weight: 800;
            color: #b45309;
            margin: 0;
        }

        .badge-sub {
            font-size: 7pt;
            color: #334155;
            font-weight: 600;
        }

        /* SECTION STYLING */
        .section {
            margin-bottom: 7px;
        }

        .section-title {
            font-size: 9.8pt;
            font-weight: 800;
            color: #0f172a;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            border-bottom: 1px solid #cbd5e1;
            padding-bottom: 2px;
            margin: 0 0 5px 0;
            display: flex;
            align-items: center;
            gap: 4px;
            page-break-after: avoid;
            break-after: avoid;
        }

        .section-title span.slash {
            color: #b45309;
            font-weight: 900;
        }

        /* SUMMARY */
        .summary-text {
            font-size: 8.7pt;
            color: #334155;
            line-height: 1.38;
            margin: 0;
            text-align: justify;
        }

        /* SKILLS TABLE / CHIPS */
        .skills-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 8.3pt;
        }

        .skills-table td {
            padding: 1.5px 0;
            vertical-align: top;
        }

        .skill-cat {
            width: 24%;
            font-weight: 700;
            color: #0f172a;
        }

        .skill-list {
            width: 76%;
            color: #334155;
        }

        .skill-list strong {
            color: #0f172a;
        }

        /* EXPERIENCE ENTRIES */
        .item {
            margin-bottom: 6px;
            page-break-inside: avoid;
            break-inside: avoid;
        }

        .item-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 1px;
        }

        .item-title {
            font-size: 9.1pt;
            font-weight: 700;
            color: #0f172a;
        }

        .item-company {
            font-weight: 700;
            color: #b45309;
        }

        .item-date {
            font-size: 8pt;
            font-weight: 600;
            color: #475569;
            white-space: nowrap;
        }

        .item-sub {
            font-size: 7.9pt;
            color: #64748b;
            font-style: italic;
            margin-bottom: 2px;
        }

        .bullet-list {
            margin: 0;
            padding-left: 14px;
        }

        .bullet-list li {
            font-size: 8.4pt;
            color: #334155;
            line-height: 1.34;
            margin-bottom: 1.5px;
        }

        .bullet-list li strong {
            color: #0f172a;
        }

        /* EDUCATION & SCORES */
        .edu-item {
            margin-bottom: 5px;
            page-break-inside: avoid;
            break-inside: avoid;
        }

        .scores-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2.5px 8px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-left: 3px solid #b45309;
            border-radius: 3px;
            padding: 4px 8px;
            margin-top: 3px;
            font-size: 8pt;
            color: #334155;
        }

        .scores-grid strong {
            color: #b45309;
        }

        /* TWO COLUMN FOOTER */
        .two-col {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
            page-break-inside: avoid;
            break-inside: avoid;
        }
    </style>
</head>
<body>

    <!-- ==================== PAGE 1 ==================== -->
    <div class="header">
        <div class="header-left">
            <h1 class="name">Sibongakonke Simamane</h1>
            <div class="title-line">Full-Stack Systems Developer &bull; AWS Cloud Consultant &bull; Systems Analyst</div>
            <div class="contact-grid">
                <span class="contact-item">🌐 <a href="https://sibongakonke-simamane.dev" target="_blank">sibongakonke-simamane.dev</a></span>
                <span class="contact-item">✉️ <a href="mailto:simangalisoblessed@gmail.com">simangalisoblessed@gmail.com</a></span>
                <span class="contact-item">📞 <span>074 357 2309</span></span>
                <span class="contact-item">📍 <span>Durban, South Africa</span></span>
                <span class="contact-item">💻 <a href="https://github.com/sivuhsGorha" target="_blank">github.com/sivuhsGorha</a></span>
                <span class="contact-item">🔗 <a href="https://www.linkedin.com/in/sibongakonke-simamane-371ba7236" target="_blank">linkedin.com/in/sibongakonke-simamane</a></span>
            </div>
        </div>
        <div class="header-badge">
            <div class="badge-title">BOSTON DIPLOMA</div>
            <div class="badge-dist">76% Distinction</div>
            <div class="badge-sub">HDIPSD2 &bull; Confirmed 2026</div>
        </div>
    </div>

    <!-- PROFILE -->
    <div class="section">
        <div class="section-title"><span class="slash">//</span> Professional Profile</div>
        <p class="summary-text">
            Technically versatile, distinction-level <strong>Systems Development Graduate</strong> currently employed as a Junior Systems Developer & Cloud Engineer at <strong>Future ProTechY (PTY) LTD</strong>. Holds a confirmed Higher Diploma in Systems Development (HDIPSD2) from Boston City Campus with an overall <strong>76% Distinction average</strong>, alongside <strong>CompTIA A+</strong> certification and <strong>CompTIA Security+</strong> foundations. Experienced across the full software engineering lifecycle — designing and deploying production <strong>Amazon Web Services (AWS)</strong> cloud infrastructure (VPC, EC2, ALB, CI/CD), architecting robust backend APIs (Java, PHP, Node.js, MySQL), building modern reactive frontends (JavaScript/TypeScript, React, Astro), and enforcing strict cybersecurity standards.
        </p>
    </div>

    <!-- TECHNICAL SKILLS -->
    <div class="section">
        <div class="section-title"><span class="slash">//</span> Technical Competencies</div>
        <table class="skills-table">
            <tr>
                <td class="skill-cat">Core Languages:</td>
                <td class="skill-list"><strong>Java</strong>, <strong>PHP</strong>, <strong>JavaScript (ES6+)</strong>, <strong>TypeScript</strong>, C, HTML5, CSS3 / Tailwind</td>
            </tr>
            <tr>
                <td class="skill-cat">Cloud & DevOps:</td>
                <td class="skill-list"><strong>AWS (VPC, EC2, ALB, Route 53)</strong>, <strong>Docker</strong>, <strong>GitHub Actions CI/CD</strong>, Linux, Nginx, SSL/TLS</td>
            </tr>
            <tr>
                <td class="skill-cat">Databases & Architecture:</td>
                <td class="skill-list"><strong>MySQL</strong> (3NF Relational Schema, Sub-second Indexing), MS SQL Server, <strong>RESTful APIs</strong></td>
            </tr>
            <tr>
                <td class="skill-cat">Frontend Frameworks:</td>
                <td class="skill-list"><strong>React.js</strong>, <strong>Astro</strong>, Vue.js, Responsive UI/UX Architecture, Single Page Applications</td>
            </tr>
            <tr>
                <td class="skill-cat">Security & Networking:</td>
                <td class="skill-list"><strong>CompTIA A+ (2024)</strong>, <strong>CompTIA Security+</strong>, Ethical Hacking Basics, Subnet Isolation, Structured Cabling</td>
            </tr>
            <tr>
                <td class="skill-cat">Methodologies & Tools:</td>
                <td class="skill-list">Agile / Scrum, Software Testing (TDD/Unit), Business Process Management (BPM), Git/GitHub, AI Automation</td>
            </tr>
        </table>
    </div>

    <!-- WORK EXPERIENCE -->
    <div class="section">
        <div class="section-title"><span class="slash">//</span> Professional Work Experience</div>

        <!-- Job 1 -->
        <div class="item">
            <div class="item-header">
                <span class="item-title">Junior Systems Developer & Cloud Engineer &bull; <span class="item-company">Future ProTechY (PTY) LTD</span></span>
                <span class="item-date">May 2026 – Present</span>
            </div>
            <div class="item-sub">Durban, KwaZulu-Natal &bull; Full-time</div>
            <ul class="bullet-list">
                <li>Actively architecting, configuring, and maintaining production cloud infrastructure on <strong>Amazon Web Services (AWS)</strong> — configuring isolated VPC topologies, public/private subnets, security groups, and <strong>EC2 compute instances</strong> hosting live applications.</li>
                <li>Designing, automating, and maintaining <strong>CI/CD pipelines</strong> using GitHub Actions for automated zero-downtime application deployments.</li>
                <li>Developing robust full-stack applications and backend services using <strong>Java, PHP, JavaScript, and MySQL</strong> supporting high-volume financial services systems.</li>
                <li>Managing application performance, server health monitoring, reverse proxy configurations (Nginx), and infrastructure security under strict operational standards.</li>
            </ul>
        </div>

        <!-- Job 2 -->
        <div class="item">
            <div class="item-header">
                <span class="item-title">Fiber Installation Technician & Administrator &bull; <span class="item-company">Babicon (PTY) LTD</span></span>
                <span class="item-date">Mar 2026 – May 2026</span>
            </div>
            <div class="item-sub">Durban, KwaZulu-Natal &bull; Field Operations & Technical Administration</div>
            <ul class="bullet-list">
                <li>Performed fiber optic network installations, termination, and routing configurations at client premises across the Durban metropolitan area.</li>
                <li>Handled key administrative functions including project documentation, client sign-offs, reporting, and operational task coordination.</li>
                <li>Balanced technical field deployments with office-based records management, ensuring compliance with ISP service level standards.</li>
                <li>Gained direct hands-on experience in physical network infrastructure, structured cabling, optical testing, and telecommunications deployment.</li>
            </ul>
        </div>

        <!-- Job 3 -->
        <div class="item">
            <div class="item-header">
                <span class="item-title">Part-Time Systems Technician &bull; <span class="item-company">Inguni Shield</span></span>
                <span class="item-date">Feb 2025 – Jan 2026</span>
            </div>
            <div class="item-sub">Durban, KwaZulu-Natal &bull; Part-time Systems Support</div>
            <ul class="bullet-list">
                <li>Performed comprehensive system configurations, programming, and hardware/software installations across diverse client operating environments.</li>
                <li>Maintained and debugged codebase routines in <strong>C and Java</strong> within a live technical support and systems implementation setting.</li>
                <li>Developed and deployed static web solutions utilizing modern JavaScript tooling and component frameworks (Astro).</li>
                <li>Delivered responsive technical diagnostics, hardware upgrades, and routine software maintenance for commercial clients.</li>
            </ul>
        </div>
    </div>

    <!-- ==================== PAGE 2 ==================== -->
    <div class="page-break"></div>

    <div class="section" style="padding-top: 4px;">
        <div class="section-title"><span class="slash">//</span> Professional Work Experience (Continued)</div>

        <!-- Job 4 -->
        <div class="item">
            <div class="item-header">
                <span class="item-title">EA Group Leader — BEEI Phase V &bull; <span class="item-company">Zubane Primary School</span></span>
                <span class="item-date">June 2025 – Nov 2025</span>
            </div>
            <div class="item-sub">Ndwedwe, KwaZulu-Natal &bull; Leadership & Programme Coordination</div>
            <ul class="bullet-list">
                <li>Led a team of Education Assistants across daily attendance tracking, task delivery, curriculum support, and compliance reporting.</li>
                <li>Acted as primary liaison between government programme coordinators, school executive management, and team members.</li>
                <li>Spearheaded onboarding, technical guidance, workflow optimization, and performance monitoring of newly appointed assistants.</li>
            </ul>
        </div>

        <!-- Job 5 -->
        <div class="item">
            <div class="item-header">
                <span class="item-title">Education Assistant &bull; <span class="item-company">KZN Department of Basic Education</span></span>
                <span class="item-date">June 2025 – Nov 2025</span>
            </div>
            <div class="item-sub">Ndwedwe, KwaZulu-Natal &bull; Government Youth Employment Programme</div>
            <ul class="bullet-list">
                <li>Managed electronic data capturing, records management, and statutory reporting with a verified 100% accuracy and zero discrepancy rate.</li>
                <li>Handled confidential administrative files and student information with full compliance and strict adherence to POPIA privacy guidelines.</li>
                <li>Coordinated daily communication workflows between educational staff, administrative leadership, and external regional stakeholders.</li>
                <li>Provided comprehensive technical and administrative support to guarantee smooth daily operational delivery.</li>
            </ul>
        </div>
    </div>

    <!-- FEATURED PROJECTS -->
    <div class="section">
        <div class="section-title"><span class="slash">//</span> Featured Production Projects</div>

        <div class="item">
            <div class="item-header">
                <span class="item-title">Asante Financial Services Website & Online Loan Platform &bull; <a href="https://asantefs.co.za" target="_blank">asantefs.co.za</a></span>
                <span class="item-date">2026</span>
            </div>
            <div class="item-sub">Production Financial Platform &bull; Stack: PHP, MySQL, JavaScript, HTML5, CSS3, Apache</div>
            <ul class="bullet-list">
                <li>Architected and delivered the full customer portal and business website for Asante Financial Services, a regulated short-term personal finance provider in South Africa.</li>
                <li>Engineered a dynamic, database-driven loan application engine featuring multi-step form validation, online document submission, and automated backend record processing.</li>
                <li>Implemented secure customer data handling, defense-in-depth input sanitization, and administrative management workflows complying with financial regulations.</li>
                <li>Independently managed the entire lifecycle from requirements discovery and relational schema modeling to live production server deployment.</li>
            </ul>
        </div>

        <div class="item">
            <div class="item-header">
                <span class="item-title">Production AWS Cloud Infrastructure & Automated CI/CD Pipeline</span>
                <span class="item-date">2026</span>
            </div>
            <div class="item-sub">Cloud Architecture & DevOps &bull; Stack: AWS (VPC, EC2, ALB, Route 53), Docker, GitHub Actions, Linux, Nginx</div>
            <ul class="bullet-list">
                <li>Designed isolated VPC topologies with segregated public and private subnets, internet gateways, NAT gateways, and custom security groups.</li>
                <li>Provisioned EC2 compute instances behind an Application Load Balancer (ALB) with automated SSL/TLS termination and health check monitoring.</li>
                <li>Configured automated GitHub Actions CI/CD workflows executing automated linting, test suites, and zero-downtime containerized deployments.</li>
            </ul>
        </div>

        <div class="item">
            <div class="item-header">
                <span class="item-title">Secure Financial Transaction & Processing Backend Engine</span>
                <span class="item-date">2026</span>
            </div>
            <div class="item-sub">Backend Architecture &bull; Stack: Java, PHP, MySQL, RESTful APIs, CompTIA Security+ Standards</div>
            <ul class="bullet-list">
                <li>Engineered a robust, transactional backend engine designed for processing high-integrity customer records, loan submissions, and verification workflows.</li>
                <li>Structured a 3NF normalized relational schema in MySQL with strict referential constraints, indexing for sub-second queries, and automated audit logging.</li>
            </ul>
        </div>
    </div>

    <!-- EDUCATION & CERTIFICATIONS -->
    <div class="section">
        <div class="section-title"><span class="slash">//</span> Education & Certifications</div>

        <div class="edu-item">
            <div class="item-header">
                <span class="item-title">Diploma in Systems Development (HDIPSD2) &bull; <span class="item-company">Boston City Campus</span></span>
                <span class="item-date">2023 – 2026</span>
            </div>
            <div class="item-sub">
                <strong style="color: #b45309;">Graduated with Distinction (76% Overall Average)</strong> &bull; Confirmed by Office of the Registrar (April 2026)
            </div>
            <div class="scores-grid">
                <div>Systems Analysis & Design: <strong>90%</strong></div>
                <div>Praxis (Applied Systems): <strong>92%</strong></div>
                <div>Security+ Fundamentals: <strong>88%</strong></div>
                <div>Software Testing: <strong>86%</strong></div>
                <div>Java & Database Systems: <strong>86%</strong></div>
                <div>Computer Literacy: <strong>Distinction</strong></div>
            </div>
        </div>

        <div class="edu-item" style="margin-top: 6px;">
            <div class="item-header">
                <span class="item-title">CompTIA A+ &bull; <span class="item-company">CompTIA International Certification</span></span>
                <span class="item-date">Certified 2024</span>
            </div>
            <div class="item-sub">Industry credential verifying core IT operational roles, hardware, operating systems, and networking security.</div>
        </div>

        <div class="edu-item" style="margin-top: 6px;">
            <div class="item-header">
                <span class="item-title">National Senior Certificate &bull; <span class="item-company">Nombika High School</span></span>
                <span class="item-date">Completed 2019</span>
            </div>
        </div>
    </div>

    <!-- TWO COLUMN: LANGUAGES & INTERESTS -->
    <div class="two-col" style="margin-top: 6px;">
        <div class="section" style="margin-bottom: 0;">
            <div class="section-title"><span class="slash">//</span> Languages</div>
            <ul class="bullet-list">
                <li><strong>isiZulu:</strong> Home Language (Native / Fluent)</li>
                <li><strong>English:</strong> Professional Working Proficiency (Fluent)</li>
            </ul>
        </div>

        <div class="section" style="margin-bottom: 0;">
            <div class="section-title"><span class="slash">//</span> Focus & Interests</div>
            <ul class="bullet-list">
                <li>AWS Cloud Architecture, Containerization & CI/CD Pipelines</li>
                <li>Cybersecurity, Ethical Hacking & Secure Code Standards</li>
                <li>Emerging AI Developer Tooling & FinTech Systems</li>
            </ul>
        </div>
    </div>

</body>
</html>`;

const tempHtmlPath = join(root, 'temp_cv_render.html');
const targetPdfPublic = join(root, 'public', 'Sibongakonke_Simamane_CV.pdf');
const targetPdfRoot = join(root, 'Sibongakonke_Simamane_CV.pdf');

writeFileSync(tempHtmlPath, cvHtml, 'utf8');

const edgeExe = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

console.log('Rendering PDF using Microsoft Edge headless...');
try {
    const cmd = `"${edgeExe}" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="${targetPdfPublic}" "${tempHtmlPath}"`;
    execSync(cmd, { stdio: 'inherit' });
    console.log(`Generated PDF at ${targetPdfPublic}`);
    
    // Copy to root as well
    copyFileSync(targetPdfPublic, targetPdfRoot);
    console.log(`Copied PDF to ${targetPdfRoot}`);
} catch (err) {
    console.error('Error generating PDF:', err);
} finally {
    if (existsSync(tempHtmlPath)) {
        unlinkSync(tempHtmlPath);
    }
}
