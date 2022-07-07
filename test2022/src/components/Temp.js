import React, { useEffect, useState } from "react";

function Temp({ code_station }) {
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
  }, []);

  console.log(data);
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th className="text-left">Date de mesure</th>
          <th className="text-center">Heure de mesure</th>
          <th className="text-right">Température</th>
        </tr>
    </thead>
    <tbody>

      {data.map((temp) => (
        <tr>
          <td className="text-left">{temp.date_mesure_temp}</td>
          <td className="text-center">{temp.heure_mesure_temp}</td>
          <td className="text-right">
              {Math.round(temp.resultat)}
              {temp.symbole_unite}
          </td>
        </tr>
      ))}

    </tbody>
    </table>

  );
}

export default Temp;
