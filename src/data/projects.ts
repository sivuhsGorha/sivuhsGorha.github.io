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
];
