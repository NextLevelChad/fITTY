import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "../Components/Navigation Bar/Navbar";
import Head from "next/head";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Head>
      <SessionProvider session={session}>
        <div className="min-w-screen min-h-screen overflow-hidden flex flex-col">
          <Navbar />
          <div className="flex-grow flex flex-col">
            <Component {...pageProps} />
          </div>
        </div>
      </SessionProvider>
    </>
  );
}
