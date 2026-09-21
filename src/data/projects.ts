export type Project = {
    id: string;
    title: string;
    summary: string;
    stack: string[];
    repoUrl: string;
    liveUrl?: string;
    badge?: string;
    client?: string;
    deliverables?: string[];
};

export const projects: Project[] = [
    {
        id: 'P.01',
        title: 'Asante Financial Services Website',
        badge: 'Client Project · Freelance Delivery',
        client: 'Asante Financial Services (PTY) LTD',
        summary:
            'Designed and developed the complete business website and online loan portal for Asante Financial Services — a South African short-term personal loans provider. Engineered a dynamic, database-driven loan application platform with secure customer data submission, input sanitization, and administrative management using PHP, MySQL, and responsive HTML/CSS. Delivered the entire project independently end-to-end: from initial requirements analysis and UX design through to production server deployment and testing.',
        stack: ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'CSS3', 'Apache'],
        deliverables: [
            'Dynamic multi-step loan application platform',
            'Secure MySQL database schema & query architecture',
            'Mobile-responsive layout optimized for borrower conversion',
            'End-to-end client consultation & production deployment'
        ],
        repoUrl: 'https://github.com/sivuhsGorha',
        liveUrl: 'https://asantefs.co.za',
    },
    {
        id: 'P.02',
        title: 'Production AWS Cloud Infrastructure & Automated CI/CD Pipeline',
        badge: 'Cloud Architecture · Systems Engineering',
        client: 'Future ProTechY / Enterprise Deployment',
        summary:
            'Architected and implemented production-grade cloud infrastructure on Amazon Web Services (AWS) engineered for high availability, network isolation, and automated delivery. Designed isolated VPC topologies with segregated public and private subnets, internet gateways, NAT gateways, and custom route tables. Provisioned EC2 compute instances hosting mission-critical services behind an Application Load Balancer (ALB) with automated SSL/TLS termination, coupled with GitHub Actions CI/CD pipelines for automated zero-downtime deployments.',
        stack: ['AWS VPC', 'AWS EC2', 'Application Load Balancer', 'Route 53', 'Docker', 'CI/CD Pipelines', 'Linux', 'Nginx'],
        deliverables: [
            'Isolated VPC architecture with public/private subnet zoning & security groups',
            'EC2 instance provisioning, system hardening & Nginx reverse proxy tuning',
            'Automated CI/CD build, test & zero-downtime deployment pipelines',
            'Health-check routing, SSL/TLS termination & automated system monitoring'
        ],
        repoUrl: 'https://github.com/sivuhsGorha',
    },
    {
        id: 'P.03',
        title: 'Secure Financial Transaction & Application Processing Backend',
        badge: 'Backend Architecture · Database Engineering',
        client: 'FinTech Systems Architecture',
        summary:
            'Engineered a robust, transactional backend engine designed for processing high-integrity customer financial records, loan applications, and document submissions. Structured a 3NF normalized relational schema in MySQL with strict referential constraints, indexing for sub-second query latency, and defensive input sanitization compliant with data protection standards. Implemented RESTful API endpoints handling state transitions, idempotent updates, and secure administrative reporting.',
        stack: ['Java', 'PHP', 'MySQL', 'RESTful APIs', 'Database Indexing', 'CompTIA Security+'],
        deliverables: [
            'Normalized 3NF relational schema with data validation & indexing',
            'Idempotent API handlers preventing race conditions & double submissions',
            'Defense-in-depth sanitization adhering to CompTIA Security+ standards',
            'Audit logging & administrative export workflows for compliance'
        ],
        repoUrl: 'https://github.com/sivuhsGorha',
    },
];
