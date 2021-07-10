import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Layout from "../components/Layout";
import Cookie from "js-cookie";
import { Alert, AlertTitle } from "@material-ui/lab";

const axios = require("axios");

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // "& > * + *": {
    //   marginTop: theme.spacing(2),
    // },
    // margin: "auto",
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // textAlign: "center",
    display: "block",
  },
  alert: {
    maxWidth: 700,
    margin: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
}));

const Payment = ({ statusCode }) => {
  const classes = useStyles();

  if (statusCode !== 500) {
    return (
      <Grid
        container
        spacing={0}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          display: "block",
        }}
      >
        <h1 className="headings">Thank you for your donation</h1>
      </Grid>
    );
  } else {
    return (
      <div className={classes.root}>
        <Alert severity="error" color="error" className={classes.alert}>
          <AlertTitle>Payment Failed</AlertTitle>
          Unfortunately an error has occurred and your payment cannot be
          processed at this time, please verify your payment details or try
          again later.
        </Alert>
      </div>
    );
  }
};

function thankyou({ id, resourcePath }) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusCode, setStatusCode] = useState("");
  const router = useRouter();

  useEffect(async () => {
    const detail = Cookie.get("details");
    // console.log("This is the cookie: ", Cookie.get("details"));
    // console.log("This is the detail", detail);

    if (id !== null) {
      const { amount, email, name, transactionDate, phone, reference } =
        JSON.parse(detail);
      // console.log(amount, email, name, transactionDate, phone, reference);
      let url = `${process.env.NEXT_PUBLIC_API_KEY}/recordPayment?id=${id}&amount=${amount}
      &emailAddress=${email}&name=${name}&transactionDate=${transactionDate}&phoneNumber=${phone}&reference=${reference}`;
      const paymentStatus = await axios.get(url);
      // console.log(paymentStatus);
      setStatusCode(paymentStatus.data.code);
      setIsLoading(false);
    } else {
      router.push("/home");
    }
  }, []);

  return (
    <Layout>{isLoading ? null : <Payment statusCode={statusCode} />}</Layout>
  );
}

export async function getServerSideProps(context) {
  if (context?.query?.id) {
    const {
      query: { id, resourcePath },
    } = context;

    return {
      props: { id, resourcePath },
    };
  } else {
    return {
      props: { id: null, resourcePath: null },
    };
  }
}

export default thankyou;
