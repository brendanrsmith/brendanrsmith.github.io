import Link from "next/link";
import Layout from "../components/layout";

export default function Post({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <Layout>
      <div>
        <div>
          <div></div>
        </div>
        <div>
          <div></div>
          <div>
            <Link href="/" as={`${process.env.BACKEND_URL}/#portfolio`}>
              ← Home
            </Link>
            <h1>{title}</h1>
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
}
