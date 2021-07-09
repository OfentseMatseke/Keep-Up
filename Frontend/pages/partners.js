import Head from "../components/Heads";
import Grid from "@material-ui/core/Grid";
import Layout from "../components/Layout";
import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";

export default function partners() {
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
    },
  }));

  const classes = useStyles();
  return (
    <div>
      <Head title={"Partners"} />
      <Layout>
        <div className="headings">
          Our{" "}
          <h2 className="headings" style={{ display: "inline" }}>
            Partners
          </h2>
        </div>
        <div className="desktop">
          <Paper className={"PaperDesktop"}>
            <Grid
              container
              spacing={0}
              style={{
                height: "100%",
                width: "100%",
                display: "inline-flexbox",
                alignContent: "center",
              }}
            >
              <Grid item xs={12} style={{ textAlign: "-webkit-center" }}>
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    fontFamily: "Roboto",
                  }}
                >
                  A BIG thank you to our partners
                </p>

                <p className={classes.heading}>The Trails Body Corporate</p>
                <p className={classes.subtitle}>For the use of their skip</p>
                <img src="../static/Rectangle.png" />
                <p className={classes.heading}>Turati Software</p>
                <p className={classes.subtitle}>
                  Administration and Software Automation
                </p>
                <img src="../static/Rectangle.png" />
                <p className={classes.heading}>Business One</p>
                <p className={classes.subtitle}>Lorem Ipsum Dolor sit Amet</p>
              </Grid>
            </Grid>
          </Paper>
        </div>
        <div className="mobile">
          <Paper className={"PaperMobile"}>
            <Grid
              container
              spacing={0}
              style={{
                height: "100%",
                width: "100%",
                display: "inline-flexbox",
                alignContent: "center",
              }}
            >
              <Grid item xs={12} style={{ textAlign: "-webkit-center" }}>
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    fontFamily: "Roboto",
                  }}
                >
                  A BIG thank you to our partners
                </p>

                <p className={classes.heading}>The Trails Body Corporate</p>
                <p className={classes.subtitle}>For the use of their skip</p>
                <img src="../static/Rectangle.png" />
                <p className={classes.heading}>Turati Software</p>
                <p className={classes.subtitle}>
                  Administration and Software Automation
                </p>
                <img src="../static/Rectangle.png" />
                <p className={classes.heading}>Business One</p>
                <p className={classes.subtitle}>Lorem Ipsum Dolor sit Amet</p>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </Layout>
    </div>
  );
}
