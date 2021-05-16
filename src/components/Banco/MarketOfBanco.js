// import React from "react";
import "./marketOfBanco.css";

const MarketOfBanco = ({
  name,
  price,
  symbol,
  marketcap,
  volume,
  image,
  priceChange,
}) => {
  return (
    // <div className="coin-container row">
    // 	<div className="coin-info col row d-flex align-items-center justify-content-left text-center">
    <tr>
      <td>
        <img className="coin-info" src={image} alt="crypto" />
      </td>
      <td>
        {name} ({symbol.toUpperCase()})
      </td>
      <td>${price}</td>
      {priceChange < 0 ? (
        <td className="text-danger">{priceChange.toFixed(2)}%</td>
      ) : (
        <td className="text-success">{priceChange.toFixed(2)}%</td>
      )}
      <td>${volume.toLocaleString()}</td>
      <td>{marketcap.toLocaleString()}</td>
    </tr>
    // 	{/* </div>
    // </div> */}
  );
};

export default MarketOfBanco;

// {priceChange < 0 ? (
//      <p className="red col">{priceChange.toFixed(2)}%</p>
// ) : (
//      <p className="green col ">{priceChange.toFixed(2)}%</p>
// )}
