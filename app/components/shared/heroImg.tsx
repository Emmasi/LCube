interface HeroImgProp {
  heading: string;
  subheading?: string;
  text: string[];
  img: string;
  imgAlt: string;
}
export default function HeroImg(props: HeroImgProp) {
  return (
    <section className='hero flex justify-center items-start mb-20 py-20'>
      <div className='max-w-screen-xl flex flex-col md:flex-row'>
        <div className='mr-0 p-10 md:p-0 md:mr-20'>
          <h1 className='text-2xl md:mt-0 md:text-6xl font-semibold'>{props.heading}</h1>
          <p className="text-lg">{props.subheading}</p>
          {props.text.map((text, i) => (
            <p key={i} className="text-base pt-3">{text}</p>
          ))}
        </div>
        <img src={props.img} alt={props.imgAlt} className='md:max-w-lg' />
      </div>
    </section >
  )
}