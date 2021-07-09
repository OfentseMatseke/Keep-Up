import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
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

function Chart({ spend }) {
  const [data, setData] = useState([]);
  const [label, setLabel] = useState([]);

  const donData = () => {
    console.log("This is the money spend", spend);
    let monthsData = [];
    for (let i = 0; i < spend.length; i += 1) {
      const transDate = spend[i].date;
      const transMon = new Date(transDate).getMonth();
      monthsData.push(transMon);
    }

    let money = [];
    monthsData = [...new Set(monthsData)].sort();

    for (let i = 0; i < monthsData.length; i += 1) {
      let temp = 0;
      for (let j = 0; j < spend.length; j += 1) {
        if (monthsData[i] === new Date(spend[j].date).getMonth()) {
          temp = temp + spend[j].amount;
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
        i <= new Date().getMonth() ? fullData.push(0) : fullData.push(null);
      }
    }
    console.log("This is the full data ", fullData);
    setData(fullData);
    setLabel(fullMonth.map((item) => months[item]));
  };

  useEffect(() => {
    donData();
  }, []);

  return (
    <div>
      {
        <Line
          data={{
            labels: label,
            datasets: [
              {
                label: "Money Spent (R)",
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
  );
}

export default Chart;
