import HeroImg from '../components/shared/heroImg'
import TextImgCard from '../components/shared/textImgCard'
import SkillsList from '../components/shared/skillsList'
import Data from '../data/data.json'
import ProjectOverview from '../components/shared/ProjectOverview'
import Breadcrum from '../components/global/Breadcrum'

export default async function Page() {
  const aboutData = Data.aboutUs
  const pageData = Data.start
  return (
    <section>
      <Breadcrum section="About" />
      <HeroImg heading={aboutData.heading} text={aboutData.text} img={aboutData.img} imgAlt={aboutData.imgAlt} />
      <TextImgCard introTextProps="Patrik" textProps={["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."]} />
      <SkillsList skills={aboutData.stycken} />
      <ProjectOverview descriptions={pageData.descriptions} heading="Uppdragsöversikt" />
    </section>
  )
}
