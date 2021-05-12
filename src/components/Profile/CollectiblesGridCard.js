// import Spinner from "../../Common/Spinner";
import { useSelector } from "react-redux";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import classes from "./CollectiblesGridCard.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ListSaleModal from "./ListSaleModal";

const CollectiblesGridCard = ({
  item,
  modalHandler,
  itemNotForSale,
  itemOnSale,
  burnToken,
  imgSource,
}) => {
  console.log(item);
  //Text shortener helper function
  const { listModal } = useSelector((state) => state.detail);

  return (
    <div className={classes.profileHover}>
      <a href={"/items/asset/" + item.id}>
        <Card className={classes.card}>
          <div className={classes.imagediv}>
            {/* <img className={classes.image} src={item.image} alt="Product" /> */}
            <LazyLoadImage
              alt="Products"
              src={imgSource(item.id)}
              // src="https://gateway.pinata.cloud/ipfs/QmSTMzMGpJvLC9K2ahaDtsvSaswsWfGDZdYnL7TPQktFZM"
              className={classes.image}
              placeholder={<Spinner animation="grow" variant="success" />}
            />
          </div>
          <Card.Body className={classes.cardbody}>
            <Row>
              <Col lg={8} className="pl-3 pr-0">
                {/* <Card.Text className={classes.cardtitle}>
                {item.collection}
              </Card.Text> */}
                <Card.Text className={classes.cardtext}>
                  {item.itemName}
                </Card.Text>
                <Card.Text>
                  {item.forSale === true ? (
                    <h6 className="m-1">Status: Listing </h6>
                  ) : (
                    <h6 className="m-1">Status: Not Listing </h6>
                  )}
                </Card.Text>
              </Col>
              <Col className="pl-0 pr-3">
                <Card.Text
                  className={`${classes.cardtitle} ${classes.textalignright}`}
                >
                  Price
                </Card.Text>
                <Card.Text
                  className={`${classes.cardtext} ${classes.textalignright}`}
                >
                  <b>CCH</b> {item.price / 1e18}
                </Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </a>
      <div>
        <div className={`${classes.buttons} py-2`}>
          {item.forSale === true ? (
            <button
              className="mx-1 px-4 btn btn-info"
              onClick={(e) => itemNotForSale(item.id)}
            >
              Cancel Listing
            </button>
          ) : (
            <button
              className="mx-1 px-4 btn btn-info"
              onClick={() => modalHandler(item.id)}
            >
              List Item
            </button>
          )}
          {/* <Button variant="success">Approve</Button>
                                <Button variant="warning">Cancel Approve</Button> */}
          {item.owner === item.creator && (
            <div>
              <button
                className="mx-1 btn btn-info"
                onClick={(e) => burnToken(item.id)}
              >
                Burn Token
              </button>
            </div>
          )}
        </div>
        {item && (
          <ListSaleModal
            show={listModal}
            // onHide={() => setListItemModal(false)}
            itemOnSale={itemOnSale}
            dialogClassName="modal-20w"
            tokenId={item.id}
          />
        )}
      </div>
    </div>
  );
};

export default CollectiblesGridCard;
