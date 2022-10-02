import React, { useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const initialForm = {
  amount: "",
  description: "",
  date: new Date(),
};

const TransactionForm = ({ fetchTransactions }) => {
  const [form, setForm] = useState(initialForm);
  const textRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/transaction",
        form,
      );
      if (data) {
        setForm(initialForm);
        fetchTransactions();
        textRef.current.focus();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleInput = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleDate = (newValue) => {
    setForm({ ...form, date: newValue });
  };

  return (
    <Wrapper>
      <Card sx={{ minWidth: 275, marginTop: "10" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Add new transaction
          </Typography>
          <Box
            component="form"
            autoComplete="off"
            className="newTrForm"
            onSubmit={handleSubmit}
          >
            <TextField
              id="outlined-basic"
              label="Expense amount"
              name="amount"
              variant="outlined"
              size="small"
              value={form.amount}
              onChange={handleInput}
              inputRef={textRef}
            />
            <TextField
              id="outlined-basic"
              label="Description"
              name="description"
              variant="outlined"
              size="small"
              value={form.description}
              onChange={handleInput}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Transaction date"
                name="date"
                inputFormat="MM/DD/YYYY"
                value={form.date}
                onChange={handleDate}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
              <Button type="submit" variant="outlined" color="secondary">
                Add Transaction
              </Button>
            </LocalizationProvider>
          </Box>
        </CardContent>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  max-width: 500px;
  margin: 2rem auto;
  .newTrForm {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`;

export default TransactionForm;
