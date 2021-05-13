import { Container, Row, Col, Button, Card } from "react-bootstrap";
import classes from "./HomeFeatureCard.module.css";
// import one from "../../../asset/features/1.jpg";
// import two from "../../../asset/features/2.jpg";
// import three from "../../../asset/features/3.png";
// import four from "../../../asset/features/4.jpg";
import beeple from "../../../asset/features/beeple.jpg";

function HomeFeatureCard() {
  return (
    <>
      <Container fluid>
        <Row className={classes.row}>
          <Col lg={6}>
            <Card className={classes.card}>
              <Card.Img
                variant="top"
                className={classes.image}
                src={beeple}
                alt="Features"
              />
              <Card.Body>
                <Card.Text>
                  <b>Sunset Behind Waves</b>
                  <br />
                  Created by Mitchellflautt
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} className={classes.rightcol}>
            <div className={classes.textdiv}>
              <h2 className={classes.title}>
                Create, buy & sell <br />
                your very own NFTs
              </h2>
              <p className={classes.ptext}>
                NFT Marketplace powered by the Ethereum Network
              </p>
              <Button className={classes.button} href="/items">
                Discover
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomeFeatureCard;
