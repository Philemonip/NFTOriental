import SellerBrowseItemCard from "./SellerItemCard";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./SellerItem.module.css";
import dotenv from "dotenv";
dotenv.config();

const BrowseItem = (props) => {
  console.log(props);
  return (
    <Col className="px-0">
      <Container fluid className={classes.sellerbrowseitem}>
        <Row>
          {props.items &&
            props.items.map((item, index) => {
              return (
                //TODO: finalize this
                // <Col className="mt-4 d-flex justify-content-center" key={index} xs={12} sm={6} md={4} lg={4} xl={3} >
                <Col className="mt-4 d-flex justify-content-center" key={index}>
                  <SellerBrowseItemCard item={item} />
                </Col>
              );
            })}
        </Row>
      </Container>
    </Col>
  );
};

export default BrowseItem;
