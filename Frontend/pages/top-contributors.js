import React, { useState, useEffect } from "react";
import Head from "../components/Heads";
import {
  Grid,
  Link,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Layout from "../components/Layout";
import Cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: "30px",
    fontFamily: "Roboto",
    marginTop: "15px",
    marginBottom: "5px",
  },

  subtitle: {
    fontFamily: "Roboto",
    fontSize: "18px",
    marginBottom: "15px",
    fontWeight: "bold",
  },
  table: {},
}));

function createData(name, amount) {
  return { name, amount };
}

export default function topContributors({ apiKey }) {
  const [suburb, setSuburb] = useState("undefined");
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    setSuburb(Cookies.get("suburb"));
    let api_url = `${process.env.NEXT_PUBLIC_API_KEY}/getContributors?suburb=${suburb}`;

    const getContributors = (api_url) => {
      fetch(api_url)
        .then((response) => response.json())
        .then((json) =>
          setContributors(
            json.map((item) => createData(item.name, Number(item.amount)))
          )
        )
        .catch((err) => {
          // Do something for an error here
          console.log("Error Reading data " + err);
        });
    };
    getContributors(api_url);
  }, [suburb]);

  const classes = useStyles();

  return (
    <div>
      <Head title={"Top Contributors"} />
      <Layout>
        <div className="headings">
          <h2 className="headings" style={{ display: "inline" }}>
            Top{" "}
          </h2>
          Contributors
        </div>
        <div className="desktop">
          <Paper className={"PaperDesktop"}>
            <Grid
              container
              spacing={0}
              style={{
                height: "100%",
                width: "50%",
                display: "inline-flexbox",
                alignContent: "center",
                margin: "auto",
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
                  Our Top Contributors are:
                </p>
                <TableContainer>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Amount (p.m)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {contributors.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row" align="center">
                            {row.name}
                          </TableCell>
                          <TableCell align="center">R{row.amount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
            <p
              style={{
                fontSize: "25px",
                fontWeight: "700",
                fontFamily: "Roboto",
                textAlign: "center",
                marginTop: "30px",
              }}
            >
              Thank you for your continued support!
            </p>
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
                    fontSize: "25px",
                    fontWeight: "700",
                    fontFamily: "Roboto",
                  }}
                >
                  Our Top Contributors are:
                </p>

                {contributors.length ? (
                  contributors.map((item, index) => (
                    <>
                      <Link key={index} color="inherit" href={item.site}>
                        <p key={index} className={classes.heading}>
                          {item.name}, {item.location}
                        </p>
                      </Link>
                      <p className={classes.subtitle}>R{item.amount} p/m</p>
                      <img src="../static/Rectangle.png" />
                    </>
                  ))
                ) : (
                  <h2>There are no contributors</h2>
                )}

                <p
                  style={{
                    fontSize: "25px",
                    fontWeight: "700",
                    fontFamily: "Roboto",
                  }}
                >
                  Thank you for your continued support!
                </p>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </Layout>
    </div>
  );
}
