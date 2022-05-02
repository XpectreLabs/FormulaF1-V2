import { Routes, Route, Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Styles from "./Indexe.module.css";

import { Home } from "../components/home";
import { Formula } from "../components/formula";
import { Pilotos } from "../components/pilotos";

import HomeSVG from "../assests/icon/HomeIcono.svg";
import PilotosSVG from "../assests/icon/PilotosIcono.svg";
import CopaSVG from "../assests/icon/CopaGP.svg";

export default function Indexe() {
  return (
    <Grid container className={Styles.Container}>
      <Grid item xs={2} sm={2} md={1} lg={1} xl={1}>
        <Link to="/">
          <img src={HomeSVG} className={Styles.IconosMenu} />
        </Link>

        <Link to="/Formula">
          <img src={PilotosSVG} className={Styles.IconosMenu} />
        </Link>

        <Link to="/Pilotos">
          <img src={CopaSVG} className={Styles.IconosMenu} />
        </Link>
      </Grid>

      <Grid item xs={10} sm={10} md={11} lg={11} xl={11}>
        <div className={Styles.DivF1}>
          <p>F1™ App</p>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Formula" element={<Formula />} />
          <Route path="Pilotos" element={<Pilotos />} />
        </Routes>
      </Grid>
    </Grid>
  );
}
