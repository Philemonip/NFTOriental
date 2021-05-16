import { useState } from "react";
import ItemGridCard from "./ItemGridCard";
import { Container, Row, Col } from "react-bootstrap";
import { BiError } from "react-icons/bi";
import classes from "./ItemGrid.module.css";
import dotenv from "dotenv";
dotenv.config();

const ItemGrid = (props) => {
  const [timeOut, setTiemOut] = useState(false);

  setTimeout(() => setTiemOut(true), 4000);

  return (
    <Col className="px-0">
      <Container fluid className={classes.browseitem} style={props.style}>
        <Row className={classes.row}>
          {props.items &&
            props.items.map((item, index) => {
              return (
                // <Col className="mt-4 d-flex justify-content-center" key={index}>
                //   <BrowseItemCard item={item} />
                // </Col>
                <div className={classes.grid} key={index}>
                  <ItemGridCard item={item} />
                </div>
              );
            })}
          {/* Something went wrong display */}
          {props.items.length < 1 && timeOut && (
            <div className={classes.wentwrong}>
              <div>
                <BiError className={classes.icon} />
                <h1 className={classes.h1}>OOPS!</h1>
                <h3 className={classes.h3}>Something went wrong</h3>
              </div>
            </div>
          )}
        </Row>
      </Container>
    </Col>
  );
};

export default ItemGrid;
