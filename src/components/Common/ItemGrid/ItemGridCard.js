// import Spinner from "../../Common/Spinner";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import classes from "./ItemGridCard.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import coin_tiny from "../../../asset/coin_tiny.png";

const ItemGridCard = ({ item }) => {
  //Text shortener helper function
  const shortText = (longtext) => {
    const TEXT_LIMIT = 20;
    if (longtext.length > TEXT_LIMIT) {
      return longtext.substring(0, TEXT_LIMIT) + "...";
    } else {
      return longtext;
    }
  };

  return (
    <a href={"/items/asset/" + item.token_id}>
      <Card className={classes.card}>
        <div className={classes.imagediv}>
          <LazyLoadImage
            alt="Products"
            src={item.image}
            // src="https://gateway.pinata.cloud/ipfs/QmSTMzMGpJvLC9K2ahaDtsvSaswsWfGDZdYnL7TPQktFZM"
            className={classes.image}
            placeholder={
              <Spinner animation="border" variant="info" size="lg" />
            }
            // placeholder={<h1>HI</h1>}
          />
        </div>
        <Card.Body className={classes.cardbody}>
          <Row>
            <Col lg={8} className="pl-3 pr-0">
              <Card.Text className={classes.cardtitle}>
                {item.collection}
              </Card.Text>
              <Card.Text className={classes.cardtext}>
                {shortText(item.name)}
              </Card.Text>
            </Col>
            <Col className="pl-0 pr-3">
              <Card.Text
                className={`${classes.cardtitle} ${classes.textalignright}`}
              >
                Price
              </Card.Text>
              <Card.Text
                className={`${classes.cardtext} ${classes.textalignright}`}
              >
                <img
                  src={coin_tiny}
                  alt="coinicon"
                  className={classes.coinicon}
                />
                {item.current_price}
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </a>
  );
};

export default ItemGridCard;
