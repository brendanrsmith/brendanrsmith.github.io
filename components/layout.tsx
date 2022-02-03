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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <main>{children}</main>
    </div>
  );
}
