import Image from 'next/image'

export default function Loggan() {
    return (
        <div className="flex flex-row items-center">
        <Image className="log" src='/LCubelogo_transp_liten.gif' alt="Företags loggan, tre svarta L" width={80}
            height={80} />
            <p className="font-bold text-4xl navbar__item">LCube</p>
        </div>
    )
}