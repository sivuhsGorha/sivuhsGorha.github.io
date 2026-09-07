export type Project = {
    id: string;
    title: string;
    summary: string;
    stack: string[];
    repoUrl: string;
    liveUrl?: string;
};

export const projects: Project[] = [
    {
        id: 'P.01',
        title: 'Asante Financial Services Website',
        summary:
            'Designed and developed the full business website for Asante Financial Services — a South African short-term personal loans company. Built a dynamic, database-driven loan application platform with secure data handling and online submission functionality using PHP, MySQL, and HTML/CSS. Managed the full project lifecycle independently from requirements gathering through deployment.',
        stack: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
        repoUrl: 'https://github.com/sivuhsGorha',
        liveUrl: 'https://asantefs.co.za',
    },
];
