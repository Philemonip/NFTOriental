import { Card, Image, Row, Col } from "react-bootstrap";
import classes from "./BrowseItemCard.module.css";

const BrowseItemCard = ({ item }) => {
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
          {/* <Image className={classes.image} src={dummypic} /> */}
          <Image className={classes.image} src={item.image} />
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
                <b>ETH</b> {item.current_price}
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </a>
  );
};

export default BrowseItemCard;
