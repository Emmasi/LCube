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
        <section className='mb-10 flex flex-col md:flex-row justify-around items-start'>
            {props.comments.map((comment, index) => (
                <div key={index} className="w-11/12 px-8 mb-4 md:w-3/12 md:px-0">
                    <h4 className="text-lg">{comment.heading}</h4>
                    <p className="text-xs italic">{comment.date}</p>
                    <p>{comment.text}</p>
                </div>
            ))}
        </section>
    )
}