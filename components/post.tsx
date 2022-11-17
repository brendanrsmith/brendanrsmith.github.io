import Link from "next/link";
import Layout from "../components/layout";

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
    <Layout className="m-4 mb-20">
      <Link
        href="/"
        as={`${process.env.BACKEND_URL}/#portfolio`}
        className="top-0 p-4 lg:sticky "
      >
        ← Home
      </Link>
      <div className="mx-auto mt-6 max-w-3xl ">
        <h1 className="text-3xl font-light">{title}</h1>
        <h2 className="text-base">{date}</h2>
        <div className="divide-y-2">{children}</div>
      </div>
    </Layout>
  );
}
