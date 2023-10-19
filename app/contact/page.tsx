import Komments from '../components/shared/comments'
import Image from 'next/image'
import Header from '../components/shared/rubrik'
import Data from '../data/data.json'

export default function Contact() {
    const pageData = Data.contakt

    return (
        <>
            <Header heading={pageData.heading} />
            <section className="w-11/12 md:w-3/6 mb-8 flex flex-col md:flex-row items-center justify-around">
                <div>
                    <p className="text-lg">{pageData.subheading}</p>
                    {pageData.text.map((text,i)=>(
                        <p key={i} className="text-base pt-3">{text}</p>
                    ))}
                </div>
                <div>
                    <Image src='/LCubelogo_transp.gif' alt="Företags loggan, tre svarta L" width={100} height={100} />
                </div>
            </section>
        </>
    )
}