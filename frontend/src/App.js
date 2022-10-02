import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Header from "./components/Header";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

function App() {
  const [transactions, setTransactions] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/transaction",
      );
      setTransactions(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    /* inputRef.current.focus(); */
  }, []);

  return (
    <>
      <div className="mainPage">
        <Header />
        <TransactionForm fetchTransactions={fetchData} />
        <hr />
        <TransactionList
          transactions={transactions}
          fetchTransactions={fetchData}
        />
      </div>
    </>
  );
}

export default App;
