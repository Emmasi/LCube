import Komments from '../components/shared/treBox'
import Image from 'next/image'
import Header from '../components/shared/rubrik'
import Data from '../data/data.json'

export default function Contact() {
    const pageData = Data.contakt

    return (
        <>
            <Header heading={pageData.heading} />
            <section className="w-11/12 md:w-3/6 flex flex-col md:flex-row items-center justify-around">
                <div>
                    <p className="text-lg pt-3">{pageData.subheading}</p>
                    {pageData.text.map((text)=>(
                        <p className="text-base pt-3">{text}</p>
                    ))}
                </div>
                <div>
                    <Image src='/LCubelogo_transp.gif' alt="Företags loggan, tre svarta L" width={100} height={100} />
                </div>
            </section>
            <section className="mt-24">
            <Komments text={pageData.comment} class={"comments"}/>
            </section>
        </>
    )
}