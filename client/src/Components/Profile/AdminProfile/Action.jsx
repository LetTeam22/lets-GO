import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Box, CircularProgress, Fab } from "@mui/material";
import { Check, Save } from "@mui/icons-material";
import {
  updateBike,
  updateBooking,
  updateExperience,
  updateUser,
  updateAccesorie,
  updateAdventure,
} from "../../../Redux/actions";
import swal from "sweetalert";

export default function Action({ params, rowId, setRowId, origin }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = () => {
    setLoading(true);
    if (origin === "users") {
      const { role, status, email } = params.row;
      if (status === "deleted") {
        swal({
          title: "Estas seguro?",
          text: "Estas eliminando este usuario!",
          dangerMode: true,
          icon: "warning",
          buttons: {
            cancel: {
              text: "cancelar",
              value: null,
              visible: true,
              closeModal: true,
            },
            confirm: {
              text: "si",
              value: true,
              visible: true,
              closeModal: true,
            },
          },
        }).then((value) => {
          if (value) {
            swal({
              title: "Felicidades!",
              text: "Eliminaste el usuario!",
              icon: "success",
              button: false,
            });
            const result = dispatch(
              updateUser({
                email,
                status,
                isAdmin:
                  role === "Administrador"
                    ? true
                    : role === "Usuario"
                    ? false
                    : null,
              })
            );
            if (result) {
              setSuccess(true);
              setRowId(null);
            }
          }
        });
      } else {
        const result = dispatch(
          updateUser({
            email,
            status,
            isAdmin:
              role === "Administrador"
                ? true
                : role === "Usuario"
                ? false
                : null,
          })
        );
        if (result) {
          setSuccess(true);
          setRowId(null);
        }
      }
    }
    if (origin === "bookings") {
      const { id, status } = params.row;
      if (status === "cancelled") {
        swal({
          title: "Estas seguro?",
          text: "Estas cancelando esta reserva!",
          dangerMode: true,
          icon: "warning",
          buttons: {
            cancel: {
              text: "cancelar",
              value: null,
              visible: true,
              closeModal: true,
            },
            confirm: {
              text: "si",
              value: true,
              visible: true,
              closeModal: true,
            },
          },
        }).then((value) => {
          if (value) {
            swal({
              title: "Felicidades!",
              text: "Cancelaste la reserva!",
              icon: "success",
              button: false,
            });
            const result = dispatch(updateBooking({ idBooking: id, status }));
            if (result) {
              setSuccess(true);
              setRowId(null);
            }
          }
        });
      } else {
        const result = dispatch(updateBooking({ idBooking: id, status }));
        if (result) {
          setSuccess(true);
          setRowId(null);
        }
      }
    }
    if (origin === "bikes") {
      const { id, status, discount, price, name, rating } = params.row;
      if (status === "deleted") {
        swal({
          title: "Estas seguro?",
          text: "Estas eliminando esta bicicleta!",
          dangerMode: true,
          icon: "warning",
          buttons: {
            cancel: {
              text: "cancelar",
              value: null,
              visible: true,
              closeModal: true,
            },
            confirm: {
              text: "si",
              value: true,
              visible: true,
              closeModal: true,
            },
          },
        }).then((value) => {
          if (value) {
            swal({
              title: "Felicidades!",
              text: "Eliminaste la bicicleta!",
              icon: "success",
              button: false,
            });
            const result = dispatch(
              updateBike({ idBike: id, status, discount, price, name, rating })
            );
            if (result) {
              setSuccess(true);
              setRowId(null);
            }
          }
        });
      } else {
        const result = dispatch(
          updateBike({ idBike: id, status, discount, price, name, rating })
        );
        if (result) {
          setSuccess(true);
          setRowId(null);
        }
      }
    }
    if (origin === "accesories") {
      const { id, status, price, name } = params.row;
      if (status === "deleted") {
        swal({
          title: "Estas seguro?",
          text: "Estas eliminando este accesorio!",
          dangerMode: true,
          icon: "warning",
          buttons: {
            cancel: {
              text: "cancelar",
              value: null,
              visible: true,
              closeModal: true,
            },
            confirm: {
              text: "si",
              value: true,
              visible: true,
              closeModal: true,
            },
          },
        }).then((value) => {
          if (value) {
            swal({
              title: "Felicidades!",
              text: "Eliminaste el accesorio!",
              icon: "success",
              button: false,
            });
            const result = dispatch(
              updateAccesorie({ idAcc: id, status, price, name })
            );
            if (result) {
              setSuccess(true);
              setRowId(null);
            }
          }
        });
      } else {
        const result = dispatch(
          updateAccesorie({ idAcc: id, status, price, name })
        );
        if (result) {
          setSuccess(true);
          setRowId(null);
        }
      }
    }
    if (origin === "adventures") {
      const { id, name, description, image, date, price, status } = params.row;
      if (status === "deleted") {
        swal({
          title: "Estas seguro?",
          text: "Estas eliminando esta aventura!",
          dangerMode: true,
          icon: "warning",
          buttons: {
            cancel: {
              text: "cancelar",
              value: null,
              visible: true,
              closeModal: true,
            },
            confirm: {
              text: "si",
              value: true,
              visible: true,
              closeModal: true,
            },
          },
        }).then((value) => {
          if (value) {
            swal({
              title: "Felicidades!",
              text: "Eliminaste la aventura!",
              icon: "success",
              button: false,
            });
            const result = dispatch(updateAdventure({ idAdv: id, name, description, image, date, price, status}));
            if (result) {
              setSuccess(true);
              setRowId(null);
            }
          }
        });
      } else {
        const result = dispatch(updateAdventure({ idAdv: id, name, description, image, date, price, status }));
        if (result) {
          setSuccess(true);
          setRowId(null);
        }
      }
    }
    if (origin === "experiences") {
      const { id, status } = params.row;
      if (status === "deleted") {
        swal({
          title: "Estas seguro?",
          text: "Estas eliminando esta experiencia!",
          dangerMode: true,
          icon: "warning",
          buttons: {
            cancel: {
              text: "cancelar",
              value: null,
              visible: true,
              closeModal: true,
            },
            confirm: {
              text: "si",
              value: true,
              visible: true,
              closeModal: true,
            },
          },
        }).then((value) => {
          if (value) {
            swal({
              title: "Felicidades!",
              text: "Eliminaste la experiencias!",
              icon: "success",
              button: false,
            });
            const result = dispatch(
              updateExperience({ idExperience: id, status })
            );
            if (result) {
              setSuccess(true);
              setRowId(null);
            }
          }
        });
      } else {
        const result = dispatch(updateExperience({ idExperience: id, status }));
        if (result) {
          setSuccess(true);
          setRowId(null);
        }
      }
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
}
