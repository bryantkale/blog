import FolderContainer from '../components/folderContainer/FolderContainer';

type ResumeEntry = {
    company: string;
    title: string;
    location: string;
    period: string;
    accomplishments: string[];
};

type SkillGroup = {
    label: string;
    items: string[];
};

type EducationEntry = {
    degree: string;
    institution: string;
    period: string;
};

const EXPERIENCE: ResumeEntry[] = [
    {
        company: 'Capital One/Discover',
        title: 'Principal Associate Engineer',
        location: 'Remote, New York',
        period: 'Dec 2023 - July 2026',
        accomplishments: [
            'Orchestrated the migration of services from Instana to Datadog, optimizing application performance and enhancing the customer experience.',
            'Directed cross-functional effort to replace legacy code with a responsive, user-friendly interface for agent feedback and complaints.',
            'Created a micro-frontend architecture that supported seamless CI/CD workflows, allowing the team to build and deploy independently.',
            'Collaborated with stakeholders to gather requirements, create user stories, and develop project backlogs for upcoming initiatives.',
            'Facilitated biweekly engineering sessions to support knowledge sharing and skill development among colleagues.',
        ],
    },
    {
        company: 'Zipcar',
        title: 'Software Engineer II',
        location: 'Remote, Boston',
        period: 'Feb 2023 - Oct 2023',
        accomplishments: [
            'Introduced a Storybook-driven custom component library to improve cross-team collaboration and reduce UI redundancy in development workflows.',
            'Engineered offline mode support in the Zipcar checklist application, ensuring field agents can operate effectively in low-connectivity environments.',
            'Advocated for the implementation of Snyk to address and resolve all critical and medium system vulnerabilities for the Vision product organization.',
            'Led the migration to Node 14 across multiple repositories, beginning a large-scale DevOps transition.',
        ],
    },
    {
        company: 'Legitimate Tech',
        title: 'Software Engineer',
        location: 'Remote, Boston',
        period: 'Jan 2022 - Aug 2022',
        accomplishments: [
            'Built a bidding platform using React, GraphQL, and NestJS, catering to both web3 and non-web3 creatives.',
            'Applied Atomic Design principles to create a structured interface design system in React.',
            'Implemented a REST API in Ruby to validate encrypted codes from NFC chips.',
            'Boosted test coverage by 70% across the platform through the implementation of integration and unit tests.',
        ],
    },
    {
        company: 'Fidelity Investments',
        title: 'Software Engineer',
        location: 'Boston, Massachusetts',
        period: 'June 2019 - Dec 2021',
        accomplishments: [
            'Provided leadership and technical direction for customized components within internal applications.',
            'Developed personalized applications to aid project managers in performing their jobs more efficiently.',
        ],
    },
];

const EDUCATION: EducationEntry[] = [
    {
        degree: 'Bachelor of Arts in Computer Science and Studio Art',
        institution: 'Grinnell College, Grinnell, Iowa',
        period: '2015 - 2019',
    },
];

const SKILLS: SkillGroup[] = [
    {
        label: 'Frameworks',
        items: ['Spring Boot', 'Ruby on Rails', 'Material UI', 'AngularJS', 'Angular Material', 'React', 'React Native', 'NestJS', 'Storybook', 'Playwright'],
    },
    {
        label: 'Editors',
        items: ['IntelliJ IDEA', 'Eclipse', 'Visual Studio Code', 'Git', 'PyCharm'],
    },
    {
        label: 'Languages',
        items: ['JavaScript', 'TypeScript', 'HTML5', 'Scheme/Lisp', 'Python', 'Ruby', 'Apollo GraphQL', 'Solidity', 'Elixir', 'SQL', 'Node.js'],
    },
    {
        label: 'Design Tools',
        items: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Figma', 'Canva', 'Miro'],
    },
];

export default function Resume() {
    return (
        <FolderContainer label="Resume" variant="tan" className="max-w-none">
            <article
                className="space-y-8 text-sm leading-relaxed"
                style={{ fontFamily: 'termina, sans-serif' }}
            >
                <section className="space-y-4">
                    {EXPERIENCE.map((entry) => (
                        <div key={`${entry.company}-${entry.period}`} className="space-y-2">
                            <h3 className="text-base font-semibold">{entry.company}</h3>
                            <p>{entry.title} | {entry.location} | {entry.period}</p>
                            <ul className="list-disc space-y-1 pl-5">
                                {entry.accomplishments.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-bold uppercase tracking-[0.08em]">Education</h2>
                    {EDUCATION.map((entry) => (
                        <div key={entry.institution}>
                            <p>{entry.degree}</p>
                            <p>{entry.institution} | {entry.period}</p>
                        </div>
                    ))}
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-bold uppercase tracking-[0.08em]">Skills</h2>
                    {SKILLS.map((group) => (
                        <p key={group.label}>
                            <strong>{group.label}:</strong> {group.items.join(', ')}
                        </p>
                    ))}
                </section>
            </article>
        </FolderContainer>
    );
}
