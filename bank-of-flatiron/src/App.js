import React, { useState, useEffect } from "react";
import TransactionList from "./components/TransactionList";
import Search from "./components/Search";
import TransactionForm from "./components/TransactionForm";


function App() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/transactions")
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
        setFilteredTransactions(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleAddTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
    setFilteredTransactions([...filteredTransactions, newTransaction]);
  };

  const handleDeleteTransaction = (id) => {
    fetch(`http://localhost:3000/transactions/${id}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        const updatedTransactions = transactions.filter(
          (item) => item.id !== id
        );
        const updatedFilteredTransactions = filteredTransactions.filter(
          (item) => item.id !== id
        );
        setTransactions(updatedTransactions);
        setFilteredTransactions(updatedFilteredTransactions);
      })
      .catch((error) => console.error("Error deleting transaction:", error));
  };

  const handleSearchTransactions = (value) => {
    const filteredTransactions = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTransactions(filteredTransactions);
  };

  const handleSortTransactions = (sortOrder) => {
    const { field, ascending } = sortOrder;
    setFilteredTransactions(
      [...filteredTransactions].sort((a, b) => {
        if (a[field] < b[field]) {
          return ascending ? -1 : 1;
        }
        if (a[field] > b[field]) {
          return ascending ? 1 : -1;
        }
        return 0;
      })
    );
  };

  return (
    <div>
      <TransactionForm addTransaction={handleAddTransaction} />
      <Search handleSearch={handleSearchTransactions} />
      <TransactionList
        transactions={filteredTransactions}
        handleSort={handleSortTransactions}
        handleDelete={handleDeleteTransaction}
        handleEdit={() => {}}
      />
    </div>
  );
}

export default App;
