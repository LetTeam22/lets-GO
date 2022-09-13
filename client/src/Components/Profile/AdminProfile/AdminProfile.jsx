import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import s from "./AdminProfile.module.css";
import Loading from "../../Loading/Loading";
import FormBike from "./FormBike";

export const AdminProfile = () => {
  const { isLoading, user } = useAuth0();
  const history = useHistory();
  const [addBike, setAddBike] = useState(false);

  if (isLoading) return <Loading />;
  if (!user) history.goBack();

  const seeBookings = () => {
    history.push("/adminprofile/bookings");
  };

  const seeUsers = () => {
    history.push("/adminprofile/users");
  };

  const seeBikes = () => {
    history.push("/adminprofile/bikes");
  };

  const seeExperiences = () => {
    history.push("/adminprofile/experiences");
  };

  const seeAccesories = () => {
    history.push("/adminprofile/accesories");
  };

  const addBikes = () => {
    addBike ? setAddBike(false) : setAddBike(true);
  };
  return (
    <section className={s.allPage}>
      <div className={s.column}>
        <div>
          <h1>Reservas</h1>
          <Button
            variant="contained"
            color="success"
            className={s.btnBook}
            onClick={seeBookings}
          >
            Ver reservas
          </Button>
        </div>
        <div>
          <h1>Usuarios</h1>
          <Button
            variant="contained"
            color="success"
            className={s.btnBook}
            onClick={seeUsers}
          >
            Ver usuarios
          </Button>
        </div>
      </div>

      <div className={s.column}>
        <div>
          <h2>Bicicletas</h2>
          <div className={s.couple}>
            <Button
              variant="contained"
              color="success"
              className={s.btnBook}
              onClick={seeBikes}
            >
              Ver Bicicletas
            </Button>
            <AddCircleIcon
              className={s.addBtn}
              color="primary"
              onClick={addBikes}
            />
          </div>
        </div>
        <div>
          <h2>Experiencias</h2>
          <Button
            variant="contained"
            color="success"
            className={s.btnBook}
            onClick={seeExperiences}
          >
            Ver Experiencias
          </Button>
        </div>
        <div>
          <h2>Accesorios</h2>
          <Button
            variant="contained"
            color="success"
            className={s.btnBook}
            onClick={seeAccesories}
          >
            Ver Accesorios
          </Button>
        </div>
      </div>
      <div className={addBike ? s.show : s.hidde}>
        <FormBike setAddBike={setAddBike} />
      </div>
      <img
        src="https://res.cloudinary.com/pflet/image/upload/v1662686161/Let/image/fondo_huellas_u2a4wr.png"
        alt="fondo"
        className={s.background}
      />
    </section>
  );
};
