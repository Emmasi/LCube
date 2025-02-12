import ProjectOverview from './components/shared/ProjectOverview'
import TextImgCard from './components/shared/textImgCard'
import DubbleBloggCards from './components/shared/dubbleBloggCards'
import Data from './data/data.json'
import Hero from './components/shared/hero'

export default function Home() {
    const pageData = Data.start

    return (
        <div>
            <Hero heading={pageData.heading} />
            <TextImgCard introTextProps={pageData.intro} textProps={pageData.text} />
            <DubbleBloggCards />
            <Hero heading="Frågor och svar på StackExchange och StackOverflow">
                <a href="#" className="text-xl md:text-2xl p-4 hover:text-blue-600">
                    [ StackExchange ]
                </a>
                <a href="#" className="text-xl md:text-2xl p-4 hover:text-blue-600">
                    [ StackOverflow ]
                </a>
            </Hero>
            <ProjectOverview descriptions={pageData.descriptions} heading="Uppdragsöversikt" />
        </div>
    );
}