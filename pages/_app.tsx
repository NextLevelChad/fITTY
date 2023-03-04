import "../styles/globals.css";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Navbar from "../Components/Navigation Bar/Navbar";
import Head from "next/head";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import type { AppProps } from "next/app";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Head>
      <SessionProvider session={pageProps.session}>
        <div className="flex flex-col">
          <Navbar />
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </>
  );
}

export default trpc.withTRPC(MyApp);
