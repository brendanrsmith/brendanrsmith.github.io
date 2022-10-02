import Image from "next/future/image";
import Link from "next/link";
import { customLoader } from "../pages";

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
        " mx-4 mb-8 h-fit overflow-clip rounded border bg-neutral-100 hover:brightness-95 dark:border-0 dark:bg-neutral-800"
      }
    >
      <Link href={props.url} as={process.env.BACKEND_URL + props.url}>
        <a className="text-inherit hover:no-underline">
          <div className="p-2">
            <div className="text-lg font-light no-underline">{props.title}</div>
            <div className="font-semibod h-10 text-sm">{props.subTitle}</div>
          </div>
          <Image
            className="w-full"
            src={props.img}
            alt={props.title}
            width={200}
            height={200}
            loader={customLoader}
          />
        </a>
      </Link>
    </div>
  );
}
