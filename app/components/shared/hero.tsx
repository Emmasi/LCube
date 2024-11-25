interface HeaderProps {
  heading: string;
}
export default function Hero(props: HeaderProps) {
    return (
      <div className='hero flex flex-col justify-center items-center h-96 mb-20'>
        <h1 className='text-2xl md:mt-0 md:text-6xl font-semibold'>{props.heading}</h1>
        <p className='text-1xl md:text-2xl'>Ett företag som är inriktat på DevOps</p>
      </div>
    )
}