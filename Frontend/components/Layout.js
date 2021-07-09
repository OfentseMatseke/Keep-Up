import React from "react";
import NextHead from "next/head";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { initGA, logPageView } from "../utils/analytics";

export default class Layout extends React.Component {
  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }
  render() {
    return (
      <div>
        <NextHead>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
            rel="stylesheet"
          ></link>
        </NextHead>
        <title>Keep Up</title>
        <div className="fullpage">
          <div className="content">
            <Header />
            {this.props.children}
          </div>
          <div className="pageFooter" id="footer">
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}
