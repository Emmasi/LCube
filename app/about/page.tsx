import HeroImg from '../components/shared/heroImg'
import TextImgCard from '../components/shared/textImgCard'
import Comments from '../components/shared/skillsList'
import Data from '../data/data.json'

export default async function Page() {
  const aboutData = Data.aboutUs
  return (
    <section>
      <HeroImg heading={aboutData.heading} text={aboutData.text} img={aboutData.img} imgAlt={aboutData.imgAlt} />
      <div className='flex flex-col justify-center items-center'>
        <TextImgCard introTextProps="Patrik" textProps={["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."]} />
        <Comments skills={aboutData.stycken}/>
      </div>
    </section>
  )
}
