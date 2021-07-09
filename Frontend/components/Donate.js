const axios = require("axios");
import InputAdornment from "@material-ui/core/InputAdornment";
import Slide from "@material-ui/core/Slide";
import NextHead from "next/head";
import React, { useState, useEffect } from "react";
import {
  Container,
  withStyles,
  Link,
  IconButton,
  MenuItem,
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";

export default function Donate() {
  const [open, setOpen] = React.useState(false);
  const [checkoutUrl, setCheckoutUrl] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function checkoutDonation() {
    var email = document.getElementById("donateEmail").value.toString();
    var name = document.getElementById("donateName").value;
    var address = document.getElementById("donateAddress").value;
    var amount = document.getElementById("donateAmount").value;
    var phone = document.getElementById("donatePhone").value.toString();
    var reference = document.getElementById("donateReference").value.toString();
    //email="hello@world.co.za"
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
      console.log("Valid email and amount");
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
        transactionDateDay +
        "/" +
        transactionDateMonth +
        "/" +
        transactionDateYear;

      var url =
        "https://drswu6a8f3.execute-api.eu-central-1.amazonaws.com/dev/onceOffPayment?amount=" +
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
      // console.log(url);
      // console.log(checkoutResult.data.res.id);
      setCheckoutUrl(
        "http://test.oppwa.com/v1/paymentWidgets.js?checkoutId=" +
          checkoutResult.data.res.id
      );
      handleClose();
      localStorage.setItem("checkoutId", checkoutResult.data.res.id);
      console.log(localStorage.getItem("checkoutId"));
      window.location.replace("media-pack");
    }
  }

  return (
    <div>
      <div className="desktop">
        <Button
          variant="contained"
          onClick={handleClickOpen}
          style={{
            background: "white",
            alignSelf: "center",
            float: "right",
            marginRight: "60px",
            fontFamily: "Roboto",
            fontSize: "18px",
            fontWeight: "700",
            width: "137px",
            height: "45px",
            lineHeight: "24px",
          }}
        >
          Donate
        </Button>
      </div>
      <div className="mobile">
        <Button
          variant="contained"
          onClick={handleClickOpen}
          style={{
            background: "white",
            alignSelf: "left",
            fontFamily: "Roboto",
            fontSize: "18px",
            fontWeight: "700",
            lineHeight: "24px",
            marginBottom: "10px",
            marginTop: "10px",
          }}
        >
          Donate
        </Button>
      </div>
      <Dialog
        setOpen={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <h1
          className="headings"
          id="form-dialog-title"
          style={{
            fontSize: "40px",
            marginBottom: "0px",
            marginTop: "20px",
            textAlign: "-webkit-center",
          }}
        >
          Donate
        </h1>
        <DialogContent>
          <h2
            style={{
              fontSize: "18px",
              marginTop: "0px",
              marginBottom: "15px",
              textAlign: "-webkit-center",
            }}
          >
            Thank you for contributing!
            <br />
            Please enter your details and the amount below!
          </h2>
          <FormControl fullWidth variant="outlined" autoComplete="off">
            <TextField
              fullWidth
              id="donateName"
              label="Name/Company Name"
              required
              variant="outlined"
            />
            <br />
            <TextField
              variant="outlined"
              fullWidth
              id="donateEmail"
              label="Email Address"
              required
            />
            <br />
            <TextField
              fullWidth
              id="donateAddress"
              label="Physical Address"
              required
              variant="outlined"
            />
            <br />
            <TextField
              fullWidth
              id="donatePhone"
              label="Phone Number"
              required
              variant="outlined"
            />
            <br />
            <TextField
              fullWidth
              id="donateReference"
              label="Reference"
              required
              variant="outlined"
            />
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
        </DialogContent>
        <DialogActions>
          <Button
            onClick={checkoutDonation}
            color="white"
            variant="contained"
            style={{
              background: "black",
              color: "white",
              marginBottom: "20px",
            }}
          >
            Donate
          </Button>
          <Button
            onClick={handleClose}
            color="black"
            variant="contained"
            style={{
              background: "black",
              color: "white",
              marginRight: "18px",
              marginBottom: "20px",
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
