import { useState, useEffect } from "react";
import NextHead from "next/head";
import { string } from "prop-types";
import theme from "../lib/theme";
import Cookies from "js-cookie";

const defaultMetaTitle = "";
const defaultDescription = "";
const defaultKeywords = "";
const defaultOGURL = "";
const defaultOGImage = "";
const defaultCopyright = "Turati Sofware";
const defaultLang = "en";
const defaultAuthor = "Turati Sofware";

const Heads = (props) => {
  const [suburb, setSuburb] = useState("Unknown");

  useEffect(() => {
    setSuburb(Cookies.get("suburb"));
  }, [suburb]);
  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <title>
        {`${props.title} - Keep Up ${
          suburb[0].toUpperCase() + suburb.slice(1)
        }` || defaultMetaTitle}
      </title>
      {/* Meta Tags */}
      <meta name="title" content={props.metaTitle || defaultMetaTitle} />
      <meta name="copyright" content={props.copyright || defaultCopyright} />
      <meta name="language" content={props.language || defaultLang} />
      <meta name="keywords" content={props.keywords || defaultKeywords} />
      <meta
        name="description"
        content={props.description || defaultDescription}
      />
      <meta name="author" content={props.author || defaultAuthor} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="X-UA-Compatible" content="IE=8,chrome=1" />
      {/* PWA primary color */}
      <meta name="theme-color" content={theme.palette.primary.main} />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/static/apple-touch-icon.png"
      />
      <link rel="mask-icon" href="/static/favicon-mask.svg" color="#000000" />
      <meta property="og:url" content={props.url || defaultOGURL} />
      <meta property="og:title" content={props.title || ""} />
      <meta
        property="og:description"
        content={props.description || defaultDescription}
      />
      <meta name="twitter:site" content={props.url || defaultOGURL} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
      <meta property="og:image" content={props.ogImage || defaultOGImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link href='https://use.fontawesome.com/releases/v5.12.0/css/all.css' />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
    </NextHead>
  );
};
Heads.propTypes = {
  title: string,
  description: string,
  keywords: string,
  url: string,
  ogImage: string,
};
export default Heads;
