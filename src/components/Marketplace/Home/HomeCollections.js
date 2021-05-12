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
    { display: "ART", value: "Art", bg: avatars },
    { display: "AVATARS", value: "Avatars", bg: avatars },
    { display: "EXCLUSIVE EVENTS", value: "Exclusive Events", bg: events },
    { display: "SPORTS", value: "Sports", bg: sports },
    { display: "TRADING CARDS", value: "Trading Cards", bg: tradingcards },
    { display: "VIRTUAL WORLDS", value: "Virtual Worlds", bg: virtual },
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
            <Col ls={6} sm={4} className="px-0" key={key}>
              <div
                style={{ backgroundImage: `url(${i.bg})` }}
                className={`${classes.button} `}
                onClick={() => clickHandler(i.value)}
              >
                <p className={classes.ptext}>{i.display}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </Col>
  );
};

export default HomeCollections;
