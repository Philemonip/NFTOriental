import { useSelector, useDispatch } from "react-redux";
import { browseActions } from "../../../redux/Marketplace/browseSlice";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./BrowseSidebarCollection.module.css";

const BrowseSidebarCollection = (props) => {
  const dispatch = useDispatch();
  const selectedCollection = useSelector(
    (state) => state.browse.collectionfilter
  );
  const collectionValue = [
    "Collection 1",
    "Collection 2",
    "Collection 3",
    "Collection 4",
    "Collection 5",
    "Collection 6",
    "Collection 7",
    "Collection 8",
    "Collection 9",
    "Collection 10",
  ];

  const toggleStatus = (value) => {
    dispatch(browseActions.toggleCollectionFilter(value));
  };

  return (
    <Col className="px-0">
      <Container fluid>
        <Row>
          {collectionValue.map((i, key) => (
            <Col md={12} className="px-0" key={key}>
              <div
                className={`${classes.collectionbutton} ${
                  selectedCollection.indexOf(i) > -1 ? classes.activebutton : ""
                }`}
                onClick={() => toggleStatus(i)}
              >
                <p className={classes.ptext}>{i}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </Col>
  );
};

export default BrowseSidebarCollection;