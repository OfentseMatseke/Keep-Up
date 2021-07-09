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

export default function DonateBody() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function validate() {
    var email = document.getElementById("donateEmailBody").value.toString();
    var name = document.getElementById("donateNameBody").value;
    var address = document.getElementById("donateAddressBody").value;
    var amount = document.getElementById("donateAmountBody").value;
    //email="hello@world.co.za"
    var regxemail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-z]{2,5})$/;
    var regxamount = /^\d+$/;
    // console.log(email);
    // console.log(amount);
    if (
      name == null ||
      name == "" ||
      address == null ||
      address == "" ||
      amount == null ||
      amount == "" ||
      email == null ||
      email == ""
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
    if (regxamount.test(amount) == false) {
      console.log("Please enter a valid whole amount");
      document.getElementById("errorAmount").style.display = "block";
      return;
    } else {
      console.log("Valid email and amount");
      handleClose();
    }
  }

  return (
    <div>
      <div className="desktop">
        <Button
          id="bodyDonate"
          variant="contained"
          onClick={handleClickOpen}
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
      </div>
      <div className="mobile">
        <Button
          id="bodyDonate"
          variant="contained"
          onClick={handleClickOpen}
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
              id="donateNameBody"
              label="Name/Company Name"
              required
              variant="outlined"
            />
            <br />
            <TextField
              variant="outlined"
              fullWidth
              id="donateEmailBody"
              label="Email Address"
              required
            />
            <br />
            <TextField
              fullWidth
              id="donateAddressBody"
              label="Physical Address"
              required
              variant="outlined"
            />
            <br />
            <TextField
              fullWidth
              id="donateAmountBody"
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
            onClick={validate}
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
