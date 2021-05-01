import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import classes from "./HomeNewlyMinted.module.css";
import HomeItemCard from "./HomeItemCard"; //TODO: make card an individual component
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

function HomeNewlyMinted() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_SERVER}`);
      console.log(data);
      setItems(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Container fluid className={classes.container}>
        {items &&
          items.map((item, index) => {
            return (
              <div className="d-flex justify-content-center" key={index}>
                <HomeItemCard item={item} key={index} />
              </div>
            );
          })}
      </Container>
    </>
  );
}

export default HomeNewlyMinted;
