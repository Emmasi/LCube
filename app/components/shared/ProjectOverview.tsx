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
      <h2 className="pb-6 md:text-4xl font-bold text-center">{props.heading}</h2>
      <div className="space-y-8">
        {props.descriptions.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-start p-10 border border-gray-200 rounded-lg shadow-sm"
          >
            <i className="fa fa-briefcase text-blue-600 text-3xl md:mr-6"></i>
            <div className="mt-4 md:mt-0">
              <h3 className="pb-2 text-2xl font-semibold">{item.heading}</h3>
              <p className="text-xs italic">{item.date}</p>
              <p className="text-lg mt-4">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
  
      
}