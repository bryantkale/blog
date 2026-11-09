import { FIRST_NAME, SOCIAL_LINKS } from './data'
import { MagneticSocialLink } from './components/MagneticSocialLink/MagneticSocialLink'
import FolderContainer from './components/folderContainer/FolderContainer'

export default async function Page() {

  return (
    <main>
      <FolderContainer label="Home">
        <section>
          <p className="mb-4">
            {`I’m ${FIRST_NAME}/Carl I'm a NY-based software engineer.`}
          </p>
          <p className="mb-4">
            {`I recieved my 200 hour YTT certification in 2020 and I frequent yoga studios across Brooklyn!`}
          </p>
          <p className="mb-4">
            {`This fall, you can find me taking graphic design courses at Pratt, studying Judaism, and learning new frontend frameworks.`}
          </p>
        </section>
        <section className="mt-8">
          <h1 className="mb-5 text-center font-black">★ FIND ME ELSEWHERE ★</h1>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-1">
            {SOCIAL_LINKS.map((link) => (
              <MagneticSocialLink key={link.label} link={link.url}>
                {link.label}
              </MagneticSocialLink>
            ))}
          </div>
        </section>
      </FolderContainer>
    </main>
  )
}
