import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";

const TransactionHistory = () => {
  const transaction = useSelector((state) => state.nft.transaction);
  console.log(transaction);

  //Date and Time Data manipulation
  const transactionDateArr = transaction.map((i) => ({
    ...i,
    createdDate: new Date(i.created_at).toLocaleDateString("en-US"),
    createdTime: new Date(i.created_at).toLocaleTimeString("en-US"),
  }));
  console.log(transactionDateArr);

  return (
    <Table responsive striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Date</th>
          <th>Name</th>
          <th>Token Id</th>
          <th>From Address</th>
          <th>To Address</th>
          <th>Price (CCH)</th>
        </tr>
      </thead>
      <tbody>
        {transactionDateArr &&
          transactionDateArr.map((item, key) => (
            <tr key={key}>
              <td>
                {item.createdDate} {item.createdTime}
              </td>
              <td>{item.name}</td>
              <td>{item.token_id}</td>
              <td>{item.from_address}</td>
              <td>{item.to_address}</td>
              <td>{item.price}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default TransactionHistory;
