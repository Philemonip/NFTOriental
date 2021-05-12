import { useDispatch } from "react-redux";
import { browseActions } from "../../../redux/Marketplace/browseSlice";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./HomeCollections.module.css";
import { useHistory } from "react-router-dom";
import avatars from "../../../asset/homecollections//avatars.png";
import tradingcards from "../../../asset/homecollections/tradingcards.png";
import sports from "../../../asset/homecollections/sports.png";
import virtual from "../../../asset/homecollections/virtualworlds.png";
import events from "../../../asset/homecollections/events.png";

const HomeCollections = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const collectionValue = [
    { text: "Art", bg: avatars },
    { text: "Avatars", bg: avatars },
    { text: "Exclusive Events", bg: events },
    { text: "Sports", bg: sports },
    { text: "Trading Cards", bg: tradingcards },
    { text: "Virtual Worlds", bg: virtual },
  ];

  const clickHandler = (clickedColl) => {
    dispatch(browseActions.toggleCollectionFilter(clickedColl));
    history.push("/items");
  };

  return (
    <Col className="px-0">
      <Container fluid>
        <Row>
          {collectionValue.map((i, key) => (
            <Col sm={4} className="px-0" key={key}>
              <div
                style={{ backgroundImage: `url(${i.bg})` }}
                className={`${classes.button} `}
                onClick={() => clickHandler(i.text)}
              >
                <p className={classes.ptext}>{i.text}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </Col>
  );
};

export default HomeCollections;
