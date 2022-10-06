import Head from "next/head";
import React from "react";

export default function Layout({
  children,
  className,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  home,
}: {
  children: React.ReactNode;
  className?: string;
  home?: boolean;
}) {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Brendan Smith</title>
        <meta charSet="utf8" />
        <meta name="description" content="Brendan Smith's personal portfolio" />
        <meta name="keywords" content="HTML, CSS, JavaScript" />
        <meta name="author" content="Brendan Smith" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
      </Head>
      <main className={className}>{children}</main>
      <footer className=" py-3 text-center text-xs text-gray-300 dark:text-gray-600">
        <p>© {new Date().getFullYear()} Brendan Smith</p>
      </footer>
    </div>
  );
}
