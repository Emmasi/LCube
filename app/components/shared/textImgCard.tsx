interface TextProps {
  introTextProps: string;
  textProps: string[];
  img: string;
}
export default function textImgCard(props: TextProps) {
  return (
    <section className="md:flex md:items-center max-w-screen-xl mb-10 md:mb-40 mx-auto">
      <img
        src={props.img}
        alt="vi får se"
        className="w-full md:w-1/2 lg:w-1/3 max-w-md object-cover rounded-lg shadow-lg"
      />
      <div className="p-10 md:p-0 md:ml-20">
        <h2 className="text-2xl font-bold mb-4">{props.introTextProps}</h2>
        <div className="space-y-4">
          {props.textProps.map((text, index) => (
            <p key={index} className="text-sm">
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}