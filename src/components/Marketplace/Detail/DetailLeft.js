import React, { useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import classes from "./DetailLeft.module.css";
import DetailBuyModal from "./DetailBuyModal";
import { useSelector, useDispatch } from "react-redux";
import ListSaleModal from "../../Profile/ListSaleModal";
import { detailSliceActions } from "../../../redux/Marketplace/detailSlice";
import coin_tiny from "../../../asset/coin_tiny.png";

function DetailLeft({
  itemdata,
  buyWithoutApprovalToken,
  token_id,
  loginStatus,
  itemNotForSale,
  itemOnSale,
}) {
  const [itemDetailLoaded, setItemDetailLoaded] = useState(0);
  const { currentUser, listModal, buyModal, items } = useSelector(
    (state) => state.detail
  );
  const dispatch = useDispatch();
  let itemDetail;

  const item = async (items, tokenId) => {
    itemDetail = await items.filter(
      (i) => i.id === tokenId && i.itemName === itemdata.name
    );
    console.log("this is the item", itemDetail[0]);
    setItemDetailLoaded(itemDetail[0]);
  };
  item(items, token_id);

  //Tooltip code
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      CCH
    </Tooltip>
  );

  return (
    <>
      <div className={`${classes.imagediv} mt-2`}>
        <img className={classes.image} src={itemdata.image} alt="Product" />
      </div>
      <div className={`mt-4 ${classes.pricediv}`}>
        <h4>Current Price</h4>
        <hr className="my-2"></hr>
        {itemdata.on_sale === true && itemDetailLoaded && (
          <>
            <div className={classes.pricetext}>
              {/* CCH Tooltip code */}
              <OverlayTrigger placement="top" overlay={renderTooltip}>
                <img
                  src={coin_tiny}
                  alt="coinicon"
                  className={classes.coinicon}
                />
              </OverlayTrigger>
              {itemDetailLoaded.price / 1e18}
            </div>
          </>
        )}

        {loginStatus === true ? (
          <div>
            {itemDetailLoaded &&
            currentUser &&
            currentUser === itemDetailLoaded.owner ? (
              <div>
                {itemDetailLoaded.forSale === false ? (
                  <Button
                    className={classes.buttonOnList}
                    onClick={() =>
                      dispatch(detailSliceActions.updateListModal(true))
                    }
                  >
                    List Item
                  </Button>
                ) : (
                  <Button
                    className={classes.buttonDeList}
                    variant="danger"
                    onClick={() => itemNotForSale(token_id)}
                  >
                    Cancel Listing
                  </Button>
                )}
                <ListSaleModal
                  show={listModal}
                  // setListItemModal={setListItemModal}
                  itemOnSale={itemOnSale}
                  dialogClassName="modal-20w"
                  tokenId={token_id}
                />
              </div>
            ) : (
              <div>
                {itemdata.on_sale === true ? (
                  <Button
                    className={classes.buttonBuy}
                    variant="primary"
                    onClick={() => {
                      dispatch(detailSliceActions.updateBuyModal(true));
                    }}
                  >
                    Buy Now
                  </Button>
                ) : (
                  <h5>This item is not for sale.</h5>
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            <p>Please Login Metamask to see price/purchase</p>
          </div>
        )}

        {/* <p>{itemOwner}</p>
        <p>{currentUser}</p>
        <p>{token_id}</p> */}

        <DetailBuyModal
          itemdata={itemdata}
          show={buyModal}
          buyWithoutApprovalToken={buyWithoutApprovalToken}
          token_id={token_id}
          // onHide={() => setShowBuyModal(false)}
        />
      </div>
    </>
  );
}

export default DetailLeft;
