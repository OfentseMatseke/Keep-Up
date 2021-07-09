import React, { useState, useEffect } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import Cookies from "js-cookie";
import Table from "../../components/dashboard/Table";

export default function projects() {
  const [suburb, setSuburb] = useState("Unknown");
  const [projects, setProjects] = useState([]);
  const [columns, setColumns] = useState([
    {
      title: "ID",
      field: "id",
      initialEditValue: Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1),
      editable: "never",
    },
    {
      title: "Description",
      field: "description",
    },
    { title: "Date", field: "date" },
    { title: "Cost", field: "amount", type: "number", initialEditValue: 0 },
    {
      title: "Suburb",
      field: "suburb",
      lookup: { sandown: "Sandown", bramley: "Bramley" },
    },
  ]);
  const api_url =
    "https://9pylrbkatk.execute-api.eu-central-1.amazonaws.com/dev/";

  useEffect(() => {
    setSuburb(Cookies.get("suburb"));

    const projects_url = `${api_url}getProjects?suburb=${suburb}`;

    const getProjects = async (projects_url) => {
      fetch(projects_url)
        .then((response) => response.json())
        .then((json) => {
          setProjects(
            json.map((item) => {
              const container = {};
              container["id"] = item.projectId;
              container.date = item.date;
              container.description = item.description;
              container.amount = Number(item.spend);
              container.suburb = item.suburb;
              return container;
            })
          );
        })
        .catch((err) => {
          // Do something for an error here
          console.log("Error Reading data " + err);
        });
    };

    getProjects(projects_url);
  }, [suburb]);

  const addItem = (newData) => {
    fetch(`${api_url}postProjects`, {
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
    fetch(`${api_url}updateProject`, {
      method: "PATCH",
      body: JSON.stringify(newData),
    })
      .then((res) => res.text()) // or res.json()
      .then((res) => console.log(res))
      .catch((err) => {
        console.error("fetch failed", err);
      });
  };
  const deleteItem = (projectId) => {
    fetch(`${api_url}deleteProject`, {
      method: "DELETE",
      body: JSON.stringify({ id: projectId }),
    })
      .then((res) => res.text()) // or res.json()
      .then((res) => console.log(res))
      .catch((err) => {
        console.error("fetch failed", err);
      });
  };
  return (
    <Dashboard>
      <Table
        columns={columns}
        data={projects}
        title={"Projects"}
        setData={setProjects}
        deleteItem={deleteItem}
        addItem={addItem}
        updateItem={updateItem}
      />
      {/* <AddProject />
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={projects} columns={columns} checkboxSelection />
      </div> */}
    </Dashboard>
  );
}
