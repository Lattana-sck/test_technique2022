import { useEffect, useState } from "react";
import Temp from "./components/Temp";
import Footer from "./components/Footer";
import Modal from "./components/Modal"

export default function Home() {

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://hubeau.eaufrance.fr/api/v1/temperature/station?code_departement=33&size=20&exact_count=true&format=json&pretty"
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

  return (<>
    <div>
      <div className="text-center mt-10">
        <h1 className="text-2xl">Derniers relevés de température des cours d&apos;eau du département de la Gironde</h1>
      </div>

      <div className="w-full mt-20 flex flex-wrap justify-center gap-3 ">
        {data.map((station, index) => (
          <div
            key={index}
            className="p-3 max-w-sm bg-white rounded-lg border w-96 border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
          >
            <a target="_blank" href={station.uri_station}>
              <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white text-center">
                {station.libelle_station}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              <Temp code_station={station.code_station} />
            </p>
            <div className="flex justify-center">
              <Modal libelle_station={station.libelle_station} code_station={station.code_station} />
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
    </>
  );
}
