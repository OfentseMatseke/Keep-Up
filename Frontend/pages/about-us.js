import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Layout from "../components/Layout";
import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";
import SignUp from "../components/SignUp";
import Donate from "../components/Donate.js";
import Link from "../src/Link";
import Head from "../components/Heads";
import { useSnackbar } from "notistack";

export default function aboutUs() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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

  const handleClick = (msg) => {
    enqueueSnackbar(msg, { preventDuplicate: true });
  };

  const classes = useStyles();
  return (
    <div>
      <Head title={"About Us"} />
      <Layout>
        <div className="headings">
          About
          <h2 className="headings" style={{ display: "inline" }}>
            {" "}
            KEEP UP
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
                marginBottom: "20px",
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
                  Benefitting the neighbourhood
                </p>

                <p className={classes.subtitle}>
                  KeepUp is a platform that enables the maintenance of
                  neighborhoods. The community can make donations and avail
                  themselves to upkeep their surroundings. Some of the
                  activities include cleaning the streets, pulling out weeds,
                  picking up litter, restoring the pavement, and replacing
                  stolen stormwater drain covers. KeepUp ensures that community
                  donations are put to good use and that the suburbs are well
                  maintained.
                </p>
                <q>
                  Together, it is our responsibility to help make our suburbs
                  better places to live
                </q>
                <p>
                  - Adrian Goslett, Regional Director and CEO of RE/MAX of
                  Southern Africa.
                </p>
              </Grid>
            </Grid>
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
              <Grid
                item
                style={{
                  textAlign: "-webkit-left",
                  paddingRight: "0px",
                  width: "200px",
                }}
              >
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    fontFamily: "Roboto",
                    width: "180px",
                    marginBottom: "20px",
                  }}
                >
                  Banking details
                </p>

                <p
                  className={classes.subtitle}
                  style={{ fontSize: "15px", display: "inline" }}
                >
                  Nedbank
                  <br />
                  The Trails
                  <br />
                  Account Number xxxxxxxx
                  <br />
                  Branch Number
                  <br />
                  <br />
                  Reference: Name, Surname
                </p>
              </Grid>
              <Grid
                item
                style={{
                  textAlign: "-webkit-center",
                  maxWidth: "100%",
                  marginLeft: "30px",
                }}
              >
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    fontFamily: "Roboto",
                  }}
                >
                  Download
                </p>

                <Button
                  style={{
                    marginTop: "20px",
                    fontFamily: "Roboto",
                    fontWeight: "700",
                  }}
                  onClick={() => handleClick("Tax certificate unavailable")}
                >
                  Tax Certificate
                </Button>
                <br />
                <Button
                  style={{
                    marginTop: "20px",
                    fontFamily: "Roboto",
                    fontWeight: "700",
                  }}
                  onClick={() => handleClick("Auditors letter unavailable")}
                >
                  Auditors Letter
                </Button>
              </Grid>
              <Grid item xs style={{ textAlign: "-webkit-left" }}></Grid>

              <Grid
                item
                xs={5}
                style={{ textAlign: "-webkit-center", float: "right" }}
              >
                <Grid
                  container
                  spacing={0}
                  style={{
                    display: "flex",
                    width: "100%",
                    alignSelf: "center",
                    textAlign: "-webkit-center",
                    padding: "20px",
                    marginTop: "100px",
                    float: "right",
                  }}
                >
                  <Grid
                    item
                    xs
                    style={{
                      alignSelf: "center",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <p
                      style={{
                        display: "flex",
                        fontSize: "24px",
                        textAlign: "right",
                        fontFamily: "Roboto",
                        marginTop: "0px",
                        fontWeight: "bold",
                        height: "60px",
                        width: "246px",
                        fontWeight: "700",
                      }}
                    >
                      Help us to Keep Up <br /> our Neighbourhood
                    </p>
                  </Grid>
                  <Grid item xs style={{ width: "100%", textAlign: "center" }}>
                    <Link href="donateWindow">
                      <Button
                        variant="contained"
                        style={{
                          background: "black",
                          color: "white",
                          fontSize: "24px",
                          width: "200px",
                          height: "65px",
                          fontFamily: "Roboto",
                          fontWeight: "700",
                          lineHeight: "32px",
                        }}
                      >
                        DONATE NOW
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
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
                marginBottom: "20px",
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
                  Benefitting the neighbourhood
                </p>

                <p className={classes.subtitle} style={{ width: "80%" }}>
                  KeepUp is a platform that enables the maintenance of
                  neighborhoods. The community can make donations and avail
                  themselves to upkeep their surroundings. Some of the
                  activities include cleaning the streets, pulling out weeds,
                  picking up litter, restoring the pavement, and replacing
                  stolen stormwater drain covers. KeepUp ensures that community
                  donations are put to good use and that the suburbs are well
                  maintained.
                </p>
                <q>
                  Together, it is our responsibility to help make our suburbs
                  better places to live
                </q>
                <p>
                  - Adrian Goslett, Regional Director and CEO of RE/MAX of
                  Southern Africa.
                </p>
              </Grid>
            </Grid>
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
              <Grid
                item
                xs={12}
                style={{
                  textAlign: "-webkit-center",
                  paddingRight: "0px",
                  width: "100%",
                }}
              >
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    fontFamily: "Roboto",
                    width: "100%",
                    marginBottom: "20px",
                  }}
                >
                  Banking details
                </p>

                <p
                  className={classes.subtitle}
                  style={{ fontSize: "20px", display: "inline" }}
                >
                  Nedbank
                  <br />
                  The Trails
                  <br />
                  Account Number xxxxxxxx
                  <br />
                  Branch Number
                  <br />
                  <br />
                  Reference: Name, Surname
                </p>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={0}
              style={{
                height: "100%",
                width: "100%",
                display: "inline-flexbox",
                alignContent: "center",
                marginTop: "30px",
              }}
            >
              <Grid
                item
                xs={12}
                style={{ textAlign: "-webkit-center", maxWidth: "100%" }}
              >
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    fontFamily: "Roboto",
                  }}
                >
                  Download
                </p>

                <Button
                  style={{
                    marginTop: "5px",
                    fontFamily: "Roboto",
                    fontWeight: "700",
                  }}
                >
                  Tax Certificate
                </Button>
                <br />
                <Button
                  style={{
                    marginTop: "5px",
                    fontFamily: "Roboto",
                    fontWeight: "700",
                  }}
                >
                  Auditors Letter
                </Button>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={0}
              style={{
                height: "100%",
                width: "100%",
                display: "inline-flexbox",
                alignContent: "center",
                marginTop: "30px",
              }}
            >
              <Grid item xs={12} style={{ textAlign: "-webkit-center" }}>
                <p
                  style={{
                    display: "block",
                    fontSize: "24px",
                    textAlign: "-webkit-center",
                    fontFamily: "Roboto",
                    marginTop: "0px",
                    fontWeight: "bold",
                    fontWeight: "700",
                  }}
                >
                  Help us to Keep Up <br /> our Neighbourhood
                </p>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={0}
              style={{
                display: "inline",
                width: "100%",
                alignSelf: "center",
                textAlign: "-webkit-center",
                padding: "20px",
                height: "100%",
              }}
            >
              <Grid
                item
                xs={12}
                style={{
                  textAlign: "-webkit-center",
                  height: "100%",
                  width: "100%",
                }}
              >
                <Link href="donateWindow">
                  <Button
                    variant="contained"
                    style={{
                      background: "black",
                      color: "white",
                      fontSize: "24px",
                      width: "200px",
                      height: "65px",
                      fontFamily: "Roboto",
                      fontWeight: "700",
                      lineHeight: "32px",
                    }}
                  >
                    DONATE NOW
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </div>
        <div style={{ textAlign: "-webkit-center" }} id="who-we-are">
          <h2 className="headings" style={{ display: "inline" }}>
            Who{" "}
          </h2>
          <p className="headings" style={{ display: "inline" }}>
            We Are
          </p>
        </div>
        <div className="desktop">
          <Paper className={"PaperDesktop"}>
            <Grid
              container
              spacing={2}
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignContent: "center",
              }}
            >
              <Grid item xs={6} style={{ textAlign: "-webkit-center" }}>
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    fontFamily: "Roboto",
                  }}
                >
                  Adriano & Jenny Iorio
                </p>
                <p className={classes.subtitle} style={{ width: "90%" }}>
                  Duis autem vel eum iriure dolor in hendrerit in vulputate
                  velit esse molestie consequat, vel illum dolore eu feugiat
                  nulla facilisis at vero eros et accumsan et iusto odio
                  dignissim qui blandit praesent luptatum zzril delenit augue
                  duis dolore te feugait nulla facilisi.
                </p>
                <img
                  src="../static/Spend Graph.png"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={6} style={{ textAlign: "-webkit-center" }}>
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    fontFamily: "Roboto",
                  }}
                >
                  Fletcher
                </p>
                <p className={classes.subtitle} style={{ width: "90%" }}>
                  Duis autem vel eum iriure dolor in hendrerit in vulputate
                  velit esse molestie consequat, vel illum dolore eu feugiat
                  nulla facilisis at vero eros et accumsan et iusto odio
                  dignissim qui blandit praesent luptatum zzril delenit augue
                  duis dolore te feugait nulla facilisi.
                </p>
                <img
                  src="../static/Spend Graph.png"
                  style={{ width: "100%" }}
                />
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
                marginBottom: "20px",
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
                  Adriano & Jenny Iorio
                </p>
                <p className={classes.subtitle} style={{ width: "90%" }}>
                  Duis autem vel eum iriure dolor in hendrerit in vulputate
                  velit esse molestie consequat, vel illum dolore eu feugiat
                  nulla facilisis at vero eros et accumsan et iusto odio
                  dignissim qui blandit praesent luptatum zzril delenit augue
                  duis dolore te feugait nulla facilisi.
                </p>
                <img
                  src="../static/Spend Graph.png"
                  style={{ width: "100%" }}
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={0}
              style={{
                height: "100%",
                width: "100%",
                display: "inline-flexbox",
                alignContent: "center",
                marginBottom: "20px",
                marginTop: "30px",
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
                  Fletcher
                </p>
                <p className={classes.subtitle} style={{ width: "90%" }}>
                  Duis autem vel eum iriure dolor in hendrerit in vulputate
                  velit esse molestie consequat, vel illum dolore eu feugiat
                  nulla facilisis at vero eros et accumsan et iusto odio
                  dignissim qui blandit praesent luptatum zzril delenit augue
                  duis dolore te feugait nulla facilisi.
                </p>
                <img
                  src="../static/Spend Graph.png"
                  style={{ width: "100%" }}
                />
              </Grid>
            </Grid>
          </Paper>
        </div>
        <SignUp />
      </Layout>
    </div>
  );
}
