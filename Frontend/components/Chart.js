import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Grid } from "@material-ui/core";
import { Line } from "react-chartjs-2";

const months = [
  "January",
  "Fabruary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Chart({ donations }) {
  const [data, setData] = useState([]);
  const [label, setLabel] = useState([]);

  const donData = () => {
    let monthsData = [];
    for (let i = 0; i < donations.length; i += 1) {
      const transDate = donations[i].transactionDate;
      const transMon = new Date(transDate).getMonth();
      monthsData.push(transMon);
    }
    let money = [];
    monthsData = [...new Set(monthsData)].sort();
    for (let i = 0; i < monthsData.length; i += 1) {
      let temp = 0;
      for (let j = 0; j < donations.length; j += 1) {
        if (
          monthsData[i] === new Date(donations[j].transactionDate).getMonth()
        ) {
          temp = temp + Number(donations[j].amount.trim());
        }
      }
      money[i] = temp;
    }
    let fullMonth = [];
    let fullData = [];
    for (let i = 0; i < 12; i += 1) {
      if (monthsData.find((element) => element === i)) {
        fullMonth.push(i);
        fullData.push(money[monthsData.indexOf(i)]);
      } else {
        fullMonth.push(i);
        fullData.push(0);
      }
    }

    setData(fullData);
    setLabel(fullMonth.map((item) => months[item]));
  };

  useEffect(() => {
    donData();
  }, []);

  return (
    <>
      <div style={{ maxWidth: "100%" }}>
        {
          <Line
            data={{
              labels: label,
              datasets: [
                {
                  label: "Money raised (R)",
                  data: data,
                  backgroundColor: "black",

                  borderColor: "black",

                  borderWidth: 1,
                },
              ],
            }}
            height={400}
            width={600}
            options={{
              maintainAspectRatio: false,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
              legend: {
                labels: {
                  fontSize: 25,
                },
              },
            }}
          />
        }
      </div>
      <Grid item xs={12} style={{ textAlign: "left", paddingLeft: "70px" }}>
        <p
          style={{
            fontSize: "24px",
            textAlign: "center",
            fontFamily: "Roboto",
            marginTop: "0px",
            fontWeight: "bold",
          }}
        >
          Money raised
        </p>
        <ul
          style={{
            marginLeft: "30px",
            marginTop: "10px",
            fontFamily: "Roboto",
            fontSize: "18px",
            lineHeight: "30px",
          }}
        >
          {label.map((item, index) => (
            <li hidden={months.indexOf(item) > new Date().getMonth()}>
              {item}
              {"  -   R"}
              {data[index]}
            </li>
          ))}
        </ul>
      </Grid>
    </>
  );
}

export default Chart;
