import NextHead from "next/head";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import Link from "next/link";
import color from "@material-ui/core/colors/amber";
import packageJson from "../package.json";

export default function Footer() {
  return (
    <div>
      <NextHead>
        {/*<link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet"></link>*/}
      </NextHead>
      <div className="footer">
        <Grid container>
          <Grid
            item
            xs
            style={{
              float: "left",
              marginLeft: "44px",
              marginTop: "31px",
              marginBottom: "77px",
            }}
          >
            <p className="copyright">
              Copyright &copy; {new Date().getFullYear()} KEEP UP V
              {packageJson.version}
              <br />
              Powered by Turati
            </p>
          </Grid>
          <Grid item xs></Grid>
          <Grid
            item
            xs
            style={{
              float: "right",
              marginTop: "14px",
              marginBottom: "16px",
              marginRight: "45px",
              height: "120px",
              width: "555px",
            }}
          >
            <p className="contact">
              Contact
              <br />
              Email: name@keepup.org
              <br />
              Call: 012 345 6789
            </p>
          </Grid>
        </Grid>
      </div>
      <div className="footerMobile">
        <Grid container>
          <Grid
            item
            xs
            style={{
              marginLeft: "5px",
              marginTop: "15px",
              marginBottom: "5px",
            }}
          >
            <p
              style={{
                fontSize: "8pt",
                color: "#828282",
                textAlign: "left",
                fontFamily: "Roboto",
                lineHeight: "21px",
              }}
            >
              Copyright &copy; {new Date().getFullYear()} KEEP UP V
              {packageJson.version}
              <br />
              Powered by Turati
            </p>
          </Grid>

          <Grid
            item
            xs
            style={{
              marginTop: "10px",
              marginBottom: "5px",
              marginRight: "5px",
            }}
          >
            <p
              style={{
                fontSize: "10pt",
                lineHeight: "21px",
                color: "#FFF",
                fontFamily: "Roboto",
                textAlign: "right",
              }}
            >
              Contact
              <br />
              Email: name@keepup.org
              <br />
              Call: 012 345 6789
            </p>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
