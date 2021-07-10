import React, { useState } from "react";
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function ContactUsForm() {
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [buttonText, setButtonText] = useState("Send Message");
  const [emailError, setEmailError] = useState(false);

  const classes = useStyles();

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setMessage("");
    setEmail("");
    setButtonText("Message Sent");
    setTimeout(() => {
      setSent(false);
    }, 3000);
  };

  function handleChangeEmail(e) {
    if (
      !e.target.value.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setEmail(e.target.value);
      setEmailError(true);

      if (email === "") {
        // check if the input is empty
        setEmailError(false);
      }
    } else {
      setEmail(e.target.value);
      setEmailError(false);
    }
  }

  const formSubmit = async (e) => {
    e.preventDefault();
    setButtonText("...sending");
    const url = `${process.env.NEXT_PUBLIC_API_KEY}/contactUs`;
    let data = {
      name:
        firstName.charAt(0).toUpperCase() +
        firstName.slice(1) +
        " " +
        lastName.charAt(0).toUpperCase() +
        lastName.slice(1),
      email,
      message,
    };

    try {
      await axios.post(url, data);
      setSent(true);
      resetForm();
    } catch (error) {
      console.log(error);
      setButtonText("Message Not Sent");
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={(e) => formSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => handleChangeEmail(e)}
                error={emailError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-multiline-flexible"
                label="Message"
                placeholder="Enter Message"
                variant="outlined"
                multiline
                fullWidth
                rowsMax={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                type="text"
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {buttonText}
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default ContactUsForm;
