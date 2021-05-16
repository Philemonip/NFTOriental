import classes from "./DetailRight.module.css";
import { Accordion, Card } from "react-bootstrap";
import CloseSeaNFT from "../../../abi/CloseSeaNFT.json";
// import { useSelector } from "react-redux";
// import { useSelector, useDispatch } from "react-redux";

function DetailRight({ itemdata, loginStatus, NFTaddress }) {
  // console.log(CloseSeaNFT.networks[4].address);
  // const token = useSelector((state) => state.detail.token);
  // const dispatch = useDispatch();

  //Address shortener
  function shortAddress(address) {
    console.log(address.toString(16).substring(0, 6));
    return `${address.toString(16).substring(0, 6)}...${address
      .toString(16)
      .substring(address.length - 4)}`;
  }

  return (
    <>
      <Accordion defaultActiveKey="0" className="mt-2">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Details
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <h6 className={classes.title}>Created by</h6>
              <a className={classes.atag} href={`/profile/${itemdata.creator}`}>
                {itemdata.aliasCreator && itemdata.aliasCreator.length > 0 ? (
                  <p className={classes.item}>{itemdata.aliasCreator}</p>
                ) : (
                  <p className={classes.item}>
                    {shortAddress(itemdata.creator)}
                  </p>
                )}
              </a>
              <h6 className={classes.title}>Owned by</h6>
              <a className={classes.atag} href={`/profile/${itemdata.owner}`}>
                {itemdata.aliasOwner && itemdata.aliasOwner.length > 0 ? (
                  <p className={classes.item}>{itemdata.aliasOwner}</p>
                ) : (
                  <p className={classes.item}>{itemdata.owner}</p>
                )}
              </a>
              <h6 className="font-weight-bold">Description</h6>
              <p>{itemdata.description}</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <Accordion defaultActiveKey="0" className="mt-4">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Chain Info
          </Accordion.Toggle>
          {loginStatus === true ? (
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <h6 className={classes.title}>Contract Address:</h6>
                <a
                  className={classes.atag}
                  href={`https://rinkeby.etherscan.io/address/${CloseSeaNFT.networks[4].address}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <p className={classes.item}>
                    {CloseSeaNFT.networks[4].address}
                  </p>
                </a>

                <h6 className={classes.title}>Token ID:</h6>
                <p> {itemdata.token_id}</p>
                <h6 className={classes.title}>Blockchain:</h6>
                <p> Rinkeby</p>
              </Card.Body>
            </Accordion.Collapse>
          ) : (
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <p>Please Login Metamask to see chain info</p>
              </Card.Body>
            </Accordion.Collapse>
          )}
        </Card>
      </Accordion>
    </>
  );
}

export default DetailRight;
