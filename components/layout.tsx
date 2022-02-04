import Head from "next/head";
import React from "react";

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <div style={{ paddingBottom: "3rem" }}>
      <Head>
        <title>Brendan Smith</title>
        <meta charSet="utf8" />
        <meta name="description" content="Brendan Smith's personal portfolio" />
        <meta name="keywords" content="HTML, CSS, JavaScript" />
        <meta name="author" content="Brendan Smith" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </Head>
      <main>{children}</main>
    </div>
  );
}
