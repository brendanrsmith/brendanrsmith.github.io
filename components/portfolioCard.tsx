import Image from "next/future/image";
import Link from "next/link";

export default function PortfolioCard(props: {
  url: string;
  img: string;
  title: string;
  subTitle: string;
  hero?: boolean;
}): JSX.Element {
  return (
    <div
      className={
        (props.hero ? "md:col-span-2" : "col-span-1") +
        " bg-neutral-100 dark:bg-neutral-800 mb-8 mx-4 h-fit rounded-sm hover:brightness-95 border dark:border-0"
      }
    >
      <Link href={props.url} as={process.env.BACKEND_URL + props.url}>
        <a>
          <div className="p-2">
            <div className="text-lg font-light">{props.title}</div>
            <div className="font-semibod text-sm">{props.subTitle}</div>
          </div>
          <Image
            className="w-full"
            src={props.img}
            alt={props.title}
            width={200}
            height={200}
            unoptimized
          />
        </a>
      </Link>
    </div>
  );
}
