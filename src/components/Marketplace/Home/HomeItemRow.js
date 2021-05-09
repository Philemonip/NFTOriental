import { Container } from "react-bootstrap";
import classes from "./HomeItemRow.module.css";
import HomeItemCard from "./HomeItemCard"; //TODO: make card an individual component

function HomeItemRow({ items }) {
  return (
    <>
      <Container fluid className={classes.container}>
        {items &&
          items.map((item, index) => {
            return (
              <div className="d-flex justify-content-center" key={index}>
                <HomeItemCard item={item} key={index} />
              </div>
            );
          })}
      </Container>
    </>
  );
}

export default HomeItemRow;
