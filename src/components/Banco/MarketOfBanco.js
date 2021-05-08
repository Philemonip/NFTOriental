import React from "react";
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
		<div className="coin-container row">
			<div className="coin-info col row d-flex align-items-center justify-content-left text-center">
				<img src={image} alt="crypto" />
				<p>{name} {symbol.toUpperCase()} ${price}</p>
				<p className=""></p>
				<p className="red">{priceChange.toFixed(2)}%</p>
				<p className="col ">Volume:<br></br>${volume.toLocaleString()}</p>
				<p className="col ">Market Cap:<br></br>${marketcap.toLocaleString()}</p>
			</div>
		</div>
	);
};

export default MarketOfBanco;

// {priceChange < 0 ? (
//      <p className="red col">{priceChange.toFixed(2)}%</p>
// ) : (
//      <p className="green col ">{priceChange.toFixed(2)}%</p>
// )}
