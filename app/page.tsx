import Komments from './components/shared/comments'
import TextImgCard from './components/shared/textImgCard'
import DubbleBloggCards from './components/shared/dubbleBloggCards'
import Data from './data/data.json'
import Hero from './components/shared/hero'

export default function Home() {
    const pageData = Data.start


    return (
        <div>
            <Hero heading={pageData.heading} />
            <div className='flex flex-col justify-center items-center'>
                <TextImgCard introTextProps={pageData.intro} textProps={pageData.text} />
                <DubbleBloggCards />
            </div>
            <div className='hero flex flex-col justify-center items-center h-96 mb-20 text-center'>
                <h1 className='text-2xl md:mt-0 md:text-6xl font-semibold'>Frågor och svar på StackExchange och StackOverflow</h1>
                <p className='text-1xl md:text-2xl'>StackExchange</p>
                <p className='text-1xl md:text-2xl'>StackOverflow</p>
            </div>
            <div className='flex flex-col justify-center items-center mb-20'>
                <section className='my-10'>
                    <h2 className='md:text-4xl pb-6'>Kommentarer</h2>
                </section>
                <section className='max-w-screen-2xl'>
                    <Komments comments={pageData.comment} />
                </section>
            </div>
        </div>

    )
}