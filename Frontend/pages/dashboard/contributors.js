import React, { useState, useEffect } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import Cookies from "js-cookie";
import Table from "../../components/dashboard/Table";
import router from "next/router";
import { parseCookies } from "nookies";
import { useAppContext } from "../../src/context";

const columns = [
  {
    field: "id",
    title: "ID",
    width: 70,
    initialEditValue: Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1),
    editable: "never",
  },
  { field: "name", title: "Name", width: 160 },
  { field: "amount", title: "Contribution Amount(R)", width: 250 },
  { field: "location", title: "Location", width: 160 },
  { field: "website", title: "Website", width: 200 },
  {
    field: "suburb",
    title: "Suburb",
    width: 130,
    lookup: { sandown: "Sandown", bramley: "Bramley" },
  },
];

export default function contributors() {
  const [suburb, setSuburb] = useState("Unknown");
  const [contributors, setContributors] = useState([]);
  const { checkSession, loading, setLoading } = useAppContext();

  useEffect(() => {
    setSuburb(Cookies.get("suburb"));
    const cookies = parseCookies();
    if (
      Object.keys(cookies).length !== 0 &&
      cookies.constructor === Object &&
      cookies.token
    ) {
      checkSession();
    } else {
      router.push("/dashboard/signin");
    }
    const contributors_url = `${process.env.NEXT_PUBLIC_API_KEY}/getContributors?suburb=${suburb}`;

    const getContributors = async (contributors_url) => {
      fetch(contributors_url)
        .then((response) => response.json())
        .then((json) => {
          setContributors(
            json.map((item) => {
              const container = {};
              container["id"] = item.contributorId;
              container.name = item.name;
              container.location = item.location;
              container.amount = Number(item.amount);
              container.suburb = item.suburb;
              container.website = item.site;
              return container;
            })
          );
        })
        .catch((err) => {
          // Do something for an error here
          console.log("Error Reading data " + err);
        });
    };

    getContributors(contributors_url);
  }, [suburb]);

  const deleteItem = (contributorId) => {
    fetch(`${api_url}deleteContributor`, {
      method: "DELETE",
      body: JSON.stringify({ id: contributorId }),
    })
      .then((res) => res.text()) // or res.json()
      .then((res) => console.log(res))
      .catch((err) => {
        console.error("fetch failed", err);
      });
  };
  const addItem = (newData) => {
    fetch(`${api_url}postContributors`, {
      method: "POST",
      body: JSON.stringify(newData),
    })
      .then((res) => res.text()) // or res.json()
      .then((res) => console.log(res))
      .catch((err) => {
        console.error("fetch failed", err);
      });
  };
  const updateItem = (newData) => {
    fetch(`${api_url}updateContributor`, {
      method: "PATCH",
      body: JSON.stringify(newData),
    })
      .then((res) => res.text()) // or res.json()
      .then((res) => console.log(res))
      .catch((err) => {
        console.error("fetch failed", err);
      });
  };

  if (loading) {
    return null;
  } else {
    return (
      <Dashboard>
        <Table
          columns={columns}
          data={contributors}
          setData={setContributors}
          title={"Contributors"}
          deleteItem={deleteItem}
          addItem={addItem}
          updateItem={updateItem}
        />
        {/* <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={contributors} columns={columns} checkboxSelection />
      </div> */}
      </Dashboard>
    );
  }
}
