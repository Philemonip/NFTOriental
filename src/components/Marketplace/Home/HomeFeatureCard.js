import { Container, Row, Col } from "react-bootstrap";
import classes from "./HomeFeatureCard.module.css";
import one from "../../../asset/features/1.jpg";
import two from "../../../asset/features/2.jpg";
// import four from "../../../asset/features/4.jpg";
// import dotenv from "dotenv";
// dotenv.config();

function HomeFeatureCard() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <Row className={`mx-1 ${classes.card}`}>
              <Col>
                <p>Hello</p>
              </Col>
              <Col>
                <div className={classes.imagediv}>
                  <img src={two} alt="A Product" className={classes.image} />
                </div>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row className={`mx-1 ${classes.card}`}>
              <Col>
                <p>Hello</p>
              </Col>
              <Col>
                <div className={classes.imagediv}>
                  <img src={one} alt="A Product" className={classes.image} />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomeFeatureCard;
