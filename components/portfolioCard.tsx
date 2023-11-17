import Image from "next/image";
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
        (props.hero ? "sm:col-span-2" : "col-span-1") +
        " " +
        " mx-4 mb-8 overflow-clip rounded border bg-neutral-100 transition-all  hover:bg-neutral-200 dark:border-0 dark:bg-neutral-800 dark:hover:bg-neutral-700"
      }
    >
      <Link
        href={props.url}
        className="text-inherit hover:text-inherit hover:no-underline"
      >
        <div className="p-2 ">
          <div className="text-lg font-light no-underline">{props.title}</div>
          <div className="font-semibod h-10 text-sm">{props.subTitle}</div>
        </div>
        <Image
          className="w-full"
          src={props.img}
          alt={props.title}
          width={200}
          height={200}
        />
      </Link>
    </div>
  );
}
