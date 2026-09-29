export type Project = {
    id: string;
    title: string;
    summary: string;
    stack: string[];
    repoUrl?: string;
    liveUrl?: string;
    badge?: string;
    client?: string;
    deliverables?: string[];
    metrics?: string[];
    architectureDiagram?: {
        nodes: { id: string; label: string; type: 'client' | 'gateway' | 'app' | 'db' | 'cloud' }[];
        flow: string;
    };
    architectureDeepDive?: {
        overview: string;
        schemaHighlights?: string;
        securityFocus?: string;
    };
};

export const projects: Project[] = [
    {
        id: 'P.01',
        title: 'Asante Financial Services Website & Application Portal',
        badge: 'Client Project · Freelance Delivery',
        client: 'Asante Financial Services (PTY) LTD',
        summary:
            'Engineered the complete business web presence and multi-step customer loan application engine for Asante Financial Services — a South African short-term personal loans provider. Designed a 3NF normalized relational schema in MySQL with indexed query paths, defensive server-side input validation, and a mobile-responsive interface optimized for borrower conversion.',
        stack: ['PHP 8.x', 'MySQL', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Apache', 'Linux'],
        metrics: [
            'Sub-15ms Query Latency',
            '3NF Relational Schema',
            'Server-Side Input Sanitization',
            '100% Mobile Responsive'
        ],
        deliverables: [
            'Dynamic multi-step loan application & customer document upload portal',
            '3NF normalized MySQL database schema with relational constraints & indexing',
            'Defensive input validation pipeline protecting against SQL injection & XSS',
            'End-to-end client consultation, production deployment & domain architecture'
        ],
        architectureDiagram: {
            nodes: [
                { id: 'client', label: 'Borrower / Web Browser', type: 'client' },
                { id: 'web', label: 'Apache Web Server / PHP 8 Core', type: 'app' },
                { id: 'db', label: 'MySQL Relational Database (3NF Schema)', type: 'db' }
            ],
            flow: 'Borrower Form → Apache/PHP Handler (Defensive Validation) → MySQL Indexed Queries'
        },
        architectureDeepDive: {
            overview: 'Structured around a clean MVC-style separation of concerns: input sanitization middleware validates incoming payload fields before passing data to parameterized MySQL statements.',
            schemaHighlights: 'Normalized tables for Borrowers, Loan Applications, and Audit Logs linked via strict foreign key constraints and composite indexes for fast retrieval.',
            securityFocus: 'All user submissions pass through htmlspecialchars sanitization, prepared statements ($stmt->bind_param), and strict file MIME-type checking for uploads.'
        },
        liveUrl: 'https://asantefs.co.za',
    },
    {
        id: 'P.02',
        title: 'Production AWS Cloud Infrastructure & Automated CI/CD Pipeline',
        badge: 'Cloud Architecture · Systems & DevOps',
        client: 'Future ProTechY / Enterprise Deployment',
        summary:
            'Hands-on practical AWS cloud infrastructure setup for high-availability application hosting. Designed isolated Virtual Private Cloud (VPC) subnets, security group rules, EC2 compute instances with Nginx reverse proxies, and automated GitHub Actions CI/CD workflows for seamless code deployment.',
        stack: ['AWS VPC', 'AWS EC2', 'Application Load Balancer', 'Route 53', 'Docker', 'GitHub Actions', 'Linux', 'Nginx'],
        metrics: [
            'Multi-Subnet VPC Zoning',
            'Zero-Downtime Deployments',
            'Strict Security Group Rules',
            'Nginx Reverse Proxy Tuning'
        ],
        deliverables: [
            'Isolated VPC architecture with public/private subnet zoning & NAT gateway routing',
            'EC2 instance provisioning, system hardening, SSH key rotation & Nginx reverse proxy',
            'Automated CI/CD build, test & deployment pipeline triggered via GitHub Actions',
            'Route 53 DNS routing, ACM SSL/TLS certificate termination & automated health checks'
        ],
        architectureDiagram: {
            nodes: [
                { id: 'dns', label: 'Route 53 / SSL Gateway', type: 'cloud' },
                { id: 'alb', label: 'Application Load Balancer', type: 'gateway' },
                { id: 'ec2', label: 'EC2 Instances (Docker Container Clusters)', type: 'app' }
            ],
            flow: 'User Request → Route 53 DNS → ALB SSL Termination → EC2 Docker Containers'
        },
        architectureDeepDive: {
            overview: 'Built using AWS infrastructure best practices with clear separation between public-facing entrypoints and internal compute nodes.',
            schemaHighlights: 'Automated GitHub Actions runner executes linting, container builds, and SSH deployment commands to update live services smoothly.',
            securityFocus: 'Strict security group rules opening port 443/80 only to ALB, and port 22 restricted exclusively to VPN/bastion access.'
        },
        repoUrl: 'https://github.com/sivuhsGorha',
    },
];
