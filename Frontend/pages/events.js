import React, { useState, useEffect } from "react";
import { Grid, makeStyles, Paper } from "@material-ui/core";
import Head from "../components/Heads";
import Layout from "../components/Layout";
import EventCard from "../components/EventCard";
import SignUp from "../components/SignUp";
import Cookies from "js-cookie";

export default function events() {
  const [suburb, setSuburb] = useState("undefined");
  const [events, setEvents] = useState([]);

  let today = new Date();
  let dateString2 =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const isLater = (dateString1, dateString2) =>
    Date.parse(dateString1) > Date.parse(dateString2);

  useEffect(() => {
    setSuburb(Cookies.get("suburb"));
    let api_url = `${process.env.NEXT_PUBLIC_API_KEY}/getEvents?suburb=${suburb}`;

    const getContributors = (api_url) => {
      fetch(api_url)
        .then((response) => response.json())
        .then((json) => setEvents(json))
        .catch((err) => {
          console.log("Error Reading data " + err);
        });
    };
    getContributors(api_url);
  }, [suburb]);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "flex-wrap": "wrap",
      "justify-content": "center",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
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
      <Head title={"Events"} />
      <Layout>
        <div className="headings">
          Upcoming
          <h2 className="headings" style={{ display: "inline" }}>
            {" "}
            Events
          </h2>
        </div>
        <div className="desktop" className={classes.root}>
          {/* {events.map(
            (item) =>
              isLater(item.date, dateString2) && (
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
                      <p className={classes.heading}>
                        {new Date(item.date).toLocaleString()}
                      </p>
                      <p
                        style={{
                          fontSize: "24px",
                          fontWeight: "700",
                          fontFamily: "Roboto",
                        }}
                      >
                        {item.title}
                      </p>

                      <p className={classes.subtitle}> {item.description}</p>

                      <p className={classes.heading}>{item.location}</p>
                    </Grid>
                  </Grid>
                </Paper>
              )
          )} */}
          {events.map(
            (item) =>
              isLater(item.date, dateString2) && (
                <EventCard
                  eventTitle={item.title}
                  eventDate={item.date}
                  eventDesc={item.description}
                  location={item.location}
                />
              )
          )}
        </div>
        <div className="mobile">
          {events.map(
            (item) =>
              isLater(item.date, dateString2) && (
                <EventCard
                  eventTitle={item.title}
                  eventDate={item.date}
                  eventDesc={item.description}
                  location={item.location}
                />
              )
          )}
        </div>
        <div className="headings">
          Past
          <h2 className="headings" style={{ display: "inline" }}>
            {" "}
            Events
          </h2>
        </div>
        <div className="desktop" className={classes.root}>
          {events.map(
            (item) =>
              !isLater(item.date, dateString2) && (
                <EventCard
                  eventTitle={item.title}
                  eventDate={item.date}
                  eventDesc={item.description}
                  location={item.location}
                />
              )
          )}
        </div>
        <div className="mobile">
          {events.map(
            (item) =>
              !isLater(item.date, dateString2) && (
                <EventCard
                  eventTitle={item.title}
                  eventDate={item.date}
                  eventDesc={item.description}
                  location={item.location}
                />
              )
          )}
        </div>
        <SignUp />
      </Layout>
    </div>
  );
}
