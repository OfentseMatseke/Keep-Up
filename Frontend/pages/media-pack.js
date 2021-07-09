import Head from "../components/Heads";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import { Paper } from "@material-ui/core";

export default function mediaPack() {
  return (
    <div>
      <Head title={"Media Pack"} />
      <Layout>
        <Grid
          container
          spacing={0}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            "text-align": "center",
            display: "block",
          }}
        >
          <h1 className="headings">COMING SOON</h1>
        </Grid>
      </Layout>
    </div>
  );
}
