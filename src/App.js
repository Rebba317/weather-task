import React, { useState } from "react";
import "./App.css";
import data from "./data.json";

const App = () => {
  let [fromdate, setfromdate] = useState("");
  let [todate, setTodate] = useState("");
  let [arr, setArr] = useState([]);

  let fromdateChange = (e) => {
    setfromdate(e.target.value);
  };

  let TodateChange = (e) => {
    setTodate(e.target.value);
  };

  let Submit = () => {
    const currentDate = new Date(fromdate); // starting date and time
    const toDate = new Date(todate); // Ending date and time
    setArr([]);

    for (let i = 0; i < 8; i++) {
      const nextDay = new Date(currentDate);
      nextDay.setDate(currentDate.getDate() + i);
      const nextDayName = nextDay.toLocaleString("en-US", { weekday: "short" });

      setArr((current) => {
        return [...current,
          {
            date: convertDateFormat(nextDay),
            day: nextDayName,
            Weather: data[nextDayName].Weather,
            Image: data[nextDayName].Image,
            temp: data[nextDayName].Temp,
          },
        ];
      });
    }
  };
  return (
    <div>
        <p className="date"> From <input type="date" onChange={fromdateChange} /> to <input type="date" onChange={TodateChange} />
        <button onClick={Submit}>Submit</button> </p>
      <div className="m_con">
        {arr.map((item, index) => {
          return (
            <div id="main" className="innercon" key={index}>
              <p className="nav">{item.day}</p>
              <p>Date: {item.date}</p>
              <p>Temp: {item.temp}</p>
              <p className="img">
                <img src={item.Image} alt="Weather Icon" />
              </p>
              <p>Weather: {item.Weather}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function convertDateFormat(dateString) {
  const date= new Date(dateString);
  const year= date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day= String(date.getDate()).padStart(2, "0");
  const formattedDateString = `${day}-${month}-${year}`;
  return formattedDateString;
}
export default App;