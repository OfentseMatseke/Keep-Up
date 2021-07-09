import React from "react";
import NextHead from "next/head";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import { Button, Container, Grid } from "@material-ui/core";
import Cookies from "js-cookie";
import Footer from "../components/Footer";

const useStyles = makeStyles((theme) => ({
  contain: {},
  formControl: {
    marginBottom: theme.spacing(3),
    minWidth: 120,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  title: {
    marginTop: "100px",
    textAlign: "center",
    marginBottom: theme.spacing(5),
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  },
  formGrid: {
    alignContent: "center",
  },
  btn: {},
}));

export default function index() {
  const classes = useStyles();
  const router = useRouter();
  const [suburb, setSuburb] = React.useState("");

  const handleChange = (event) => {
    const name = event.target.name;
    setSuburb(event.target.value);
  };

  const handleClick = (event) => {
    Cookies.set("suburb", `${suburb}`);
    router.push("/home");
  };

  return (
    <>
      <NextHead>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
          rel="stylesheet"
        ></link>
        <title>Welcome - Keep Up</title>
      </NextHead>
      <div className="fullpage">
        <div className="content">
          <div className="banner">
            <Grid container className={"headerGrid"}>
              <Grid item xs={2} style={{}}></Grid>
              <Grid item xs={8} style={{ textAlign: "center", width: "100%" }}>
                <img src="/static/Layout/KEEP UP.png" />
              </Grid>
            </Grid>
          </div>
          <div className="bannerMobile">
            <Grid container className={"headerGrid"}>
              <Grid item xs={12} style={{ textAlign: "center", width: "100%" }}>
                <img src="/static/Layout/KEEP UP.png" width={"250px"} />
              </Grid>
            </Grid>
          </div>
          <div className="headings">
            Welcome to{" "}
            <h2 className="headings" style={{ display: "inline" }}>
              KEEP UP
            </h2>
          </div>
          <Container maxWidth="sm">
            <Grid className={classes.formGrid}>
              <FormControl className={classes.formControl}>
                <Select
                  native
                  value={suburb}
                  onChange={handleChange}
                  inputProps={{
                    name: "suburb",
                    id: "suburb-native-simple",
                  }}
                >
                  <option value="" disabled>
                    Please choose suburb
                  </option>
                  <option value={"bramley"}>Bramley</option>
                  <option value={"sandown"}>Sandown</option>
                </Select>
              </FormControl>
              <Button
                color="primary"
                variant="contained"
                onClick={handleClick}
                fullWidth
              >
                {" "}
                Submit{" "}
              </Button>
            </Grid>
          </Container>
        </div>
        <div className="pageFooter" id="footer">
          <Footer />
        </div>
      </div>
    </>
  );
}
