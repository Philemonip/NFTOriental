import { useSelector, useDispatch } from "react-redux";
import { browseToggleThunk } from "../../../redux/Marketplace/browseSlice";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./BrowseSidebarCollection.module.css";

const BrowseSidebarCollection = (props) => {
  const dispatch = useDispatch();
  const selectedCollection = useSelector(
    (state) => state.browse.collectionfilter
  );
  const collectionValue = [
    "art",
    "clothing",
    "festivals",
    "shoes",
    "Collection 5",
    "Collection 6",
    "Collection 7",
    "Collection 8",
    "Collection 9",
    "Collection 10",
  ];

  return (
    <Col className="px-0">
      <Container fluid>
        <Row>
          {collectionValue.map((i, key) => (
            <Col md={12} className="px-0" key={key}>
              <div
                className={`${classes.collectionbutton} ${
                  selectedCollection.indexOf(i) > -1 && classes.activebutton
                }`}
                onClick={() => dispatch(browseToggleThunk("collection", i))}
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
