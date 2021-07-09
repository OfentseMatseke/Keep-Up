import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import SimpleMenu from "../components/Menu";
import Link from "../src/Link";

export default function Header() {
  return (
    <div>
      <div className="banner">
        <Grid container className={"headerGrid"}>
          <Grid item xs={2} style={{}}></Grid>
          <Grid item xs={8} style={{ textAlign: "center", width: "100%" }}>
            <img src="/static/Layout/KEEP UP.png" />
          </Grid>
          <Grid item xs={2} style={{ alignItems: "center" }}>
            <Link href="donateWindow">
              <Button
                variant="contained"
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
                DONATE
              </Button>
            </Link>
          </Grid>
        </Grid>
      </div>
      <div className="bannerMobile">
        <Grid container className={"headerGrid"}>
          <Grid item xs={12} style={{ textAlign: "center", width: "100%" }}>
            <img src="/static/Layout/KEEP UP.png" width={"250px"} />
          </Grid>
        </Grid>
        <Grid container className={"headerGrid"}>
          <Grid item xs={12} style={{ alignItems: "center" }}>
            <Link href="donateWindow">
              <Button
                variant="contained"
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
                DONATE
              </Button>
            </Link>
          </Grid>
        </Grid>
      </div>
      <div className="menu">
        <Grid container className={"menuGrid"}>
          <Grid item xs>
            <Link href="/home">
              <Button
                /*className={classes.menuButton}*/ style={{
                  width: "100%",
                  fontSize: "11px",
                  fontWeight: "700",
                  height: "100%",
                }}
              >
                Home
              </Button>
            </Link>
          </Grid>
          <Grid item xs>
            <Link href="about-us">
              <Button
                /*className={classes.menuButton}*/ style={{
                  width: "100%",
                  fontSize: "11px",
                  fontWeight: "700",
                  height: "100%",
                }}
              >
                About Us
              </Button>
            </Link>
          </Grid>
          <Grid item xs>
            <Link href="what-we-do">
              <Button
                /*className={classes.menuButton}*/ style={{
                  width: "100%",
                  fontSize: "11px",
                  fontWeight: "700",
                  height: "100%",
                }}
              >
                What We Do
              </Button>
            </Link>
          </Grid>
          <Grid item xs>
            <Link href="why-donate">
              <Button
                /*className={classes.menuButton}*/ style={{
                  width: "100%",
                  fontSize: "11px",
                  fontWeight: "700",
                  height: "100%",
                }}
              >
                Why Donate
              </Button>
            </Link>
          </Grid>
          <Grid item xs>
            <Link href="top-contributors">
              <Button
                /*className={classes.menuButton}*/ style={{
                  width: "100%",
                  fontSize: "11px",
                  fontWeight: "700",
                  height: "100%",
                }}
              >
                Top Contributors
              </Button>
            </Link>
          </Grid>
          <Grid item xs>
            <Link href="partners">
              <Button
                /*className={classes.menuButton}*/ style={{
                  width: "100%",
                  fontSize: "11px",
                  fontWeight: "700",
                  height: "100%",
                }}
              >
                Partners
              </Button>
            </Link>
          </Grid>
          <Grid item xs>
            <Link href="events">
              <Button
                /*className={classes.menuButton}*/ style={{
                  width: "100%",
                  fontSize: "11px",
                  fontWeight: "700",
                  height: "100%",
                }}
              >
                Events
              </Button>
            </Link>
          </Grid>
          <Grid item xs>
            <Link href="media-pack">
              <Button
                /*className={classes.menuButton}*/ style={{
                  width: "100%",
                  fontSize: "11px",
                  fontWeight: "700",
                  height: "100%",
                }}
              >
                Media Pack
              </Button>
            </Link>
          </Grid>
          <Grid item xs>
            <Link href="/contact-us">
              <Button
                /*className={classes.menuButton}*/ style={{
                  width: "100%",
                  fontSize: "11px",
                  fontWeight: "700",
                  height: "100%",
                }}
              >
                Contact Us
              </Button>
            </Link>
          </Grid>
        </Grid>
      </div>
      <div className="menuMobile">
        <Grid container className={"menuGrid"}>
          <Grid item xs={2}>
            <SimpleMenu />
          </Grid>
          <Grid item xs={3}>
            <Link href="index">
              <Button
                /*className={classes.menuButton}*/ style={{
                  width: "100%",
                  fontSize: "11px",
                  fontWeight: "700",
                  height: "100%",
                }}
              >
                Home
              </Button>
            </Link>
          </Grid>
          <Grid item xs={3}>
            <Link href="partners">
              <Button
                /*className={classes.menuButton}*/ style={{
                  width: "100%",
                  fontSize: "11px",
                  fontWeight: "700",
                  height: "100%",
                }}
              >
                Partners
              </Button>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link href="#footer">
              <Button
                /*className={classes.menuButton}*/ style={{
                  width: "100%",
                  fontSize: "11px",
                  fontWeight: "700",
                  height: "100%",
                }}
              >
                Contact Us
              </Button>
            </Link>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
