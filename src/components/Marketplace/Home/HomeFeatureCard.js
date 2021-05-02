// import { useState, useEffect } from "react";
// import { Container, Row, Col, Image } from "react-bootstrap";
import classes from "./HomeFeatureCard.module.css";
// import BrowseItemCard from "./BrowseItemCard";
// import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

function HomeFeatureCard() {
  const dummypic = `https://lh3.googleusercontent.com/pBZykzbkTOOygSF2ym8PKHU5o45p8VWIvmc1wLG2m7wGOJRz8NAH6LEiwRBpLY6IyUBX5aqQkz7rwvEadw3_2y3HDPm9wHSLqa3DGZE=s0`;

  //   const [items, setItems] = useState([]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const { data } = await axios.get(`${process.env.REACT_APP_API_SERVER}`);
  //       console.log(data);
  //       setItems(data);
  //     };
  //     fetchData();
  //   }, []);

  return (
    <>
      <div className={classes.card}>
        <img src={dummypic} alt="A Product" className={classes.image} />
        {/* <h1>Hello , you are in HomeFeatureCard</h1> */}
      </div>
    </>
  );
}

export default HomeFeatureCard;
