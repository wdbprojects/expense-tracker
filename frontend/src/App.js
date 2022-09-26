import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Header from "./components/Header";
import TransactionForm from "./components/TransactionForm";

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
        <TransactionForm fetchTransaction={fetchData} />

        <hr />
        <section>
          <table>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Description</th>
                <th>Date </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => {
                const { _id, amount, description, date } = transaction;
                return (
                  <tr key={_id}>
                    <td>{amount}</td>
                    <td>{description}</td>
                    <td>{date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}

export default App;
