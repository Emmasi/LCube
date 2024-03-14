interface HeaderProps {
    heading: string;
  }
export default function Rubrik(props: HeaderProps) {
    return (
    <h1 className="my-10 text-4xl md:mt-0 md:text-6xl font-semibold">{props.heading}</h1>
    )
}