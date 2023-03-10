import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../constants";
import { Tract } from "./tract";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Skeleton,
  Stack,
  TablePagination,
  Typography,
} from "@mui/material";

const Tracts: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tracts, setTracts] = useState<Tract[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currPage, setCurrPage] = useState<number>(
    parseInt(searchParams.get("page") || "1") - 1
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrPage(newPage);
    setSearchParams({ page: (newPage + 1).toString() });
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`${API_BASE}/tracts?page=${currPage}`).then((resp) => {
      setTracts(resp.data);
      setLoading(false);
    });
  }, [currPage]);

  return (
    <Stack>
      <Typography variant="h3" color="primary" gutterBottom>
        Tracts List
      </Typography>
      <Paper>
        {loading ? (
          Array(15)
            .fill(1)
            .map((_, i) => (
              <Box key={i} sx={{ borderBottom: "1px solid lightgrey" }}>
                <Skeleton width="100%" variant="rectangular" height={48} />
              </Box>
            ))
        ) : (
          <List disablePadding sx={{ height: "50%" }}>
            {tracts.map((tract: any) => (
              <ListItem
                disablePadding
                sx={{
                  backgroundColor: "white",
                  borderBottom: "1px solid lightgrey",
                }}
                key={tract.fid}
              >
                <ListItemButton
                  component={Link}
                  to={`${tract.fid}`}
                  state={{ currPage }}
                >
                  <ListItemText primary={tract.NAMELSAD} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
        <TablePagination
          component="div"
          count={-1}
          rowsPerPage={tracts.length}
          page={currPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[]}
        />
      </Paper>
    </Stack>
  );
};

export default Tracts;
