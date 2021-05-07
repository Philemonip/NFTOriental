import classes from "./SidebarFilterbar.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { browseToggleThunk } from "../../../redux/Marketplace/browseSlice";
import { FaTimes } from "react-icons/fa";

function SidebarFilterbar({ isSeller }) {
  const dispatch = useDispatch();
  const selectedStatus = useSelector((state) => state.browse.statusfilter);
  const selectedCollection = useSelector(
    (state) => state.browse.collectionfilter
  );

  return (
    <>
      <Container fluid className={classes.bar}>
        <Row>
          {selectedCollection.map((i, key) => (
            <Col className={classes.displaycol} key={key}>
              <div className={classes.active}>
                <div>
                  {i}
                  <FaTimes
                    className={classes.deletebutton}
                    onClick={() =>
                      dispatch(browseToggleThunk("collection", i, isSeller))
                    }
                  />
                </div>
              </div>
            </Col>
          ))}
          {selectedStatus.map((i, key) => (
            <Col className={classes.displaycol} key={key}>
              <div className={classes.active}>
                <div>
                  {i}
                  <FaTimes
                    className={classes.deletebutton}
                    onClick={() =>
                      dispatch(browseToggleThunk("status", i, isSeller))
                    }
                  />
                </div>
              </div>
            </Col>
          ))}
          <Col className={classes.clearallcol}>
            <div
              className={classes.clearall}
              onClick={() =>
                dispatch(browseToggleThunk("softclear", "", isSeller))
              }
            >
              Clear All
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SidebarFilterbar;
