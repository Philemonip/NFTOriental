import { useSelector, useDispatch } from "react-redux";
import { browseToggleThunk } from "../../../redux/Marketplace/browseSlice";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./SidebarStatus.module.css";

const BrowseSidebarStatus = ({ isSeller }) => {
  const dispatch = useDispatch();
  const selectedStatus = useSelector((state) => state.browse.statusfilter);
  const statusValue = ["Featured", "Listed on Sale"];

  return (
    <Col className="px-0">
      <Container fluid>
        <Row>
          {statusValue.map((i, key) => (
            <Col md={6} className="px-0" key={key}>
              <div
                className={`${classes.statusbutton} ${
                  selectedStatus.indexOf(i) > -1 && classes.activebutton
                }`}
                onClick={() =>
                  dispatch(browseToggleThunk("status", i, isSeller))
                }
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
