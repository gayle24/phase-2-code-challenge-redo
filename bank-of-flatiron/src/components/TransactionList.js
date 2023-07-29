import React, { useState } from "react";


function TransactionList({ transactions, handleSort, handleDelete, handleEdit }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div>
        <label>
          Search Transactions:
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchInputChange}
            placeholder="Search by description..."
          />
        </label>
      </div>
      <table className="transaction-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("date")}>Date</th>
            <th onClick={() => handleSort("description")}>Description</th>
            <th onClick={() => handleSort("category")}>Category</th>
            <th onClick={() => handleSort("amount")}>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => {
            return (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>{transaction.category}</td>
                <td>{transaction.amount}</td>
                <td>
                  <button onClick={() => handleDelete(transaction.id)}>
                    Delete
                  </button>
                  <button onClick={() => handleEdit(transaction.id)}>
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;