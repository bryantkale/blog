import FolderContainer from '../components/folderContainer/FolderContainer';

export default function Resume() {
    return (
        <FolderContainer label="Resume" variant="tan" className="max-w-none">
            <article
                className="space-y-8 text-sm leading-relaxed"
                style={{ fontFamily: 'termina, sans-serif' }}
            >
                <section className="space-y-4">
                    <div className="space-y-2">
                        <h3 className="text-base font-semibold">Capital One/Discover</h3>
                        <p>Principal Associate Engineer | Remote, New York | Dec 2023 - Present</p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>Orchestrated the migration of services from Instana to Datadog, optimizing application performance and enhancing the customer experience.</li>
                            <li>Directed cross-functional effort to replace legacy code with a responsive, user-friendly interface for agent feedback and complaints.</li>
                            <li>Created a micro-frontend architecture that supported seamless CI/CD workflows, allowing the team to build and deploy independently.</li>
                            <li>Collaborated with stakeholders to gather requirements, create user stories, and develop project backlogs for upcoming initiatives.</li>
                            <li>Facilitated biweekly engineering sessions to support knowledge sharing and skill development among colleagues.</li>
                        </ul>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-base font-semibold">Zipcar</h3>
                        <p>Software Engineer II | Remote, Boston | Feb 2023 - Oct 2023</p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>Introduced a Storybook-driven custom component library to improve cross-team collaboration and reduce UI redundancy in development workflows.</li>
                            <li>Engineered offline mode support in the Zipcar checklist application, ensuring field agents can operate effectively in low-connectivity environments.</li>
                            <li>Advocated for the implementation of Snyk to address and resolve all critical and medium system vulnerabilities for the Vision product organization.</li>
                            <li>Led the migration to Node 14 across multiple repositories, beginning a large-scale DevOps transition.</li>
                        </ul>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-base font-semibold">Legitimate Tech</h3>
                        <p>Software Engineer | Remote, Boston | Jan 2022 - Aug 2022</p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>Built a bidding platform using React, GraphQL, and NestJS, catering to both web3 and non-web3 creatives.</li>
                            <li>Applied Atomic Design principles to create a structured interface design system in React.</li>
                            <li>Implemented a REST API in Ruby to validate encrypted codes from NFC chips.</li>
                            <li>Boosted test coverage by 70% across the platform through the implementation of integration and unit tests.</li>
                        </ul>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-base font-semibold">Fidelity Investments</h3>
                        <p>Software Engineer | Boston, Massachusetts | June 2019 - Dec 2021</p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>Provided leadership and technical direction for customized components within internal applications.</li>
                            <li>Developed personalized applications to aid project managers in performing their jobs more efficiently.</li>
                        </ul>
                    </div>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-bold uppercase tracking-[0.08em]">Education</h2>
                    <p>Bachelor of Arts in Computer Science and Studio Art</p>
                    <p>Grinnell College, Grinnell, Iowa | 2015 - 2019</p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-bold uppercase tracking-[0.08em]">Skills</h2>
                    <p>
                        <strong>Frameworks:</strong> Spring Boot, Ruby on Rails, Material UI, AngularJS, Angular Material, React, React Native, NestJS, Storybook, Playwright
                    </p>
                    <p>
                        <strong>Editors:</strong> IntelliJ IDEA, Eclipse, Visual Studio Code, Git, PyCharm
                    </p>
                    <p>
                        <strong>Languages:</strong> Java, C, JavaScript, TypeScript, HTML5, Scheme/Lisp, Python, Ruby, Apollo GraphQL, Solidity, Elixir, SQL, Node.js
                    </p>
                </section>
            </article>
        </FolderContainer>
    );
}
