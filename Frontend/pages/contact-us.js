import React from "react";
import Head from "../components/Heads";
import Layout from "../components/Layout";
import ContactUsForm from "../components/ContactUsForm";

export default function contactUs() {
  return (
    <Layout>
      <Head title={"Contact Us"} />
      <div className="headings">
        <h2 className="headings" style={{ display: "inline" }}>
          Contact{" "}
        </h2>
        Us
      </div>
      <ContactUsForm />
    </Layout>
  );
}
