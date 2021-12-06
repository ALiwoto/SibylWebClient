import { AppProps } from "next/app";
import { AuthProvider } from "../contexts/auth";
import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <main className="mt-5 px-3 mx-auto w-full max-w-lg">
        <Component {...pageProps} />
      </main>
    </AuthProvider>
  );
}
