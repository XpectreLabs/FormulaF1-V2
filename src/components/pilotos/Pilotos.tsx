import React, { useState, useEffect } from "react";
import Styles from "./Pilotos.module.css";

export const Pilotos = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const [variables, setVariables] = useState({
    dataDriverList: [],
    dataSeason: [],
    dataSeries: [],
  });

  useEffect(() => {
    fetch("http://ergast.com/api/f1/2021/drivers.json")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          console.log(result);

          variables.dataDriverList = result.MRData.DriverTable.Drivers;
          variables.dataSeason = result.MRData.DriverTable.season;
          variables.dataSeries = result.MRData.series;
        },
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
          <b>Temporada: {variables.dataSeason}</b>
          <b>Series: {variables.dataSeries}</b>
          <b>Corredores: {variables.dataDriverList.length}</b>
        </div>

        <table className={Styles.F1Table}>
          <tbody>
            <tr>
              <th>Nombre</th>
              <th>Nacionalidad</th>
              <th>DOB</th>
              <th>Información</th>
              <th>Código</th>
              <th>Número permanente</th>
            </tr>

            {variables.dataDriverList.map((list: any) => {
              return (
                <tr key={list.driverId}>
                  <td>
                    {list.givenName} {list.familyName}
                  </td>
                  <td>{list.nationality}</td>
                  <td>{list.dateOfBirth}</td>
                  <td>
                    <a href={list.url}>Conocer más</a>
                  </td>
                  <td>{list.code}</td>
                  <td>{list.permanentNumber}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};
