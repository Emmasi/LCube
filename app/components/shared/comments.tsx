
interface TextProps {
    class: string;
    text: any;
  }

export default function Comments(props: TextProps) {

    return (
        <section className={`py-6 flex flex-col md:flex-row justify-around items-center ${props.class}`}>
            {props.text.map((comment, index) => (
                <div key={index} className="w-11/12 mb-4 md:w-3/12">
                    <h4 className="text-lg">{comment.heading}</h4>
                    <p className="text-xs italic">{comment.date}</p>
                    <p>{comment.text}</p>
                </div>
            ))}
        </section>
    )
}