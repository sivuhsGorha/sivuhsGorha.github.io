// Single source of truth for the CV. Used by src/pages/cv.astro (web) and
// scripts/generate-cv-pdf.mjs (PDF). Plain .mjs so both Astro and Node can import it.
// Strings may contain <strong> markup.

export const cv = {
    name: 'Sibongakonke Simamane',
    headline: 'Full-Stack Systems Developer',
    contact: {
        location: 'Durban, South Africa',
        email: 'simangalisoblessed@gmail.com',
        phone: '+27 74 357 2309',
        website: { label: 'sibongakonke-simamane.dev', url: 'https://sibongakonke-simamane.dev' },
        github: { label: 'github.com/sivuhsGorha', url: 'https://github.com/sivuhsGorha' },
        linkedin: {
            label: 'linkedin.com/in/sibongakonke-simamane',
            url: 'https://www.linkedin.com/in/sibongakonke-simamane-371ba7236',
        },
    },

    summary:
        'Junior full-stack developer with a <strong>Diploma in Systems Development (76% average, Distinction)</strong>. ' +
        'At Future ProTechY I build <strong>Java, PHP and MySQL</strong> backends for financial services systems and work hands-on with ' +
        '<strong>AWS (VPC, EC2)</strong> and <strong>GitHub Actions CI/CD</strong>. Independently delivered a production loan platform for ' +
        'Asante Financial Services with <strong>AES-256-GCM encryption of customer data, MFA and POPIA/DSAR compliance tooling</strong>. ' +
        'CompTIA A+ and Security+. Available for junior developer roles and freelance contracts.',

    skills: [
        { label: 'Languages', items: 'Java, PHP, JavaScript (ES6+), TypeScript, C, SQL, HTML5, CSS3' },
        { label: 'Frameworks', items: 'React, Astro, Node.js, Vue.js, Tailwind CSS' },
        { label: 'Databases', items: 'MySQL (3NF schema design, indexing), MS SQL Server' },
        { label: 'Cloud & DevOps', items: 'AWS (VPC, EC2, ALB, Route 53), Docker, GitHub Actions CI/CD, Linux, Nginx' },
        { label: 'Security', items: 'AES-256-GCM, RBAC, TOTP/SMS MFA, CSRF/CSP, POPIA compliance, CompTIA Security+' },
        { label: 'Practices', items: 'REST APIs, Git/GitHub, Agile/Scrum, Software Testing, Business Analysis' },
    ],

    experience: [
        {
            title: 'Junior Systems Developer & Cloud Engineer',
            company: 'Future ProTechY (PTY) LTD',
            location: 'Durban, KZN',
            dates: 'May 2026 – Present',
            bullets: [
                'Build full-stack applications and backend services in <strong>Java, PHP, JavaScript and MySQL</strong> for high-volume financial services systems.',
                'Work hands-on with <strong>AWS</strong> in a professional environment: VPCs, subnets, security groups and <strong>EC2</strong> instances hosting live applications.',
                'Maintain <strong>GitHub Actions CI/CD</strong> pipelines for automated, zero-downtime deployments.',
                'Monitor application performance and server health; configure Nginx reverse proxies and harden infrastructure.',
            ],
        },
        {
            title: 'Fiber Installation Technician & Administrator',
            company: 'Babicon (PTY) LTD',
            location: 'Durban, KZN',
            dates: 'Mar 2026 – May 2026',
            bullets: [
                'Installed, terminated and tested fiber optic connections at client sites across the Durban area.',
                'Handled project documentation, client sign-offs and reporting alongside field work.',
            ],
        },
        {
            title: 'Part-Time Systems Technician',
            company: 'Inguni Shield',
            location: 'Durban, KZN',
            dates: 'Feb 2025 – Jan 2026',
            bullets: [
                'Configured systems and installed hardware and software for commercial clients; provided technical support and diagnostics.',
                'Maintained and debugged <strong>C and Java</strong> code, and built static client websites with Astro.',
            ],
        },
        {
            title: 'EA Group Leader (BEEI Phase V) and Education Assistant',
            company: 'Zubane Primary School / KZN Dept. of Basic Education',
            location: 'Ndwedwe, KZN',
            dates: 'Jun 2025 – Nov 2025',
            bullets: [
                'Led a team of Education Assistants: attendance tracking, task delivery, onboarding and compliance reporting.',
                'Captured and reported school data with zero discrepancies, handling confidential records in line with POPIA.',
            ],
        },
    ],

    projectsTitle: 'Projects',
    projects: [
        {
            name: 'Asante Financial Services: Loan Platform',
            link: { label: 'asantefs.co.za', url: 'https://asantefs.co.za' },
            dates: '2026',
            stack: 'PHP 8, MySQL (3NF), JavaScript, Apache/Nginx, WhatsApp & WinSMS APIs',
            bullets: [
                'Designed and delivered the full customer portal and multi-step loan application engine for a South African short-term lender, working independently from requirements to production deployment.',
                'Encrypted customer PII (ID numbers, bank details, salary) with <strong>AES-256-GCM</strong>, using blind indexes so records stay searchable without storing plaintext.',
                'Built <strong>RBAC</strong> back-office tools, <strong>TOTP/SMS MFA</strong>, audit logging and <strong>POPIA/DSAR</strong> export and deletion workflows; added CSP nonces, CSRF protection and rate limiting.',
                'Wrote shell scripts for automated MySQL backups, log rotation and cron jobs.',
            ],
        },
        {
            name: 'AWS Infrastructure & CI/CD Pipeline',
            dates: '2026',
            stack: 'AWS (VPC, EC2, ALB, Route 53), Docker, GitHub Actions, Linux, Nginx',
            bullets: [
                'Set up an isolated VPC with public/private subnets and NAT routing, tight security-group rules and EC2 instances behind an Application Load Balancer.',
                'Automated build, test and deployment with GitHub Actions; configured Route 53 DNS and ACM SSL/TLS with health checks.',
            ],
        },
    ],

    education: [
        {
            title: 'Diploma in Systems Development (HDIPSD2)',
            school: 'Boston City Campus, Durban',
            dates: '2023 – 2026',
            note: 'Overall average 76%, Distinction. Diploma confirmed by the Office of the Registrar, April 2026.',
            detail: 'Top results: Praxis 92%, Systems Analysis & Design 90%, Security+ 88%, Software Testing 86%, Java & Databases 86%.',
        },
        {
            title: 'National Senior Certificate',
            school: 'Nombika High School, Ndwedwe',
            dates: '2019',
        },
    ],

    certifications: [
        { name: 'CompTIA Security+', note: '' },
        { name: 'CompTIA A+', note: '2024' },
    ],

    languages: 'isiZulu (native), English (fluent)',
};
