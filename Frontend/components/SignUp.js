import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import React from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
const axios = require("axios");
import NextHead from "next/head";

export default function SignUP() {
  function validateEmail() {
    var email = document.getElementById("email").value;
    var name = document.getElementById("name").value;

    var regx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-z]{2,5})$/;
    if (regx.test(email)) {
      document.getElementById("lbltext").innerHTML = "Added to Mailing List";
      document.getElementById("lbltext").style.visibility = "visible";
      document.getElementById("lbltext").style.color = "green";
      mailChimp(email, name);
      clear();
    } else {
      document.getElementById("lbltext").innerHTML = "Invalid email address";
      document.getElementById("lbltext").style.visibility = "visible";
      document.getElementById("lbltext").style.color = "red";
    }
  }
  function validateEmailMobile() {
    var email = document.getElementById("emailMobile").value.toString();
    var name = document.getElementById("nameMobile").value.toString();

    var regx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-z]{2,5})$/;
    if (regx.test(email)) {
      document.getElementById("lbltextMobile").innerHTML =
        "Added to Mailing List";
      document.getElementById("lbltextMobile").style.visibility = "visible";
      document.getElementById("lbltextMobile").style.color = "green";

      mailChimp(email, name);
    } else {
      document.getElementById("lbltextMobile").innerHTML =
        "Invalid email address";
      document.getElementById("lbltextMobile").style.visibility = "visible";
      document.getElementById("lbltextMobile").style.color = "red";
    }
  }
  function clear() {
    document.getElementById("email").value = "";
    document.getElementById("emailMobile").value = "";
    document.getElementById("name").value = "";
    document.getElementById("nameMobile").value = "";
  }
  function mailChimp(email, name) {
    const api_key = process.env.MAILCHIMP_KEY;
    console.log("This is the key ", api_key);
    try {
      var data = null;
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          console.log(this.responseText);
        }
      });
      xhr.open(
        "GET",
        `https://us4.api.mailchimp.com/2.0/lists/subscribe.json?apikey=${api_key}&id=fdeb2501b5&email[email]=${email}&merge_vars[FNAME]=${name}&double_optin=false&send_welcome=false`
      );
      xhr.setRequestHeader("cache-control", "no-cache");
      xhr.setRequestHeader(
        "Postman-Token",
        "d5572bdc-cd61-4906-a776-5e5e3d222341"
      );
      xhr.send(data);
      clear();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
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
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <div
                className="headings"
                style={{
                  marginTop: "0px",
                  marginBottom: "0px",
                  fontSize: "50px",
                  lineHeight: "66px",
                }}
              >
                <h2
                  className="headings"
                  style={{
                    display: "inline",
                    marginTop: "0px",
                    marginBottom: "0px",
                    fontSize: "50px",
                    lineHeight: "66px",
                  }}
                >
                  SIGN UP
                </h2>{" "}
                to our newsletter
              </div>
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
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <div
                className="headings"
                style={{
                  fontSize: "24px",
                  marginTop: "0px",
                  marginBottom: "0px",
                }}
              >
                <h2
                  className="headings"
                  style={{
                    display: "inline",
                    marginTop: "0px",
                    marginBottom: "0px",
                    fontSize: "24px",
                  }}
                >
                  KEEP UP
                </h2>{" "}
                to date with the neighbourhood by joining our Mailing List
              </div>
            </Grid>
          </Grid>
          <form>
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
              <Grid item xs={12} style={{ textAlign: "-webkit-center" }}>
                <Paper
                  elevation={3}
                  style={{
                    width: "70%",
                    marginTop: "20px",
                    marginBottom: "5px",
                    borderRadius: "8px",
                  }}
                >
                  <TextField
                    id="name"
                    style={{ width: "95%", marginBottom: "5px" }}
                    label="Name:"
                  />
                </Paper>
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
              <Grid item xs={12} style={{ textAlign: "-webkit-center" }}>
                <Paper
                  elevation={3}
                  style={{
                    width: "70%",
                    marginTop: "10px",
                    marginBottom: "5px",
                    borderRadius: "8px",
                  }}
                >
                  <TextField
                    id="email"
                    placeholder="example@mail.com   "
                    style={{ width: "95%", marginBottom: "5px" }}
                    label="Email Address"
                  />
                </Paper>
                <p
                  id="lbltext"
                  style={{
                    color: "red",
                    visibility: "hidden",
                    marginTop: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Invalid
                </p>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12} style={{ textAlign: "-webkit-center" }}>
                <Button
                  onClick={validateEmail}
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
                    marginTop: "15px",
                  }}
                >
                  SIGN UP
                </Button>
              </Grid>
            </Grid>
          </form>
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
            <Grid
              item
              xs={12}
              style={{ textAlign: "center", marginBottom: "20px" }}
            >
              <h2
                className="headings"
                style={{
                  marginTop: "0px",
                  marginBottom: "0px",
                  fontSize: "30px",
                  lineHeight: "15px",
                }}
              >
                SIGN UP
              </h2>
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
              marginTop: "10px",
            }}
          >
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <div
                className="headings"
                style={{
                  fontSize: "18px",
                  marginTop: "0px",
                  marginBottom: "0px",
                  lineHeight: "20px",
                }}
              >
                <h2
                  className="headings"
                  style={{
                    display: "inline",
                    marginTop: "0px",
                    marginBottom: "0px",
                    lineHeight: "20px",
                    fontSize: "18px",
                  }}
                >
                  KEEP UP
                </h2>{" "}
                to date with the neighbourhood by joining our Mailing List
              </div>
            </Grid>
          </Grid>
          <form>
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
              <Grid item xs={12} style={{ textAlign: "-webkit-center" }}>
                <Paper
                  elevation={3}
                  style={{
                    width: "70%",
                    marginTop: "20px",
                    marginBottom: "5px",
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  <TextField
                    id="nameMobile"
                    style={{ width: "95%", marginBottom: "5px" }}
                    label="Name:"
                  />
                </Paper>
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
              <Grid item xs={12} style={{ textAlign: "-webkit-center" }}>
                <Paper
                  elevation={3}
                  style={{
                    width: "70%",
                    marginTop: "10px",
                    marginBottom: "5px",
                    borderRadius: "8px",
                  }}
                >
                  <TextField
                    id="emailMobile"
                    placeholder="example@mail.com"
                    style={{ width: "95%", marginBottom: "5px" }}
                    label="Email Address"
                  />
                </Paper>
                <p
                  id="lbltextMobile"
                  style={{
                    color: "red",
                    visibility: "hidden",
                    fontWeight: "bold",
                    marginTop: "15px",
                  }}
                >
                  Invalid
                </p>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} style={{ textAlign: "-webkit-center" }}>
                <Button
                  variant="contained"
                  onClick={validateEmailMobile}
                  style={{
                    background: "black",
                    color: "white",
                    fontSize: "24px",
                    width: "200px",
                    height: "65px",
                    fontFamily: "Roboto",
                    fontWeight: "700",
                    lineHeight: "32px",
                    marginTop: "20px",
                  }}
                >
                  SIGN UP
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
    </div>
  );
}
