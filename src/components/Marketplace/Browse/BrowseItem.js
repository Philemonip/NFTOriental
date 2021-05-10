import BrowseItemCard from "./BrowseItemCard";
// import Spinner from "../../Common/Spinner";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./BrowseItem.module.css";
import dotenv from "dotenv";
dotenv.config();

const BrowseItem = (props) => {
  return (
    <Col className="px-0">
      <Container fluid className={classes.browseitem}>
        <Row>
          {props.items &&
            props.items.map((item, index) => {
              return (
                <Col className="mt-4 d-flex justify-content-center" key={index}>
                  <BrowseItemCard item={item} />
                </Col>
              );
            })}
        </Row>
      </Container>
    </Col>
  );
};

export default BrowseItem;
