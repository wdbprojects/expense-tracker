import React, { useEffect } from "react";
import styled from "styled-components";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const TransactionList = ({ transactions, fetchTransactions }) => {
  const removeItem = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/transaction/${id}`,
      );
      if (response) {
        window.alert("Successfully deleted item!");
        fetchTransactions();
      }
    } catch (err) {
      console.log(err);
    }
  };
  /* FORMAT DATE */
  const formatDate = (date) => {
    return dayjs(date).format("LL");
  };

  return (
    <Wrapper>
      <Typography
        variant="h4"
        color="secondary"
        sx={{
          fontWeight: 300,
          textAlign: "center",
          textTransform: "uppercase",
          marginBottom: "1rem",
        }}
      >
        Transaction List
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ padding: "1rem", maxWidth: 650, margin: "0px auto" }}
      >
        <Table sx={{}} aria-label="simple table" size="small">
          <TableHead className="tableHead">
            <TableRow>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => {
              const { _id, amount, description, date } = transaction;

              return (
                <TableRow
                  key={_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{amount}</TableCell>
                  <TableCell>{description}</TableCell>
                  <TableCell align="center">{formatDate(date)}</TableCell>
                  <TableCell align="center">
                    <Box className="actionButtons">
                      <IconButton
                        color="info"
                        aria-label="upload picture"
                        component="label"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        aria-label="upload picture"
                        component="label"
                        onClick={() => {
                          removeItem(_id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin: 2rem auto 0px;
  .tableHead {
    th {
      font-weight: 600 !important;
    }
  }
  .actionButtons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

export default TransactionList;
