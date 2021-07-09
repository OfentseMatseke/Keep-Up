import React from "react";
import { Grid, Paper } from "@material-ui/core";
import Chart from "./Chart";

function MoneyRaised({ donations }) {
  return (
    <React.Fragment>
      <div className="headings" id="monthlySpend">
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
              height: "489px",
              width: "100%",
              display: "inline-flexbox",
              alignContent: "center",
            }}
          >
            <Grid item xs={6} style={{ textAlign: "left" }}>
              <Chart />
            </Grid>
            <Grid item xs={6} style={{ alignItems: "center" }}></Grid>
          </Grid>
        </Paper>
      </div>
      <div className="mobile">
        <Paper className={"PaperMobile"}></Paper>
      </div>
    </React.Fragment>
  );
}

// MoneyRaised.getInitialProps = async (ctx) => {
//   // const subName = Cookies.get("suburb");
//   // const suburb = subName[0].toUpperCase() + subName.slice(1);

//   return {
//     props: { donationsData: json },
//   };
// };

export default MoneyRaised;
