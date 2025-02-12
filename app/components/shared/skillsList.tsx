interface Skills {
    "heading": string,
    "text": string,
    "list"?: string[]
}

interface TextProps {
    skills: Skills[];
}

export default function skillsList(props: TextProps) {

    return (
        <section className="max-w-screen-xl mx-auto px-4 mb-40">
          <div className="flex flex-col md:flex-row gap-8">
            {props.skills.map((skill, index) => (
              <div key={index} className="w-full md:w-1/3 px-4">
                <h4 className="text-lg font-bold mb-2">{skill.heading}</h4>
                <p className="mb-4">{skill.text}</p>
                {skill.list && (
                  <ul className="list-disc list-inside mt-2">
                    {skill.list.map((item, i) => (
                      <li key={i} className="text-sm">{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      );
}