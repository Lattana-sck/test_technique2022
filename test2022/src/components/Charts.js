import React, { useEffect, useState } from "react";
import {
  LineChart,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function Chart({ code_station }) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://hubeau.eaufrance.fr/api/v1/temperature/chronique?code_station=${code_station}&size=5&sort=desc&pretty`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setLoading(false);
      });
  }, [code_station]);

  const temp = [];
  if (data) {
    data.map((da, index) => {
      temp[index] = {
        date: da.heure_mesure_temp,
        temp: da.resultat,
      };
    });
  }

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <>
      <div className="w-full">
        <LineChart data={temp} margin={{ right: 100 }} width={800} height={300}>
          <CartesianGrid />
          <XAxis dataKey="date" interval={"preserveStartEnd"} />
          <YAxis></YAxis>
          <Legend />
          <Tooltip />
          <Line dataKey="temp" stroke="blue" activeDot={{ r: 4 }} />
        </LineChart>
      </div>
    </>
  );
}

export default Chart;