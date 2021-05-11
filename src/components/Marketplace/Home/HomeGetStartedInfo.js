import { Container, Row, Col } from "react-bootstrap";
import classes from "./HomeGetStartedInfo.module.css";

const HomeGetStartedInfo = ({ Items }) => {
  return (
    <Container fluid>
      <Row>
        {Items.map((i, key) => (
          <Col className={classes.column} key={key}>
            <div className={classes.icon}>{i.logo}</div>
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
  );
};

export default HomeGetStartedInfo;
