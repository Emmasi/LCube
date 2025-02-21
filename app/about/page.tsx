import HeroImg from '../components/shared/heroImg'
import TextImgCard from '../components/shared/textImgCard'
import SkillsList from '../components/shared/skillsList'
import Data from '../data/data.json'
import ProjectOverview from '../components/shared/ProjectOverview'
import Breadcrum from '../components/global/Breadcrum'
import img from '@/public/img/1516231435578.jpg'

export default async function Page() {
  const aboutData = Data.aboutUs
  const pageData = Data.start
  return (
    <section>
      <Breadcrum section='About' />
      <HeroImg heading={aboutData.heading} text={aboutData.text} img={aboutData.img} imgAlt={aboutData.imgAlt} />
      <TextImgCard introTextProps='Patrik' img={'/img/1516231435578.jpg'} textProps={['I work with products as Octopus deploy, Azure DevOps, Git, Splunk, SonarQube, Terraform, Packer, Consul, Kubernetes to help the DevOps process for Azure and AWS']} />
      <SkillsList skills={aboutData.stycken} />
      <ProjectOverview descriptions={pageData.descriptions} heading='Uppdragsöversikt' />
    </section>
  )
}
