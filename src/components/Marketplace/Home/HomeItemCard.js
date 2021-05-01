import { Card, Image, Row, Col } from "react-bootstrap";
import classes from "./HomeItemCard.module.css";

const HomeItemCard = ({ item }) => {
  //Text shortener helper function
  const shortText = (longtext) => {
    const TEXT_LIMIT = 20;
    if (longtext.length > TEXT_LIMIT) {
      return longtext.substring(0, TEXT_LIMIT) + "...";
    } else {
      return longtext;
    }
  };

  const dummypic = `https://lh3.googleusercontent.com/pBZykzbkTOOygSF2ym8PKHU5o45p8VWIvmc1wLG2m7wGOJRz8NAH6LEiwRBpLY6IyUBX5aqQkz7rwvEadw3_2y3HDPm9wHSLqa3DGZE=s0`;

  return (
    <a href={"/items/" + item.id}>
      <Card className={classes.card}>
        <div className={classes.imagediv}>
          <Image fluid className={classes.image} src={dummypic} />
        </div>
        <Card.Body className={classes.cardbody}>
          <Row>
            <Col lg={8} className="pl-3 pr-0">
              <Card.Text className={classes.cardtitle}>
                {item.category}
              </Card.Text>
              <Card.Text className={classes.cardtext}>
                {shortText(item.title)}
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
                <b>ETH</b> {item.price}
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </a>
  );
};

export default HomeItemCard;
