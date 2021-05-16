import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

const TransactionHistory = () => {
  const transaction = useSelector((state) => state.nft.transaction);
  // console.log(transaction);

  //Date and Time Data manipulation
  const transactionDateArr = transaction.map((i) => ({
    ...i,
    createdDate: new Date(i.created_at).toLocaleDateString("en-GB"),
    createdTime: new Date(i.created_at).toLocaleTimeString("en-GB"),
  }));
  // console.log(transactionDateArr);

  return (
    <Table
      responsive
      striped
      bordered
      hover
      variant="dark"
      className="transaction"
    >
      <thead>
        <tr>
          <th>Date</th>
          <th>Name</th>
          <th>Token ID</th>
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
                <a
                  href={"https://rinkeby.etherscan.io/tx/" + item.hash}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.createdDate} {item.createdTime}{" "}
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                </a>
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
