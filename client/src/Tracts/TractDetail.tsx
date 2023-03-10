import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE } from "../constants";
import axios from "axios";
import { Tract, tractDisplayKeys } from "./tract";
import {
  Grid,
  Paper,
  Skeleton,
  Stack,
  IconButton,
  Typography,
  Container,
} from "@mui/material";
import Detail from "./Detail";

const TractDetail: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [tract, setTract] = useState<Tract | undefined>();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`${API_BASE}/tracts/${id}`).then((resp) => {
      setTract(resp.data);
      setLoading(false);
    });
  }, [id]);

  return (
    <Stack spacing={4}>
      <Stack direction="row" spacing={1}>
        <IconButton
          aria-label="back"
          size="large"
          onClick={() => navigate("../")}
        >
          <ArrowBackIcon fontSize="inherit" color="primary" />
        </IconButton>
        <Typography variant="h3" color="primary" gutterBottom>
          {loading ? <Skeleton width={200} /> : `${tract?.NAMELSAD}`}
        </Typography>
      </Stack>
      {loading ? (
        <Skeleton width="100%" variant="rectangular" height={500} />
      ) : (
        <Container>
          <Grid container component={Paper} maxWidth="50%" marginLeft={5}>
            {tractDisplayKeys.map((key) => (
              <Detail key={key} tract={tract} fieldName={key} />
            ))}
          </Grid>
        </Container>
      )}
    </Stack>
  );
};

export default TractDetail;
