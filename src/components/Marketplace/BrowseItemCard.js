// import React, { useState, useEffect } from "react";
// import axios from "axios";
import { Card, Image } from "react-bootstrap";
import classes from "./BrowseItemCard.module.css";

const BrowseItemCard = ({ item }) => {
  //Text shortener helper function
  const shortText = (longtext) => {
    if (longtext.length > 15) {
      return longtext.substring(0, 15) + "...";
    } else {
      return longtext;
    }
  };

  const dummypic = `https://lh3.googleusercontent.com/pBZykzbkTOOygSF2ym8PKHU5o45p8VWIvmc1wLG2m7wGOJRz8NAH6LEiwRBpLY6IyUBX5aqQkz7rwvEadw3_2y3HDPm9wHSLqa3DGZE=s0`;

  return (
    <a href={"/items/" + item.id}>
      <Card className={classes.card}>
        <Image className={classes.image} src={dummypic} />
        <Card.Body>
          {/* <Card.Title>{item.title}</Card.Title> */}
          <Card.Text>{item.category}</Card.Text>
          <Card.Text>{shortText(item.title)}</Card.Text>
        </Card.Body>
        <Card.Footer>ETH {item.price}</Card.Footer>
      </Card>
    </a>
  );
};

export default BrowseItemCard;
