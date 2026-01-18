import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="dark size-full">
      <Head>
        <title>Forever Together | Our Anniversary</title>
        <meta
          name="description"
          content="A digital celebration of our beautiful journey together. Happy Anniversary!"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />

        {/* Favicons */}
        <link rel="icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Forever Together | Our Anniversary"
        />
        <meta
          property="og:description"
          content="Celebrating our special day with beautiful memories and love."
        />
        <meta property="og:image" content="/favicon.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:title"
          content="Forever Together | Our Anniversary"
        />
        <meta
          property="twitter:description"
          content="Celebrating our special day with beautiful memories and love."
        />
        <meta property="twitter:image" content="/favicon.png" />
      </Head>
      <body className="size-full bg-black antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
