interface Comment {
    "heading": string,
    "date": string,
    "text": string
}

interface TextProps {
    descriptions: Comment[];
    heading: string;
}

export default function ProjectOverview(props: TextProps) {

  return (
    <section className="max-w-screen-xl mx-auto mb-20">
      <h2 className="pb-6 md:text-2xl font-bold text-center">{props.heading}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {props.descriptions.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-start p-6 border border-gray-200 rounded-lg shadow-sm bg-[#282A36]"
          >
            <i className="fa fa-briefcase text-[#50FA7B] text-3xl mb-4"></i>
            <div>
              <h3 className="pb-2 text-base font-semibold text-[#F8F8F2]">{item.heading}</h3>
              <p className="text-xs italic text-[#FFB86C]">{item.date}</p>
              <p className="text-sm mt-4 text-[#F8F8F2]">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
  
  
      
}