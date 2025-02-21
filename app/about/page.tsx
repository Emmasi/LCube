import HeroImg from '../components/shared/heroImg'
import TextImgCard from '../components/shared/textImgCard'
import SkillsList from '../components/shared/skillsList'
import Data from '../data/data.json'
import ProjectOverview from '../components/shared/ProjectOverview'
import Breadcrum from '../components/global/Breadcrum'
import img from '@/public/img/1516231435578.jpg'

export default async function Page() {
  const aboutData = Data.aboutPage
  const globalData = Data.global
  return (
    <section>
      <Breadcrum section='About' />
      <HeroImg heading={aboutData.heroImg.heading} text={aboutData.heroImg.text} img={aboutData.heroImg.img} imgAlt={aboutData.heroImg.imgAlt} />
      <TextImgCard introTextProps={aboutData.Partik.heading} img={'/img/1516231435578.jpg'} textProps={aboutData.Partik.text} />
      <SkillsList skills={aboutData.skills} />
      <ProjectOverview descriptions={globalData.descriptions} heading='Uppdragsöversikt' />
    </section>
  )
}
