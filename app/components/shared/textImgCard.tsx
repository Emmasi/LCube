interface TextProps {
  introTextProps:string;
  textProps: string [];
}
export default function textImgCard (props: TextProps){
  return(
    <section className='md:flex max-w-screen-xl mb-10 md:mb-40'>
      <img src='/dataimg.jpg' alt="vi får se" className='md:max-w-lg' />
      <div className="p-10 md:p-0 md:ml-20">
      <h2>{props.introTextProps}</h2>
      {props.textProps.map((text, index) => (
                    <p key={index} className='text-base'>
                        {text}
                    </p>
                ))}
      </div>
    </section>
  )
}