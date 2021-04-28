import { Button } from "react-bootstrap";
import classes from "./DetailTitlePrice.module.css";

function DetailTitlePrice() {
  return (
    <>
      <p>CATAGORY NAME</p>
      <p>PRODUCT NAME</p>
      <p>Owned by "NAME"</p>
      <div className={classes.pricediv}>
        <p>Current Price</p>
        <p>PRICE</p>
        <Button variant="primary">Buy Now</Button>
      </div>
    </>
  );
}

export default DetailTitlePrice;
