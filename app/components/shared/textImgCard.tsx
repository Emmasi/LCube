interface TextProps {
  introTextProps: string;
  textProps: string[];
}
export default function textImgCard(props: TextProps) {
  return (
    <section className="md:flex md:items-center max-w-screen-xl mb-10 md:mb-40 mx-auto">
      <img
        src="/dataimg.jpg"
        alt="vi får se"
        className="w-full md:max-w-lg object-cover"
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