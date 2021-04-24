// import React, { useState, useEffect } from "react";
// import axios from "axios";
import Card from "react-bootstrap/Card";

const BrowseItemCard = ({ item }) => {
  let style = {
    minWidth: "17rem",
    maxWidth: "17rem",
  };

  //Text shortener helper function
  const shortText = (longtext) => {
    if (longtext.length > 20) {
      return longtext.substring(0, 20) + "...";
    } else {
      return longtext;
    }
  };

  const dummypic = `https://lh3.googleusercontent.com/pBZykzbkTOOygSF2ym8PKHU5o45p8VWIvmc1wLG2m7wGOJRz8NAH6LEiwRBpLY6IyUBX5aqQkz7rwvEadw3_2y3HDPm9wHSLqa3DGZE=s0`;
  return (
    <Card style={style}>
      <Card.Img variant="top" src={dummypic} />
      <Card.Body>
        {/* <Card.Title>{item.title}</Card.Title> */}
        <Card.Title>{shortText(item.title)}</Card.Title>
        <Card.Text>{item.category}</Card.Text>
      </Card.Body>
      <Card.Footer>ETH {item.price}</Card.Footer>
    </Card>
  );
};

export default BrowseItemCard;
