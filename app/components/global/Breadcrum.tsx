import Link from 'next/link';
interface Breadcrum {
  section?: string;
  page?: string;
}

export default function Breadcrum({ section, page }: Breadcrum) {
  return (
    <div className="flex justify-between items-center bg-[#b3942b]">
      <div className="flex items-center md:h-6 w-full md:w-1/2">
        <nav className="px-20 bg-[#282a36]" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-2 text-[#f8f8f2]">
            <li>
              <Link href="/">
                <span className="cursor-pointer text-xs transition-colors hover:text-[#6a9955]">
                  Home
                </span>
              </Link>
            </li>
            {section &&
              <li className="flex items-center">
                <span className="mx-1 text-[#FFFFFF]">/</span>
                <Link href={"/" + section.toLowerCase()}>
                  <span className="cursor-pointer text-xs transition-colors hover:text-[#6a9955]">
                    {section}
                  </span>
                </Link>
              </li>
            }
            {page &&
              <li className="flex items-center">
                <span className="mx-1 text-[#FFFFFF]">/</span>
                <span className="text-xs">{page}</span>
              </li>
            }
          </ol>

        </nav>
        <svg
          className="hidden md:block h-full w-4"
          viewBox="0 0 20 100"
          preserveAspectRatio="none"
        >
          <polygon points="0,0 20,50 0,100" fill="#282a36" />
        </svg>
      </div>
    </div>
  );
}
