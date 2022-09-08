import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Box, CircularProgress, Fab } from "@mui/material";
import { Check, Save } from "@mui/icons-material";
import { updateUser } from "../../../Redux/actions";

export default function Action({ params, rowId, setRowId, origin }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async () => {
    setLoading(true);
    if (origin === 'users'){
        const { role, status, email } = params.row;
        const result = await dispatch(
            updateUser({
                email,
                status,
                isAdmin: role === "Administrador" ? true : role === "Usuario" ? false: null,
            })
            );
            if (result) {
                setSuccess(true);
                setRowId(null);
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
