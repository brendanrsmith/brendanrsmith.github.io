import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=switch"
            rel="stylesheet"
          />
        </Head>
        <body className="dark:bg-neutral-900 bg-neutral-50 text-neutral-900 dark:text-neutral-200">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
