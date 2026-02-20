import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ContentProvider } from "@/context/ContentContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContentProvider>
      <Component {...pageProps} />
    </ContentProvider>
  );
}
