import Head from "../components/Heads";
import Layout from "../components/Layout";
import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import SignUp from "../components/SignUp";

const reasons = [
  {
    title: "Maintain a clean neighborhood",
    icon: "../static/clean.png",
  },
  {
    title: "Increase property value",
    icon: "../static/money.png",
  },
  {
    title: "Faster turn around times",
    icon: "../static/clock.png",
  },
  {
    title: "Support the local community",
    icon: "../static/social-care.png",
  },
];

export default function whyDonate(props) {
  const useStyles = makeStyles((theme) => ({
    heading: {
      fontSize: "30px",
      fontFamily: "Roboto",
      marginTop: "25px",
      marginBottom: "10px",
    },

    subtitle: {
      fontFamily: "Roboto",
      fontSize: "18px",
      marginBottom: "20px",
      marginTop: "20px",
      lineHeight: "21px",
      width: "65%",
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <Head title={"Why Donate"} />
      <Layout>
        <div className="headings">
          <h2 className="headings" style={{ display: "inline" }}>
            Why{" "}
          </h2>
          Donate?
        </div>
        <div className="desktop">
          <Container maxWidth="lg" style={{ marginTop: "30px" }}>
            <Grid container spacing={3}>
              {reasons.map((reason) => (
                <Grid
                  item
                  sm={3}
                  style={{
                    textAlign: "center",
                    paddingTop: "50px",
                  }}
                  className="cc-card"
                >
                  <img
                    src={reason.icon}
                    alt={reason.title}
                    height={70}
                    width={70}
                  />
                  <Typography
                    component="h2"
                    variant="h5"
                    style={{ margin: "10px 0px", textAlign: "center" }}
                  >
                    {reason.title}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
        <div className="mobile">
          <Container maxWidth="lg" style={{ marginTop: "30px" }}>
            <Grid container spacing={3}>
              {reasons.map((reason) => (
                <Grid
                  item
                  sm={3}
                  style={{
                    textAlign: "center",
                    paddingTop: "50px",
                  }}
                  className="cc-card"
                >
                  <img
                    src={reason.icon}
                    alt={reason.title}
                    height={70}
                    width={70}
                  />
                  <Typography
                    component="h2"
                    variant="h5"
                    style={{ margin: "10px 0px", textAlign: "center" }}
                  >
                    {reason.title}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
        <SignUp />
      </Layout>
    </div>
  );
}
