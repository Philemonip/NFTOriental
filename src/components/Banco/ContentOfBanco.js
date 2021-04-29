import { useState, useEffect } from "react";
import axios from "axios";
import MarketOfBanco from "./MarketOfBanco";

const ContentOfBanco = () => {
	const [coins, setCoins] = useState([]);
	useEffect(() => {
		axios
			.get(
				"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum&order=market_cap_desc&per_page=2&page=1&sparkline=false"
			)
			.then((res) => {
				setCoins(res.data);
				console.log(res.data);
			})
			.catch((error) => console.log(error));
	}, []);
	return (
		<div className="col  bancoContent">
			{/* d-flex align-items-center justify-content-center */}
			{/* <h1>FUCK YOU CSS</h1> */}
			{coins.map((coin) => {
				return (
					<MarketOfBanco
						key={coin.id}
						name={coin.name}
						price={coin.current_price}
						symbol={coin.symbol}
						marketcap={coin.total_volume}
						volume={coin.market_cap}
						image={coin.image}
						priceChange={coin.price_change_percentage_24h}
					/>
				);
			})}
		</div>
	);
};

export default ContentOfBanco;
