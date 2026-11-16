// Service options and the tailored questions shown in the detailed enquiry form.
export type Question = {
    label: string;
    kind: 'textarea' | 'text' | 'select';
    required?: boolean;
    options?: string[];
    hint?: string;
};

export const services: { id: string; name: string; questions: Question[] }[] = [
    {
        id: 'web',
        name: 'Full-Stack Web Application / Portal',
        questions: [
            { label: 'What business problem should this application solve, and for whom?', kind: 'textarea', required: true, hint: 'A sentence or two is sufficient.' },
            { label: 'How is this handled at present (for example spreadsheets, email, paper, or an existing system)?', kind: 'textarea' },
            { label: 'Will the system handle personal or financial information?', kind: 'select', options: ['Yes', 'No', 'Not yet determined'], hint: 'This determines the security and compliance work involved.' },
            { label: 'Is there an existing website, system or database with which it must integrate?', kind: 'textarea' },
        ],
    },
    {
        id: 'aws',
        name: 'AWS Cloud Architecture & CI/CD Pipelines',
        questions: [
            { label: 'What is currently running, and where is it hosted?', kind: 'textarea', required: true, hint: 'For example: a single server with a hosting provider, or an existing AWS environment.' },
            { label: 'What is the primary concern?', kind: 'select', options: ['Deployment speed', 'Downtime and reliability', 'Cost', 'Security', 'Starting from scratch', 'Other'] },
            { label: 'Do you have an existing AWS account?', kind: 'select', options: ['Yes', 'No', 'Not sure'] },
            { label: 'Are there compliance or security requirements that apply?', kind: 'textarea' },
        ],
    },
    {
        id: 'backend',
        name: 'Custom Backend & Database System',
        questions: [
            { label: 'What data will the system store, and approximately how much?', kind: 'textarea', required: true, hint: 'For example: customer records and transactions, with a rough volume per month.' },
            { label: 'What will read from or write to it (for example a website, a mobile application, reports, other systems)?', kind: 'text' },
            { label: 'Is this a new build, or work on an existing system?', kind: 'select', options: ['New build', 'Existing system', 'Both'] },
            { label: 'Are there existing technologies or constraints I should be aware of?', kind: 'textarea' },
        ],
    },
    {
        id: 'audit',
        name: 'Code Audit, Security & Performance',
        questions: [
            { label: 'What has prompted this review?', kind: 'select', required: true, options: ['A security incident or concern', 'A compliance requirement', 'Performance problems', 'Pre-launch assurance', 'Other'] },
            { label: 'Which technologies is the system built on?', kind: 'textarea' },
            { label: 'What level of access can you provide?', kind: 'select', options: ['Source code', 'Running system only', 'Not yet decided'] },
            { label: 'Which areas are of greatest concern?', kind: 'textarea' },
        ],
    },
    {
        id: 'contract',
        name: 'Contract Engineering / Other',
        questions: [
            { label: 'What role or responsibilities would the engagement cover?', kind: 'textarea', required: true, hint: 'For example: backend development, cloud support, or a fixed-term project.' },
            { label: 'What is the expected duration and weekly time commitment?', kind: 'text' },
            { label: 'What is the size and structure of the team I would work with?', kind: 'text' },
            { label: 'Which technologies does the team use?', kind: 'text' },
        ],
    },
];
