import AppBar from "../components/app-bar/index";
import { Global, css } from "@emotion/react";
import React from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Global
        styles={css`
          body {
            margin: 0px;
            font-family: "Roboto", sans-serif;
          }
        `}
      />
      <Head>
        <SeoMeta />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&"
          rel="stylesheet"
          type="text/css"
        />
      </Head>
      <div>
        <AppBar />
        <Component {...pageProps} />
      </div>
    </React.Fragment>
  );
}

function SeoMeta() {
  return (
    <>
      <meta property="title" content="CoLI Designer" />
      <meta
        property="description"
        content="Code builder for coders. replace your developers with CoLI"
      />
    </>
  );
}

export default MyApp;
