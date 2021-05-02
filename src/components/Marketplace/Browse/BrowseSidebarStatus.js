import { useSelector, useDispatch } from "react-redux";
import { browseActions } from "../../../redux/Marketplace/browseSlice";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./BrowseSidebarStatus.module.css";

const BrowseSidebarStatus = (props) => {
  const dispatch = useDispatch();
  const selectedStatus = useSelector((state) => state.browse.statusfilter);
  const statusValue = ["New", "Featured", "Buy Now", "On Auction"];

  const toggleStatus = (value) => {
    dispatch(browseActions.toggleStatusFilter(value));
  };

  return (
    <Col className="px-0">
      <Container fluid>
        <Row>
          {statusValue.map((i, key) => (
            <Col md={6} className="px-0" key={key}>
              <div
                className={`${classes.statusbutton} ${
                  selectedStatus.indexOf(i) > -1 ? classes.activebutton : ""
                }`}
                onClick={() => toggleStatus(i)}
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

export default BrowseSidebarStatus;
