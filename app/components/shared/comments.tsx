interface Comment {
    "heading": string,
    "date": string,
    "text": string
}

interface TextProps {
    comments: Comment[];
}

export default function Comments(props: TextProps) {

    return (
        <section className='flex flex-col md:flex-row'>
            {props.comments.map((comment, index) => (
                <div key={index} className="w-1/1 md:w-1/3 p-10">
                    <h4 className="text-lg">{comment.heading}</h4>
                    <p className="text-xs italic">{comment.date}</p>
                    <p>{comment.text}</p>
                </div>
            ))}
        </section>
    )
}