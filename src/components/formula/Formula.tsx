import React, { useState, useEffect } from "react";
import Styles from "./Formula.module.css";

export const Formula = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const [variables, setVariables] = useState({
    dataList: [],
    dataSeries: [],
    dataSeason: [],
  });

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("http://ergast.com/api/f1/2021.json")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          console.log(result);
          console.log("dato:" + result.MRData.RaceTable.season);

          variables.dataList = result.MRData.RaceTable.Races;
          variables.dataSeries = result.MRData.series;
          variables.dataSeason = result.MRData.RaceTable.season;
        },
        // Nota: es importante manejar errores aquí y no en
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className={Styles.Container}>
        <div className={Styles.ContainerDataTemp}>
          <b>Temporada: {variables.dataSeason} </b>
          <b>Series: {variables.dataSeries} </b>
          <b>Resultados: {variables.dataList.length}</b>
        </div>

        <table className={Styles.F1Table}>
          <tbody>
            <tr>
              <th>Nombre</th>
              <th>Ronda</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Circuito</th>
              <th>Localidad</th>
              <th>País</th>
              <th>URL</th>
            </tr>

            {variables.dataList.map((list: any) => {
              return (
                <tr key={list.round}>
                  <td>{list.raceName}</td>
                  <td>{list.round}</td>
                  <td>{list.date}</td>
                  <td>{list.time}</td>
                  <td>{list.Circuit.circuitName}</td>
                  <td>{list.Circuit.Location.locality}</td>
                  <td>{list.Circuit.circuitId}</td>
                  <td>
                    <a href={list.Circuit.url}>Visitar circuito</a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};
