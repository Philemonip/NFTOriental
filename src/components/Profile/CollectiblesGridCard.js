// import Spinner from "../../Common/Spinner";
import { useState } from "react";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import classes from "./CollectiblesGridCard.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import axios from "axios";
import dotenv from "dotenv";
import coin_tiny from "../../asset/coin_tiny.png";
dotenv.config();

const CollectiblesGridCard = ({
  item,
  modalHandler,
  itemNotForSale,
  burnToken,
}) => {
  const { currentUser } = useSelector((state) => state.detail);
  //Text shortener helper function
  const [imageSrc, setImageSrc] = useState(null);
  const getImageUrl = async (id) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/items/asset/${id}`
    );
    if (data[0]) {
      setImageSrc(data[0].image);
    }
  };
  getImageUrl(item.id);

  return (
    <div className={classes.profileHover}>
      <a className={classes.aTag} href={"/items/asset/" + item.id}>
        <Card className={classes.card} style={{ overflowX: "hidden" }}>
          <div className={classes.imagediv}>
            {imageSrc && (
              <LazyLoadImage
                alt="Products"
                src={imageSrc}
                className={classes.image}
                placeholder={<Spinner animation="grow" variant="success" />}
              />
            )}
          </div>
          <Card.Body>
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
                    <p className="text-dark">Status: Listing </p>
                  ) : (
                    <p className="text-dark">Status: Not Listing </p>
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
                  <img
                    src={coin_tiny}
                    alt="coinicon"
                    className={classes.coinicon}
                  />
                  {item.price / 1e18}
                </Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </a>
      <div>
        {
          item.owner === currentUser ? (
            <div className={`${classes.buttons} py-2`}>
              {item.forSale === true ? (
                <button
                  className={`mx-1 px-4 btn ${classes.collectiblesButton}`}
                  onClick={(e) => itemNotForSale(item.id)}
                >
                  Cancel Listing
                </button>
              ) : (
                <button
                  className={`mx-1 px-4 btn ${classes.collectiblesButton}`}
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
                    className="mx-1 btn btn-danger"
                    onClick={(e) => burnToken(item.id)}
                  >
                    Burn Token
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className={`${classes.buttons} py-2`}></div>
          )
          //need this div for closing border
        }
      </div>
    </div>
  );
};

export default CollectiblesGridCard;
