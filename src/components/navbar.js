import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../asset/hedge.png";

const Navi = (props) => {
  return (
    <Navbar bg="dark" variant="dark">
      <LinkContainer to="/">
        <Navbar.Brand>
          <img className="mr-3" width="30px" src={logo} alt="logo" />
          CloseSea
        </Navbar.Brand>
      </LinkContainer>
      <Nav className="ml-auto pr-4">
        <LinkContainer to="/items">
          <Nav.Link>Browse</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/">
          <Nav.Link>Features</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/">
          <Nav.Link>Pricing</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/trial">
          <Nav.Link>ERC20 Mint</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar>
  );
};

export default Navi;
