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
        <section className='flex flex-col md:flex-row'>
            {props.skills.map((skill, index) => (
                <div key={index} className="w-4/5 m-auto mb-5 md:w1/3 md:m-0">
                    <h4 className="text-lg font-bold">{skill.heading}</h4>
                    <p className="">{skill.text}</p>
                    {skill.list && (
                        <ul className="list-disc list-inside">
                            {skill.list.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </section>
    )
}