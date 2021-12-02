import { AppProps } from "next/app";
import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="mt-5 px-3 mx-auto w-full max-w-lg">
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
