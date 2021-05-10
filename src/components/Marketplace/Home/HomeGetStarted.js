import { Container, Row, Col } from "react-bootstrap";
import classes from "./HomeGetStarted.module.css";

const HomeGetStarted = () => {
  const getStartedItems = [
    {
      title: "Set up your wallet",
      body:
        "Once you’ve set up your wallet of choice, connect it to OpenSea by clicking the wallet icon in the top right corner. Learn about the wallets we support.",
    },
    {
      title: "Create your NFTs",
      body:
        "Once you’ve set up your wallet of choice, connect it to OpenSea by clicking the wallet icon in the top right corner. Learn about the wallets we support.",
    },
    {
      title: "List them for sale",
      body:
        "Once you’ve set up your wallet of choice, connect it to OpenSea by clicking the wallet icon in the top right corner. Learn about the wallets we support.",
    },
  ];

  return (
    <Col className="px-0">
      <Container fluid>
        <Row>
          {getStartedItems.map((i, key) => (
            <Col md={4} className="px-0" key={key}>
              <div>
                <p className={classes.title}>{i.title}</p>
              </div>
              <div>
                <p className={classes.ptext}>{i.body}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </Col>
  );
};

export default HomeGetStarted;
