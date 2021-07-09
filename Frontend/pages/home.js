import React, { useState, useEffect } from "react";
import Head from "../components/Heads";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Layout from "../components/Layout";
import Paper from "@material-ui/core/Paper";
import SignUp from "../components/SignUp";
import Link from "../src/Link";
import Cookies from "js-cookie";
import axios from "axios";
import Chart from "../components/Chart";
import MoneySpend from "../components/MoneySpend";

function Home() {
  const [suburb, setSuburb] = useState("Unknown");
  const [url, setUrl] = useState("");
  const [projects, setProjects] = useState([]);
  const [moneySpend, setMoneySpend] = useState([]);
  const [donations, setDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = (suburb) => {
    setIsLoading(true);
    const suburb_url = `${process.env.API_KEY}/getSuburbs?suburb=${suburb}`;
    const projects_url = `${process.env.API_KEY}/getProjects?suburb=${suburb}`;
    const donations_url = `${process.env.API_KEY}/getDonations`;

    const getSuburb = axios.get(suburb_url);
    const getProjects = axios.get(projects_url);
    const getDonations = axios.get(donations_url);
    axios.all([getSuburb, getProjects, getDonations]).then(
      axios.spread((...allData) => {
        const allSuburbData = allData[0];
        const allProjectsData = allData[1];
        const allDonationsData = allData[2];

        setUrl(allSuburbData.data[0].iframe);
        setProjects(allProjectsData.data.map((item) => item.description));
        let proj = [];
        for (let i = 0; i < allProjectsData.data.length; i += 1) {
          const container = {};
          container["date"] = allProjectsData.data[i].date;
          container.amount = Number(allProjectsData.data[i].spend);
          proj.push(container);
        }
        console.log("This is the projects: ", proj);
        setMoneySpend(proj);
        // allProjectsData.data.map((item) => {
        //   const container = {};
        //   container["date"] = item.date;
        //   container.amount = Number(item.spend);
        //   return container;
        // })

        const subName = suburb[0].toUpperCase() + suburb.slice(1);

        setDonations(() =>
          allDonationsData.data.filter((item) => item.reference === subName)
        );
        setIsLoading(false);
      })
    );
  };

  useEffect(() => {
    setSuburb(Cookies.get("suburb"));
    fetchData(suburb);
  }, [suburb]);

  return (
    <div>
      <Head title={"Home"} />
      <Layout>
        <div className="headings">
          Working to{" "}
          <h2 className="headings" style={{ display: "inline" }}>
            KEEP UP
          </h2>{" "}
          the Neighbourhood of {suburb[0].toUpperCase() + suburb.slice(1)}
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
              <Grid item xs={6} style={{ alignItems: "center" }}>
                <iframe
                  src={url}
                  style={{
                    width: "100%",
                    height: "100%",
                    frameborder: "0px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px 0 rgba(0,0,0,0.5)",
                    allowfullscreen: "",
                  }}
                ></iframe>
              </Grid>
              <Grid
                item
                xs={6}
                style={{ alignItems: "center", paddingLeft: "55px" }}
              >
                <p
                  style={{
                    fontSize: "24px",
                    textAlign: "left",
                    fontFamily: "Roboto",
                    marginTop: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Ongoing Projects
                </p>
                <ul
                  style={{
                    marginLeft: "25px",
                    marginTop: "10px",
                    fontFamily: "Roboto",
                    fontSize: "18px",
                  }}
                >
                  {projects.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <div
                  style={{
                    textAlign: "center",
                    float: "right",
                    marginTop: "200px",
                    display: "flex",
                  }}
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
                    <Grid
                      item
                      xs
                      style={{ width: "100%", textAlign: "center" }}
                    >
                      <Link href="/donateWindow">
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
                </div>
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
                display: "flex",
                alignContent: "center",
              }}
            >
              <Grid item xs={12} style={{ alignItems: "center" }}>
                <iframe
                  src={url}
                  style={{
                    width: "100%",
                    height: "100%",
                    frameborder: "0px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px 0 rgba(0,0,0,0.5)",
                    allowfullscreen: "",
                  }}
                ></iframe>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={0}
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignContent: "center",
              }}
            >
              <Grid item xs={12} style={{ alignItems: "center" }}>
                <p
                  style={{
                    fontSize: "20px",
                    textAlign: "center",
                    fontFamily: "Roboto",
                    marginTop: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Ongoing Projects
                </p>
                <ul
                  style={{
                    marginLeft: "30px",
                    marginTop: "10px",
                    fontFamily: "Roboto",
                    fontSize: "16px",
                    lineHeight: "20px",
                  }}
                >
                  {projects.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <p
                  style={{
                    fontSize: "20px",
                    textAlign: "center",
                    fontFamily: "Roboto",
                    marginTop: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Help us to Keep Up our Neighbourhood
                </p>

                <Grid
                  container
                  style={{
                    textAlign: "-webkit-center",
                    marginTop: "15px",
                    marginBottom: "15px",
                  }}
                >
                  <Grid item xs={12}>
                    <Link href="/donateWindow">
                      <Button
                        variant="contained"
                        style={{
                          background: "black",
                          color: "white",
                          fontSize: "20px",
                          width: "200px",
                          height: "65px",
                          fontFamily: "Roboto",
                          fontWeight: "700",
                          lineHeight: "32px",
                          alignSelf: "center",
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
        <div className="headings" id="monthlySpend">
          Monthly{" "}
          <h2 className="headings" style={{ display: "inline" }}>
            Spend
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
                display: "flex",
                alignContent: "center",
              }}
            >
              <Grid item xs={6} style={{ textAlign: "left" }}>
                <p
                  style={{
                    fontSize: "24px",
                    textAlign: "left",
                    fontFamily: "Roboto",
                    marginTop: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Money put to good use in our street
                </p>
                <ul
                  style={{
                    marginLeft: "30px",
                    marginTop: "10px",
                    fontFamily: "Roboto",
                    fontSize: "18px",
                    lineHeight: "30px",
                    listStyleType: "none",
                  }}
                >
                  {moneySpend.map((item, index) => (
                    <li key={index}>
                      {item.date} - R{item.amount}
                    </li>
                  ))}
                </ul>
              </Grid>
              <Grid item xs={6} style={{ alignItems: "center" }}>
                {moneySpend.length > 0 && <MoneySpend spend={moneySpend} />}
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
                display: "flex",
                alignContent: "center",
              }}
            >
              <Grid item xs={12} style={{ textAlign: "left" }}>
                <p
                  style={{
                    fontSize: "24px",
                    textAlign: "center",
                    fontFamily: "Roboto",
                    marginTop: "0px",
                    fontWeight: "bold",
                  }}
                >
                  Money put to good use in our street
                </p>
                <ul
                  style={{
                    marginLeft: "30px",
                    marginTop: "10px",
                    fontFamily: "Roboto",
                    fontSize: "18px",
                    lineHeight: "30px",
                  }}
                >
                  {moneySpend.map((item, index) => (
                    <li key={index}>
                      {item.date} - R{item.amount}
                    </li>
                  ))}
                </ul>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={0}
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignContent: "center",
                marginTop: "20px",
              }}
            >
              <Grid item xs={12} style={{ alignItems: "center" }}>
                {moneySpend.length > 0 && <MoneySpend spend={moneySpend} />}
              </Grid>
            </Grid>
          </Paper>
        </div>
        <div className="headings" id="monthlyRaise">
          Money{" "}
          <h2 className="headings" style={{ display: "inline" }}>
            Raised
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
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Grid
                container
                spacing={0}
                style={{
                  height: "489px",
                  flexWrap: "nowrap",
                }}
              >
                {donations.length && <Chart donations={donations} />}
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
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Grid
                container
                spacing={0}
                style={{
                  height: "100%",
                }}
              >
                {donations.length && <Chart donations={donations} />}
              </Grid>
            </Grid>
          </Paper>
        </div>

        <SignUp id="foot" />
      </Layout>
    </div>
  );
}

export default Home;
