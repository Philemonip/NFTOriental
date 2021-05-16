import { Container, Row, Col, Button, Card } from "react-bootstrap";
import classes from "./HomeFeatureCard.module.css";
import beeple from "../../../asset/features/beeple.jpg";

function HomeFeatureCard() {
  return (
    <>
      <Container fluid>
        <Row className={classes.row}>
          <Col lg={6}>
            <a href="https://nftoriental.com/items/asset/45">
              <Card className={classes.card}>
                <img
                  // variant="top"
                  className={classes.image}
                  src={beeple}
                  alt="Features"
                />
                <Card.Body className={classes.cardbody}>
                  <Card.Text>
                    <b>Cosmonaut</b>
                    <br />
                    Created by Mitchellflautt
                  </Card.Text>
                </Card.Body>
              </Card>
            </a>
          </Col>
          <Col lg={6} className={classes.rightcol}>
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
