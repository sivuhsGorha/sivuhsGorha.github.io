export interface TechBadge {
    name: string;
    badgeUrl: string;
    brandColor: string;
    textColor?: 'white' | 'black';
    logo?: string;
    note?: string;
}

export interface TechCategory {
    id: string;
    title: string;
    filterGroup: 'languages' | 'frontend_backend' | 'devops_cloud' | 'databases' | 'security_network' | 'process_ai';
    description?: string;
    badges: TechBadge[];
    bullets?: string[];
    image: string;
    alt: string;
}

export const techCategories: TechCategory[] = [
    {
        id: 'languages',
        title: 'Languages',
        filterGroup: 'languages',
        description: 'What I write code in.',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&auto=format&fit=crop&q=80',
        alt: 'Dark code editor with syntax highlighting',
        badges: [
            {
                name: 'Java',
                badgeUrl: 'https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white',
                brandColor: '#ED8B00',
                textColor: 'white',
                logo: 'openjdk',
                note: 'Backend services'
            },
            {
                name: 'PHP',
                badgeUrl: 'https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white',
                brandColor: '#777BB4',
                textColor: 'white',
                logo: 'php',
                note: 'Web backends; the Asante platform'
            },
            {
                name: 'JavaScript',
                badgeUrl: 'https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black',
                brandColor: '#F7DF1E',
                textColor: 'black',
                logo: 'javascript',
                note: 'Browser and Node'
            },
            {
                name: 'C',
                badgeUrl: 'https://img.shields.io/badge/C-A8B9CC?style=for-the-badge&logo=c&logoColor=black',
                brandColor: '#A8B9CC',
                textColor: 'black',
                logo: 'c',
                note: 'Systems programming basics'
            },
            {
                name: 'HTML5',
                badgeUrl: 'https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white',
                brandColor: '#E34F26',
                textColor: 'white',
                logo: 'html5',
                note: 'Semantic markup'
            },
            {
                name: 'CSS3',
                badgeUrl: 'https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white',
                brandColor: '#1572B6',
                textColor: 'white',
                logo: 'css3',
                note: 'Responsive layouts'
            }
        ]
    },
    {
        id: 'frontend-frameworks',
        title: 'Frontend Frameworks & Static Sites',
        filterGroup: 'frontend_backend',
        description: 'Component UI and static sites.',
        image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=900&auto=format&fit=crop&q=80',
        alt: 'Dark minimal UI design layout',
        badges: [
            {
                name: 'React',
                badgeUrl: 'https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black',
                brandColor: '#61DAFB',
                textColor: 'black',
                logo: 'react',
                note: 'Component UIs'
            },
            {
                name: 'Astro',
                badgeUrl: 'https://img.shields.io/badge/Astro-BC52EE?style=for-the-badge&logo=astro&logoColor=white',
                brandColor: '#BC52EE',
                textColor: 'white',
                logo: 'astro',
                note: 'Static sites; this one'
            }
        ]
    },
    {
        id: 'backend-runtime',
        title: 'Backend Runtime',
        filterGroup: 'frontend_backend',
        description: 'Server-side JavaScript for APIs and tooling.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&auto=format&fit=crop&q=80',
        alt: 'Dark server infrastructure and backend runtime',
        badges: [
            {
                name: 'Node.js',
                badgeUrl: 'https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white',
                brandColor: '#339933',
                textColor: 'white',
                logo: 'nodedotjs',
                note: 'APIs and tooling'
            }
        ]
    },
    {
        id: 'databases',
        title: 'Databases & Storage',
        filterGroup: 'databases',
        description: 'Schema design and query work.',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&auto=format&fit=crop&q=80',
        alt: 'Dark server matrix and database storage',
        badges: [
            {
                name: 'MySQL',
                badgeUrl: 'https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white',
                brandColor: '#4479A1',
                textColor: 'white',
                logo: 'mysql',
                note: 'Schema design and indexing'
            },
            {
                name: 'Microsoft SQL Server',
                badgeUrl: 'https://img.shields.io/badge/SQL_Server-CC2927?style=for-the-badge&logo=microsoftsqlserver&logoColor=white',
                brandColor: '#CC2927',
                textColor: 'white',
                logo: 'microsoftsqlserver',
                note: 'T-SQL and stored procedures'
            }
        ]
    },
    {
        id: 'devops-cloud',
        title: 'Infrastructure & DevOps',
        filterGroup: 'devops_cloud',
        description: 'Containers, reverse proxies and AWS hosting.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&auto=format&fit=crop&q=80',
        alt: 'Dark server infrastructure and container network',
        badges: [
            {
                name: 'Docker',
                badgeUrl: 'https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white',
                brandColor: '#2496ED',
                textColor: 'white',
                logo: 'docker',
                note: 'Multi-stage builds'
            },
            {
                name: 'Nginx',
                badgeUrl: 'https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white',
                brandColor: '#009639',
                textColor: 'white',
                logo: 'nginx',
                note: 'Reverse proxy and TLS'
            },
            {
                name: 'AWS',
                badgeUrl: 'https://img.shields.io/badge/AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white',
                brandColor: '#FF9900',
                textColor: 'white',
                logo: 'amazonaws',
                note: 'VPC, EC2, CI/CD at work; still learning'
            }
        ],
        bullets: [
            'AWS VPC: subnets, route tables and security groups',
            'AWS EC2 (Compute instance setup & Linux administration in a professional setting)',
            'CI/CD Pipelines using GitHub Actions & Docker (actively building proficiency)',
            'AWS ALB and Route 53 (used at work, not yet set up alone)'
        ]
    },
    {
        id: 'mobile',
        title: 'Mobile Development',
        filterGroup: 'frontend_backend',
        description: 'Android.',
        image: 'https://images.unsplash.com/photo-1526406915894-7bcd65f60845?w=900&auto=format&fit=crop&q=80',
        alt: 'Dark minimal mobile tech interface',
        badges: [
            {
                name: 'Android',
                badgeUrl: 'https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white',
                brandColor: '#3DDC84',
                textColor: 'white',
                logo: 'android',
                note: 'Native apps'
            }
        ]
    },
    {
        id: 'security-certifications',
        title: 'Security & Certifications',
        filterGroup: 'security_network',
        description: 'The certifications and what they cover.',
        image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=900&auto=format&fit=crop&q=80',
        alt: 'Dark cybersecurity matrix and encryption mesh',
        badges: [
            {
                name: 'CompTIA A+',
                badgeUrl: 'https://img.shields.io/badge/CompTIA_A%2B-C8102E?style=for-the-badge&logo=comptia&logoColor=white',
                brandColor: '#C8102E',
                textColor: 'white',
                logo: 'comptia',
                note: 'Certified 2024'
            },
            {
                name: 'CompTIA Security+',
                badgeUrl: 'https://img.shields.io/badge/CompTIA_Security%2B-C8102E?style=for-the-badge&logo=comptia&logoColor=white',
                brandColor: '#C8102E',
                textColor: 'white',
                logo: 'comptia',
                note: 'Threats, cryptography, risk'
            }
        ],
        bullets: [
            'Ethical hacking fundamentals and vulnerability assessment',
            'Defensive security principles, access control & data protection'
        ]
    },
    {
        id: 'networking',
        title: 'Networking & Infrastructure',
        filterGroup: 'security_network',
        description: 'From the fibre installation work.',
        image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=900&auto=format&fit=crop&q=80',
        alt: 'Dark fiber optic strands and network wave',
        badges: [
            {
                name: 'Fiber & LAN',
                badgeUrl: 'https://img.shields.io/badge/Fiber_%26_LAN-0F172A?style=for-the-badge&logo=cisco&logoColor=white',
                brandColor: '#38bdf8',
                textColor: 'white',
                logo: 'cisco',
                note: 'Installation and cabling'
            }
        ],
        bullets: [
            'Fiber optic installation, splicing, and configuration',
            'LAN setup, structured cabling, and network switch deployment'
        ]
    },
    {
        id: 'business-process',
        title: 'Business & Process',
        filterGroup: 'process_ai',
        description: 'How I work with clients.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80',
        alt: 'Business analytics and agile workflow chart',
        badges: [],
        bullets: [
            'Requirements gathering and process mapping',
            'Business process management (BPM)',
            'Agile / Scrum methodology',
            'Software testing and QA',
            'Project management'
        ]
    }
];

export const filterTabs = [
    { id: 'all', label: 'All' },
    { id: 'languages', label: 'Languages' },
    { id: 'frontend_backend', label: 'Frontend & Backend' },
    { id: 'devops_cloud', label: 'DevOps & Cloud' },
    { id: 'databases', label: 'Databases' },
    { id: 'security_network', label: 'Security & Network' },
    { id: 'process_ai', label: 'Process' }
] as const;
