import { Button } from "react-bootstrap";
import classes from "./DetailTitlePrice.module.css";
import React, { Component, setState, useState, useEffect } from "react";

function DetailTitlePrice(props) {

  const [itemName, setitemName] = useState("");

  return (
    <>
      <p>CATAGORY NAME</p>
      <p>PRODUCT NAME</p>
      <p>Owned by "NAME"</p>
      <div className={classes.pricediv}>
        <p>Current Price</p>
        <p>PRICE</p>
        <Button variant="primary">Buy Now</Button>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(itemName);
            props.mint(itemName);
            setitemName('')
          }}
        >
          <div className="form-group">
            <input
              id="itemName"
              type="text"
              value={itemName}
              onChange={(e) =>
                setitemName(e.target.value)
              }
              className="form-control form-control-md"
              placeholder="Item Name"
              required
            />
          </div>
          <Button type="submit" className="m-3" variant="success">Mint</Button>
        </form>


        <Button className="m-3" variant="success">Transfer to</Button>
        <Button className="m-3" variant="success">Approve</Button>
        <Button className="m-3" variant="success">Cancel Approve</Button>
        <Button className="m-3" variant="success">Burn Token</Button>
      </div>
    </>
  );
}

export default DetailTitlePrice;
