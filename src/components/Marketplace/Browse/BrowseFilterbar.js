import classes from "./BrowseFilterbar.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { browseActions } from "../../../redux/Marketplace/browseSlice";
import { FaTimes } from "react-icons/fa";

function BrowseFilterbar() {
  const dispatch = useDispatch();
  const selectedStatus = useSelector((state) => state.browse.statusfilter);
  const selectedCollection = useSelector(
    (state) => state.browse.collectionfilter
  );

  const deleteStatusFilter = (item) => {
    dispatch(browseActions.deleteStatusFilter(item));
  };

  const deleteCollectionFilter = (item) => {
    dispatch(browseActions.deleteCollectionFilter(item));
  };

  const clearFilter = () => {
    dispatch(browseActions.clearFilter());
  };

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
                    onClick={() => deleteCollectionFilter(i)}
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
                    onClick={() => deleteStatusFilter(i)}
                  />
                </div>
              </div>
            </Col>
          ))}
          <Col className={classes.clearallcol}>
            <div className={classes.clearall} onClick={() => clearFilter()}>
              Clear All
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default BrowseFilterbar;
