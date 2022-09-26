import Image from "next/future/image";
import Link from "next/link";

export default function PortfolioCard(props: {
  url: string;
  img: string;
  title: string;
  subTitle: string;
}): JSX.Element {
  return (
    <div className="bg-purple-800 my-5">
      <Link href={props.url} as={process.env.BACKEND_URL + props.url}>
        <a>
          <div className="">
            <div>
              <div>{props.title}</div>
              <div>{props.subTitle}</div>
            </div>
            <Image
              src={props.img}
              alt={props.title}
              width={50}
              height={50}
              unoptimized
            />
          </div>
        </a>
      </Link>
    </div>
  );
}
