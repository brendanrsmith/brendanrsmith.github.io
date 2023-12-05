import Link from "next/link";

export default function Post({
  children,
  title,
  date,
}: {
  children: React.ReactNode;
  title: string;
  date: string;
}): JSX.Element {
  return (
    <>
      <Link href="/#portfolio" className="top-0 p-4 lg:sticky font-sans">
        ← Home
      </Link>
      <div className="mx-auto mt-6 max-w-prose ">
        <h1 className="text-3xl font-light">{title}</h1>
        <h2 className="text-base">{date}</h2>
        <div className="divide-y-2">{children}</div>
      </div>
    </>
  );
}
