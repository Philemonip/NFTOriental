import { useSelector, useDispatch } from "react-redux";
// import { useDispatch } from "react-redux";
import { browseToggleThunk } from "../../../redux/Marketplace/browseSlice";
import { Form } from "react-bootstrap";
import classes from "./SidebarSort.module.css";

const BrowseSidebarCollection = ({ isSeller }) => {
  const dispatch = useDispatch();
  const sortOption = useSelector((state) => state.browse.sortOption);

  return (
    <Form inline>
      <Form.Control
        onChange={(e) => {
          //   console.log(e.target.value);
          dispatch(browseToggleThunk("sort", e.target.value, isSeller));
        }}
        as="select"
        className={classes.select}
        id="inlineFormCustomSelectPref"
        custom
        size="lg"
        value={sortOption}
      >
        <option value="0">Sort by</option>
        <option value="LIST_DATE">Recently Listed</option>
        <option value="CREATE_DATE">Recently Created</option>
        <option value="PRICE_DESC">Price: High to Low</option>
        <option value="PRICE_ASC">Price: Low to High</option>
        <option value="ALPHABET_ASC">Alphabetical: A-Z</option>
        <option value="ALPHABET_DESC">Alphabetical: Z-A</option>
      </Form.Control>
    </Form>
  );
};

export default BrowseSidebarCollection;
