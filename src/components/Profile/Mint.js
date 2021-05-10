import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useDispatch } from "react-redux";
import dotenv from "dotenv";
import { Button, Container, Form } from "react-bootstrap";
import { mintingSliceActions } from "../../redux/Minting/mintingSlice";
import { detailSliceActions } from "../../redux/Marketplace/detailSlice";
import LoadModal from "../Common/LoadModal";
dotenv.config();

const Mint = ({ handleMintingSubmit, show, setShow }) => {
  // const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  //Categories use dropdown, no need cotrolled
  const [externalUrl, setExternalUrl] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const etherscanLoad = useSelector((state) => state.detail.etherscanLoad);

  return (
    <div>
      <Container>
        <Form
          className="m-3"
          id="confirm-form"
          encType="multipart/form-data"
          onSubmit={handleMintingSubmit}
        >
          <Form.Group>
            <Form.Label>Upload File</Form.Label>
            <Form.Control
              name="uploadImg"
              type="file"
              id="uploadImg"
              onChange={(e) =>
                dispatch(mintingSliceActions.updateFile(e.target.files[0]))
              }
              required
            />
            <Form.Text className="text-muted">Upload a file</Form.Text>
          </Form.Group>
          {/* <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="price"
              type="number"
              id="price"
              placeholder="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onBlur={(e) =>
                dispatch(mintingSliceActions.updatePrice(e.target.value))
              }
              required
            />
            <Form.Text className="text-muted">
              Service fee: $ {price * 0.05}, You will receive $ {price * 0.95}
            </Form.Text>
          </Form.Group> */}
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={(e) =>
                dispatch(mintingSliceActions.updateName(e.target.value))
              }
              required
            />
            <Form.Text className="text-muted">Product Name</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Categoies</Form.Label>
            <Form.Control
              onChange={(e) => {
                //   console.log(e.target.value);
                dispatch(mintingSliceActions.updateCategory(e.target.value));
              }}
              as="select"
              id="inlineFormCustomSelectPref"
              custom
              size="lg"
            >
              <option value="Art">Art</option>
              <option value="Avatars">Avatars</option>
              <option value="Exclusive Events">Exclusive Events</option>
              <option value="Sports">Sports</option>
              <option value="Trading Cards">Trading Cards</option>
              <option value="Virtual Worlds">Virtual Worlds</option>
            </Form.Control>
            {/* <Form.Control
              name="categoies"
              type="text"
              id="categoies"
              placeholder="Categoies"
              onChange={(e) =>
                dispatch(mintingSliceActions.updateCategory(e.target.value))
              }
            /> */}
            <Form.Text className="text-muted">Categoies</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>External Url</Form.Label>
            <Form.Control
              name="externalUrl"
              type="text"
              id="externalUrl"
              placeholder="External Url"
              value={externalUrl}
              onChange={(e) => setExternalUrl(e.target.value)}
              onBlur={(e) =>
                dispatch(mintingSliceActions.updateExternalUrl(e.target.value))
              }
            />
            <Form.Text className="text-muted">External Url</Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              type="text"
              id="description"
              placeholder="Description"
              description={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={(e) =>
                dispatch(mintingSliceActions.updateDescription(e.target.value))
              }
            />
            <Form.Text className="text-muted">Max char: 255</Form.Text>
          </Form.Group>
          <Form.Group className="d-flex justify-content-center">
            <Button type="submit" className="btn btn-primary" value="upload">
              Mint
            </Button>
          </Form.Group>
        </Form>
      </Container>
      <LoadModal show={etherscanLoad} title="minting" />
    </div>
  );
};

export default Mint;
