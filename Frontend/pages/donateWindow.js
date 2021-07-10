import React, { useState, useEffect } from "react";
import NextHead from "next/head";
import Layout from "../components/Layout.js";
import Cookie from "js-cookie";
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";

const axios = require("axios");

export default function donateWindow() {
  const [checkoutUrl, setCheckoutUrl] = React.useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [reference, setReference] = useState("");
  const [btnText, setBtnText] = useState("Donate");

  let redirectUrl = "";
  useEffect(() => {
    redirectUrl = window.location.hostname;
  }, []);

  async function checkoutDonation() {
    setBtnText("Donating...");
    var regxemail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-z]{2,5})$/;
    var regxphone =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    var regxamount = /^\d+$/;

    if (
      name == null ||
      name == "" ||
      address == null ||
      address == "" ||
      amount == null ||
      amount == "" ||
      email == null ||
      email == "" ||
      phone == "" ||
      phone == null
    ) {
      console.log("Please Fill in all Required Fields");
      document.getElementById("errorEmpty").style.display = "block";
      return;
    }
    if (regxemail.test(email) == false) {
      console.log("Please enter valid email address");
      document.getElementById("errorEmail").style.display = "block";
      return;
    }
    if (regxphone.test(phone) == false) {
      console.log("Please enter valid phone number address");
      document.getElementById("errorPhone").style.display = "block";
      return;
    }
    if (regxamount.test(amount) == false) {
      console.log("Please enter a valid whole amount");
      document.getElementById("errorAmount").style.display = "block";
      return;
    } else {
      var date = new Date();
      var transactionDateDay = date.getDate();
      if (transactionDateDay < 10) {
        transactionDateDay = "0" + transactionDateDay;
      }
      var transactionDateMonth = date.getMonth() + 1;
      if (transactionDateMonth < 10) {
        transactionDateMonth = "0" + transactionDateMonth;
      }
      var transactionDateYear = date.getFullYear();
      var transactionDate =
        "" +
        transactionDateYear +
        "/" +
        transactionDateMonth +
        "/" +
        transactionDateDay;

      var url =
        `${process.env.NEXT_PUBLIC_API_KEY}/createCheckout?amount=` +
        amount +
        "&emailAddress=" +
        email +
        "&name=" +
        name +
        "&transactionDate=" +
        transactionDate +
        "&phoneNumber=" +
        phone +
        "&reference=" +
        reference;

      const checkoutResult = await axios.get(url);
      console.log(checkoutResult);
      Cookie.set("details", {
        amount,
        email,
        name,
        transactionDate,
        phone,
        reference,
      });
      if (checkoutResult?.status === 200 && checkoutResult?.data?.id) {
        setCheckoutUrl(
          "https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=" +
            checkoutResult.data.id
        );
      }
    }
  }

  return (
    <div>
      <NextHead>
        <title>Payments</title>
        <script src={checkoutUrl}></script>
      </NextHead>
      <Layout>
        <div className="headings">
          Thank you for your{" "}
          <h2 className="headings" style={{ display: "inline" }}>
            Donation!
          </h2>
        </div>
        <blockquote
          style={{
            fontSize: "12px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: "-20px",
            marginBottom: "30px",
          }}
        >
          {" "}
          Charity begins at home.
        </blockquote>
        <h2
          style={{
            fontSize: "18px",
            marginTop: "0px",
            marginBottom: "15px",
            textAlign: "-webkit-center",
          }}
        >
          Please enter your details and the amount below:
        </h2>
        <Paper
          className={"PaperDesktop"}
          style={{ marginLeft: "20%", marginRight: "20%" }}
        >
          <FormControl fullWidth variant="outlined" autoComplete="off">
            <TextField
              id="donateName"
              label="Name/Company Name"
              required
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <TextField
              variant="outlined"
              fullWidth
              id="donateEmail"
              label="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <TextField
              fullWidth
              id="donateAddress"
              label="Physical Address"
              required
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <br />
            <TextField
              fullWidth
              id="donatePhone"
              label="Phone Number"
              required
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <br />
            <FormControl variant="outlined">
              <InputLabel id="simple-select-outlined-label">
                Reference
              </InputLabel>
              <Select
                labelId="simple-select-helper-label"
                id="simple-select-outlined"
                variant="outlined"
                required
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                label="Reference"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Bramley"}>Bramley</MenuItem>
                <MenuItem value={"Sandown"}>Sandown</MenuItem>
              </Select>
            </FormControl>
            <br />
            <TextField
              fullWidth
              id="donateAmount"
              label="Amount"
              required
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">R</InputAdornment>
                ),
              }}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <p
              fullWidth
              id="errorEmpty"
              style={{
                display: "none",
                color: "red",
                fontWeight: "bold",
                marginTop: "20px",
                textAlign: "-webkit-center",
              }}
            >
              Please Enter In All Required Fields
            </p>
            <p
              fullWidth
              id="errorEmail"
              style={{
                display: "none",
                color: "red",
                fontWeight: "bold",
                marginTop: "20px",
                textAlign: "-webkit-center",
              }}
            >
              Please Enter a Valid Email Address
            </p>
            <p
              fullWidth
              id="errorPhone"
              style={{
                display: "none",
                color: "red",
                fontWeight: "bold",
                marginTop: "20px",
                textAlign: "-webkit-center",
              }}
            >
              Please Enter a Valid Phone Number
            </p>
            <p
              fullWidth
              id="errorAmount"
              style={{
                display: "none",
                color: "red",
                fontWeight: "bold",
                marginTop: "20px",
                textAlign: "-webkit-center",
              }}
            >
              Please Enter an Amount
            </p>
          </FormControl>
          <Button
            id="btnDonate"
            onClick={checkoutDonation}
            variant="contained"
            disabled={btnText === "Donating..."}
            style={{
              background: "black",
              color: "white",
              margin: "20px",
              textAlign: "-webkit-center",
            }}
          >
            {btnText}
          </Button>
          <form
            action={`https://${redirectUrl}/thankyou`}
            // action={`http://localhost:3000/thankyou`}
            className="paymentWidgets"
            data-brands="VISA MASTER AMEX"
            onChange={() => {
              setCursorByID("btnDonate", "default");
            }}
          ></form>
        </Paper>
      </Layout>
    </div>
  );
}
