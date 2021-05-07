import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Web3 from "web3";
import logo from "../../asset/hedge.png";
import classes from "./Navbar.module.css";

const Navi = (props) => {
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(async () => {
    if (window.ethereum) {
      setLoginStatus(true);
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      setLoginStatus(true);
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      setLoginStatus(false);
      // window.alert("working here");
    }
  }, []);
  return (
    <Navbar className={classes.navbar} variant="dark" sticky="top">
      <LinkContainer to="/">
        <Navbar.Brand>
          <img className="ml-4 mr-3" width="30px" src={logo} alt="logo" />
          CloseSea
        </Navbar.Brand>
      </LinkContainer>
      <Nav className="ml-auto pr-4">
        <LinkContainer to="/items">
          <Nav.Link>Browse</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/">
          <Nav.Link>How to Buy</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/">
          <Nav.Link>Create</Nav.Link>
        </LinkContainer>

        {loginStatus && (
          <>
            <LinkContainer to="/profile">
              {/* change to icon for click later */}
              <Nav.Link>Profile</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cincochicos">
              <Nav.Link>Defi Bank</Nav.Link>
            </LinkContainer>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default Navi;
