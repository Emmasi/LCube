import ProjectOverview from './components/shared/ProjectOverview'
import TextImgCard from './components/shared/textImgCard'
import DubbleBloggCards from './components/shared/dubbleBloggCards'
import Data from './data/data.json'
import Hero from './components/shared/hero'
import Breadcrum from './components/global/Breadcrum'

export default function Home() {
    const pageData = Data.startPage
    const globalData = Data.global

    return (
        <div>
            <Breadcrum />
            <Hero heading={pageData.hero.heading} />
            <TextImgCard img={'/dataimg.jpg'} introTextProps={pageData.textCard.intro} textProps={pageData.textCard.text} />
            <DubbleBloggCards />
            <Hero heading="Frågor och svar på StackExchange och StackOverflow">
                <a href="#" className="text-base md:text-base p-4 hover:text-[#6a9955]">
                    [ StackExchange ]
                </a>
                <a href="#" className="text-base md:text-base p-4 hover:text-[#6a9955]">
                    [ StackOverflow ]
                </a>
            </Hero>
            <ProjectOverview descriptions={globalData.descriptions} heading="Uppdragsöversikt" />
        </div>
    );
}