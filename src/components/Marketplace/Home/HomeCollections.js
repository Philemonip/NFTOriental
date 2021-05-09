import { useDispatch } from "react-redux";
import { browseActions } from "../../../redux/Marketplace/browseSlice";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./HomeCollections.module.css";
import { useHistory } from "react-router-dom";

const HomeCollections = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const collectionValue = [
    "Art",
    "Avatars",
    "Exclusive Events",
    "Sports",
    "Trading Cards",
    "Virtual Worlds",
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
            <Col md={4} className="px-0" key={key}>
              <div
                className={`${classes.button} `}
                onClick={() => clickHandler(i)}
              >
                <p className={classes.ptext}>
                  <b>{i}</b>
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </Col>
  );
};

export default HomeCollections;
