// Skills, grouped by area. `logo` is a file in public/icons/; `note` shows as a tooltip.
export type Skill = { name: string; logo?: string; note?: string };
export type SkillGroup = { label: string; items: Skill[] };

export const skillGroups: SkillGroup[] = [
    {
        label: 'Languages',
        items: [
            { name: 'Java', logo: 'openjdk', note: 'Backend services' },
            { name: 'PHP', logo: 'php', note: 'Web backends; the Asante platform' },
            { name: 'JavaScript', logo: 'javascript', note: 'Browser and Node' },
            { name: 'TypeScript', logo: 'javascript', note: 'This site' },
            { name: 'C', logo: 'c', note: 'Systems programming basics' },
            { name: 'HTML5', logo: 'html5' },
            { name: 'CSS3', logo: 'css' },
        ],
    },
    {
        label: 'Frontend',
        items: [
            { name: 'React', logo: 'react', note: 'Component UIs' },
            { name: 'Astro', logo: 'astro', note: 'Static sites; this one' },
            { name: 'Android', logo: 'android', note: 'Native apps' },
        ],
    },
    {
        label: 'Backend',
        items: [
            { name: 'Node.js', logo: 'nodedotjs', note: 'APIs and tooling' },
            { name: 'MySQL', logo: 'mysql', note: 'Schema design and indexing' },
            { name: 'Microsoft SQL Server', logo: 'sqlserver', note: 'T-SQL and stored procedures' },
        ],
    },
    {
        label: 'Cloud & DevOps',
        items: [
            { name: 'AWS', logo: 'aws', note: 'VPC, EC2, CI/CD at work; still learning' },
            { name: 'Docker', logo: 'docker', note: 'Multi-stage builds' },
            { name: 'Nginx', logo: 'nginx', note: 'Reverse proxy and TLS' },
            { name: 'GitHub Actions', note: 'Build and deploy pipelines' },
            { name: 'Linux', note: 'Server administration' },
        ],
    },
    {
        label: 'Security',
        items: [
            { name: 'CompTIA Security+', logo: 'comptia', note: 'Threats, cryptography, risk' },
            { name: 'CompTIA A+', logo: 'comptia', note: 'Certified 2024' },
            { name: 'Secure coding', note: 'Input validation, auth, encryption at rest' },
        ],
    },
    {
        label: 'Networking',
        items: [
            { name: 'Fibre installation', logo: 'cisco', note: 'From the Babicon work' },
            { name: 'LAN & cabling' },
            { name: 'Network configuration' },
        ],
    },
    {
        label: 'Process',
        items: [
            { name: 'Requirements analysis' },
            { name: 'Agile / Scrum' },
            { name: 'Software testing' },
            { name: 'Project management' },
        ],
    },
];
