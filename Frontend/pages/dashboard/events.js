import React, { useState, useEffect } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import Cookies from "js-cookie";
import Table from "../../components/dashboard/Table";

const columns = [
  {
    field: "id",
    title: "ID",
    width: 70,
    initialEditValue: Date.now(),
    editable: "never",
  },
  {
    field: "title",
    title: "Title",
    width: 200,
  },
  {
    field: "description",
    title: "Description",
    width: 250,
  },
  {
    field: "date",
    title: "Date",
    width: 160,
    type: "datetime",
  },
  {
    field: "location",
    title: "Location",
    width: 160,
  },
  {
    field: "suburb",
    title: "Suburb",
    width: 130,
    lookup: { sandown: "Sandown", bramley: "Bramley" },
  },
];

export default function events() {
  const [suburb, setSuburb] = useState("Unknown");
  const [events, setEvents] = useState([]);
  const api_url =
    "https://9pylrbkatk.execute-api.eu-central-1.amazonaws.com/dev/";

  useEffect(() => {
    setSuburb(Cookies.get("suburb"));

    const events_url = `${api_url}getEvents?suburb=${suburb}`;

    const getEvents = async (projects_url) => {
      fetch(projects_url)
        .then((response) => response.json())
        .then((json) => {
          setEvents(
            json.map((item) => {
              const container = {};
              container["id"] = item.eventId;
              container.title = item.title;
              container.date = item.date;
              container.description = item.description;
              container.location = item.location;
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

    getEvents(events_url);
  }, [suburb]);

  const deleteItem = (eventId) => {
    fetch(`${api_url}deleteEvent`, {
      method: "DELETE",
      body: JSON.stringify({ id: eventId }),
    })
      .then((res) => res.text()) // or res.json()
      .then((res) => console.log(res))
      .catch((err) => {
        console.error("fetch failed", err);
      });
  };
  const addItem = (newData) => {
    fetch(`${api_url}postEvents`, {
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
    fetch(`${api_url}updateEvent`, {
      method: "PATCH",
      body: JSON.stringify(newData),
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
        data={events}
        title={"Events"}
        setData={setEvents}
        deleteItem={deleteItem}
        addItem={addItem}
        updateItem={updateItem}
      />
      {/* <AddEvent />
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={events} columns={columns} checkboxSelection />
      </div> */}
    </Dashboard>
  );
}
