import ItemGridCard from "./ItemGridCard";
// import Spinner from "../../Common/Spinner";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./ItemGrid.module.css";
import dotenv from "dotenv";
dotenv.config();

const ItemGrid = (props) => {
  return (
    <Col className="px-0">
      <Container fluid className={classes.browseitem}>
        <Row className={classes.row}>
          {props.items &&
            props.items.map((item, index) => {
              return (
                // <Col className="mt-4 d-flex justify-content-center" key={index}>
                //   <BrowseItemCard item={item} />
                // </Col>
                <div className={classes.grid}>
                  <ItemGridCard item={item} />
                </div>
              );
            })}
        </Row>
      </Container>
    </Col>
  );
};

export default ItemGrid;
