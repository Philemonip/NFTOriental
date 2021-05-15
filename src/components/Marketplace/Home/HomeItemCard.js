import {
  Card,
  Row,
  Col,
  Spinner,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import classes from "./HomeItemCard.module.css";
import coin_tiny from "../../../asset/coin_tiny.png";

const HomeItemCard = ({ item }) => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      CCH
    </Tooltip>
  );

  //Text shortener helper function
  const shortText = (longtext) => {
    const TEXT_LIMIT = 20;
    if (longtext.length > TEXT_LIMIT) {
      return longtext.substring(0, TEXT_LIMIT) + "...";
    } else {
      return longtext;
    }
  };

  //Pricetag helper function
  const priceHelper = (price) => {
    if (!price || +Number(price) === 0) {
      return "Not Listed";
    } else {
      return (
        <>
          <OverlayTrigger placement="top" overlay={renderTooltip}>
            <img src={coin_tiny} alt="coinicon" className={classes.coinicon} />
          </OverlayTrigger>
          {+Number(price).toFixed(2)}
        </>
      );
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
            placeholder={<Spinner animation="grow" variant="primary" />}
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
                {priceHelper(item.current_price)}
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </a>
  );
};

export default HomeItemCard;
