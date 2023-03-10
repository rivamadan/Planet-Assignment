import { Grid, Skeleton, Typography } from "@mui/material";
import React from "react";
import { Tract, TractKeys } from "./tract";

interface Props {
  fieldName: TractKeys;
  tract: Tract | undefined;
}

const Detail: React.FC<Props> = ({ fieldName, tract }) => {
  return (
    <>
      <Grid item xs={4}>
        <Typography padding={2}>{fieldName}</Typography>
      </Grid>
      {tract ? (
        <Grid item xs={8}>
          <Typography padding={2}>{tract[fieldName]}</Typography>
        </Grid>
      ) : (
        <Skeleton />
      )}
    </>
  );
};

export default Detail;
